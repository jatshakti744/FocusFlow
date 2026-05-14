import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, User, Search, Menu, LogOut, UserCircle, Settings } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import './Header.css';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className="header-search">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search tasks, goals..." />
                </div>
            </div>

            <div className="header-actions">
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>
                
                <div className="user-profile-container">
                    <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="user-info">
                            <span className="user-name">{userInfo?.name || 'Admin'}</span>
                            <span className="user-role">{userInfo?.role || 'Administrator'}</span>
                        </div>
                        <div className="user-avatar">
                            <User size={24} />
                        </div>
                    </div>

                    {showDropdown && (
                        <div className="profile-dropdown">
                            <Link to="/admin/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                <UserCircle size={18} />
                                <span>My Profile</span>
                            </Link>
                            <Link to="/admin/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                <Settings size={18} />
                                <span>Settings</span>
                            </Link>
                            <hr />
                            <button className="dropdown-item logout-text" onClick={handleLogout}>
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
