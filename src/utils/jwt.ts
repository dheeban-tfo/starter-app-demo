interface DecodedToken {
  nameid: string;
  sub: string;
  email: string;
  name: string;
  TenantId: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

export const decodeToken = (token: string): DecodedToken => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Invalid token');
  }
};