import { kv } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { referrer, utmSource, timestamp, path, userAgent } = req.body;
    
    // 요청 헤더에서도 User-Agent를 가져올 수 있습니다 (브라우저가 직접 보낸 것보다 더 정확할 수 있음)
    const headerUserAgent = req.headers['user-agent'] || userAgent || 'Unknown';
    
    const visit = { 
      referrer, 
      utmSource, 
      timestamp, 
      path, 
      userAgent: headerUserAgent 
    };
    
    await kv.lpush('visits', JSON.stringify(visit));
    await kv.ltrim('visits', 0, 999);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    const visits = await kv.lrange('visits', 0, -1);
    const parsedVisits = visits.map(v => typeof v === 'string' ? JSON.parse(v) : v);
    return res.status(200).json(parsedVisits);
  }

  if (req.method === 'DELETE') {
    await kv.del('visits');
    return res.status(200).json({ success: true });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
