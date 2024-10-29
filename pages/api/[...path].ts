import type { NextApiRequest, NextApiResponse } from 'next';

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path as string[];
  const target = `${endpoint}/${path.join('/')}`;

  try {
    const response = await fetch(target, {
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
      method: req.method,
      headers: req.headers as HeadersInit 
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Error connecting to backend" });
  }
}
