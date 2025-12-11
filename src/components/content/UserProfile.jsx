import { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext.jsx';
import { API_USERS_URL, authHeaders } from '../../apiConfig.js';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user, setUser, loading } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user?.profile) {
      setDisplayName(user.profile.displayName || '');
    }
  }, [loading, user, navigate]);

  if (loading) return null;
  if (!user) return <p>Please log in to access your profile.</p>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Fetch all users
      const res = await fetch(API_USERS_URL, { headers: authHeaders });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();

      // Find the current user by username
      const userEntryKey = Object.keys(data.results).find(
        key => data.results[key].username === user.username
      );
      if (!userEntryKey) throw new Error('User not found');
      const userEntry = data.results[userEntryKey];

      // Prepare updated user object
      const updatedUser = {
        ...userEntry,
        profile: { ...userEntry.profile, displayName },
        ...(password ? { password } : {})
      };

      // PUT request to update the user in place
      const putRes = await fetch(`${API_USERS_URL}?id=${userEntryKey}`, {
        method: 'PUT',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      if (!putRes.ok) throw new Error('Failed to update profile');

      const savedUser = await putRes.json();

      setUser({
        ...user,
        profile: savedUser.profile,
        ...(password ? { password: savedUser.password } : {})
      });

      setSuccess('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  // the displayName thing doesnt work 
  return (
    <div className="auth-page">
      <h2>{displayName || 'Profile'}</h2>
      <p style={{ fontSize: '1rem', marginBottom: '1rem', opacity: 0.9 }}>
        change your display name and/or your password!
      </p>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="auth-btn profile-btn">Update Profile</button>
      </form>
    </div>
  );
}
