const ADMIN_USERNAME = 'Kenny';
const ADMIN_PASSWORD = '1234richard';
const AUTH_KEY = 'nev_admin_auth';

export function adminLogin(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}
