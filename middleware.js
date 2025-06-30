import { NextResponse } from 'next/server';

// Set your username and password here
const USERNAME = 'user';
const PASSWORD = 'letmein';

export function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pass] = atob(authValue).split(':');
    if (user === USERNAME && pass === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected"',
    },
  });
} 