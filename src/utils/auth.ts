export function saveToken(token: string, remember = false) {
  try {
    if (remember) {
      localStorage.setItem('token', token);
      sessionStorage.removeItem('token'); // Xóa sessionStorage nếu chọn remember
    } else {
      sessionStorage.setItem('token', token);
      localStorage.removeItem('token'); // Xóa localStorage nếu không chọn remember
    }
  } catch (e) {
    // ignore storage errors
  }
}

export function getToken(): string | null {
  try {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  } catch (e) {
    return null;
  }
}

export function removeToken() {
  try {
    // Xóa token từ cả hai nơi
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    // Xóa userData
    sessionStorage.removeItem('userData');
    localStorage.removeItem('userData');
  } catch (e) {
    // ignore storage errors
  }
}

export function isTokenExpired(token?: string) {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    return Date.now() / 1000 > payload.exp;
  } catch (e) {
    return true;
  }
}