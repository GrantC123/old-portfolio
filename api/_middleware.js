export function middleware(req, ev) {
  // Allow access to login page and login API
  if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/api/login')) {
    return;
  }

  // Check for auth cookie
  const cookie = req.headers.get('cookie') || '';
  if (cookie.includes('auth=1')) {
    return;
  }

  // Redirect to login page
  return Response.redirect(new URL('/login.html', req.url));
} 