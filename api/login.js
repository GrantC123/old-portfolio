export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  let body = '';
  await new Promise((resolve) => {
    req.on('data', chunk => { body += chunk; });
    req.on('end', resolve);
  });
  const params = new URLSearchParams(body);
  const password = params.get('password');

  if (password === process.env.SITE_PASSWORD) {
    res.setHeader('Set-Cookie', `auth=1; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`);
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    res.writeHead(302, { Location: '/login.html?error=1' });
    res.end();
  }
} 