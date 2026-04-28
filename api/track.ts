import Redis from 'ioredis';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Prevent caching of API responses
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const redisUrl = process.env.REDIS_URL || process.env.KV_URL || process.env.UPSTASH_REDIS_REST_URL;

  if (!redisUrl) {
    console.error('Missing Redis URL environment variable');
    return res.status(500).json({ error: 'Redis connection URL missing', detail: 'Environment variables not found' });
  }

  // Check if URL is for REST API instead of Redis protocol
  if (redisUrl.startsWith('http')) {
    console.error('Wrong Redis URL format: ioredis requires redis:// or rediss:// protocol');
    return res.status(500).json({ 
      error: 'Invalid Redis URL format', 
      detail: 'The provided URL is for REST API (http). ioredis requires redis:// protocol.' 
    });
  }

  const redis = new Redis(redisUrl);

  try {
    if (req.method === 'POST') {
      const { referrer, utmSource, timestamp, path, userAgent, isAdmin } = req.body;
      
      const visit = { 
        referrer: referrer || 'Direct', 
        utmSource: utmSource || 'None', 
        timestamp: timestamp || new Date().toISOString(), 
        path: path || '/', 
        userAgent: req.headers['user-agent'] || userAgent || 'Unknown',
        isAdmin: !!isAdmin
      };
      
      const result = await redis.lpush('visits', JSON.stringify(visit));
      await redis.ltrim('visits', 0, 999);
      
      console.log('Visit recorded, total count in list:', result);
      return res.status(200).json({ success: true, count: result });
    }

    if (req.method === 'GET') {
      const visits = await redis.lrange('visits', 0, -1);
      const parsedVisits = visits.map(v => JSON.parse(v));
      return res.status(200).json(parsedVisits);
    }

    if (req.method === 'DELETE') {
      await redis.del('visits');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Redis Operation Error:', error);
    return res.status(500).json({ 
      error: 'Redis Operation Failed', 
      message: error.message,
      code: error.code
    });
  } finally {
    // We should be careful about quitting too early in serverless, 
    // but for ioredis in Vercel it's generally safer to close or use a global client.
    await redis.quit();
  }
}
