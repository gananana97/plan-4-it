export const isLoggedIn = () => {
    return !!localStorage.getItem('token');  // return true if token currently exists
  };
  
  // retrieving the JWT token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // log user out by clearing token
  export const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();  // reload page to reset app state
  };
  