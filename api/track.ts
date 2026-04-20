import { kv } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { referrer, utmSource, timestamp, path } = req.body;
    const visit = { referrer, utmSource, timestamp, path };
    await kv.lpush('visits', JSON.stringify(visit));
    await kv.ltrim('visits', 0, 999);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    const visits = await kv.lrange('visits', 0, -1);
    // visits는 문자열 배열이므로 JSON 파싱이 필요할 수 있습니다.
    const parsedVisits = visits.map(v => typeof v === 'string' ? JSON.parse(v) : v);
    return res.status(200).json(parsedVisits);
  }

  if (req.method === 'DELETE') {
    await kv.del('visits');
    return res.status(200).json({ success: true });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
