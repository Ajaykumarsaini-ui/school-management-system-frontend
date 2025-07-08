// Get JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Safely extract role from JWT (but don't trust it blindly!)
export const getRoleFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.role?.toUpperCase() || null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
