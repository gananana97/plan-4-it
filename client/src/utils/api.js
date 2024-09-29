export const loginUser = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    return await response.json();  
  } else {
    throw new Error('Login failed');
  }
};

export const registerUser = async (userData) => {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    return await response.json();  
  } else {
    throw new Error('Registration failed');
  }
};


export const logoutUser = () => {
  localStorage.removeItem('token');  // Clear JWT token
};

export const getUserInfo = async () => {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch user info');
  }
};


export const updateUserProfile = async (userData) => {
  return fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`  // Send JWT token
    },
    body: JSON.stringify(userData),
  });
};

export const rsvpEvent = async (eventId, guestId) => {
  return fetch(`/api/rsvp/${eventId}/${guestId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
