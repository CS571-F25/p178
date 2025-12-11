export const API_BASE_URL = "https://cs571api.cs.wisc.edu/rest/f25/bucket";

export const API_USERS_URL = `${API_BASE_URL}/users`;
export const API_BOOKS_URL = `${API_BASE_URL}/books`;

export const authHeaders = { "Content-Type": "application/json", "X-CS571-ID": CS571.getBadgerId() };
