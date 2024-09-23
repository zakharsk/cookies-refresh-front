import { TCookie } from '@/types/cookie.type';

export function parseCookie(cookieString: string) {
  if (!cookieString) return;

  const params = cookieString.split('; ');
  const [name, value] = params[0].split('=');

  const cookie: TCookie = {
    name,
    value,
    path: '',
  };
  params.forEach((param) => {
    const [paramName, paramValue] = param.split('=');
    switch (paramName) {
      case 'Max-Age':
        cookie.maxAge = parseInt(paramValue);
        break;
      case 'Path':
        cookie.path = paramValue;
        break;
      case 'Expires':
        cookie.expires = new Date(paramValue);
        break;
      case 'HttpOnly':
        cookie.httpOnly = true;
        break;
      case 'Secure':
        cookie.secure = true;
        break;
      case 'SameSite':
        cookie.sameSite = paramValue.toLowerCase() as TCookie['sameSite'];
    }
  });
  return cookie;
}
