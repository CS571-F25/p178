import { useState, useEffect, useContext, useRef } from 'react';
import UserContext from '../contexts/UserContext';
import { API_BASE_URL, API_USERS_URL, API_BOOKS_URL, authHeaders } from '../../apiConfig.js';

export default function Admin() {

    const { user: currentUser } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedUserId, setExpandedUserId] = useState(null);
    const cardRefs = useRef({});

    if (currentUser?.role !== 'admin') return <p>Access denied.</p>;

    const fetchUsers = async () => {
        setLoading(true); setError('');
        try {
            const res = await fetch(API_USERS_URL, { 
                method: "GET", 
                headers: authHeaders, 
            });
            if (!res.ok) throw new Error(`API fetch failed: ${res.status}`);
            const data = await res.json();
            setUsers(Object.entries(data.results || {}).map(([id, u]) => ({ id, ...u })));
        } catch { setError('Failed to fetch users'); }
        finally { setLoading(false); }
    };

    const updateActivityPoints = async (id, newPoints) => {
    const u = users.find(x => x.id === id);
    const updated = { ...u, ActivityPoints: newPoints };
    await fetch(`${API_USERS_URL}/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', 'X-CS571-ID': CS571.getBadgerId() }, 
        body: JSON.stringify(updated) 
    });
    setUsers(users.map(x => x.id === id ? updated : x));
    };

    useEffect(() => {
    const handleClickOutside = (e) => {
        if (expandedUserId && cardRefs.current[expandedUserId] && !cardRefs.current[expandedUserId].contains(e.target)) 
            setExpandedUserId(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [expandedUserId]);

    return (
        <div className="admin-page">
            <h1>Admin Stats</h1>
            <button onClick={fetchUsers} disabled={loading}>{loading ? 'Fetching...' : 'Fetch Users'}</button>
            {error && <p className="error-text">{error}</p>}

            {users.map(u => (
                <div key={u.id}>
                    <button className="sub-link" onClick={() => setExpandedUserId(prev => prev === u.id ? null : u.id)}>{u.username}</button>
                    {expandedUserId === u.id && (
                    <div ref={el => cardRefs.current[u.id] = el}>
                        <p>DisplayName: {u.profile.displayName}</p>
                        <p>Role: {u.role}</p>
                        <p>ActivityPoints: 
                        <input type="number" value={u.ActivityPoints} 
                            onChange={e => updateActivityPoints(u.id, parseInt(e.target.value))} 
                        />
                        </p>
                        <p>Permissions: {u.permissions.join(', ')}</p>
                    </div>
                )}
                </div>
            ))}
        </div>
    );
}
