import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Calendar, Target, Lightbulb, BarChart, Settings, LogOut, Moon, Sun, Droplets, Leaf } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isCollapsed }) => {
    const { theme, toggleTheme } = useTheme();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { name: 'Schedules', icon: <Calendar size={20} />, path: '/admin/schedules' },
        { name: 'Goals', icon: <Target size={20} />, path: '/admin/goals' },
        { name: 'Suggestions', icon: <Lightbulb size={20} />, path: '/admin/suggestions' },
        { name: 'Reports', icon: <BarChart size={20} />, path: '/admin/reports' },
    ];

    const themes = [
        { name: 'light', icon: <Sun size={18} />, color: '#ffffff' },
        { name: 'dark', icon: <Moon size={18} />, color: '#1f2937' },
        { name: 'ocean', icon: <Droplets size={18} />, color: '#0ea5e9' },
        { name: 'forest', icon: <Leaf size={18} />, color: '#22c55e' },
    ];

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-logo">
                <h2>{isCollapsed ? 'FF' : 'FocusFlow'}</h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        {item.icon}
                        {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                {!isCollapsed && (
                    <div className="theme-switcher">
                        {themes.map((t) => (
                            <button
                                key={t.name}
                                className={`theme-btn ${theme === t.name ? 'active' : ''}`}
                                onClick={() => toggleTheme(t.name)}
                                title={t.name}
                            >
                                {t.icon}
                            </button>
                        ))}
                    </div>
                )}
                <button className="nav-item logout-btn">
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
