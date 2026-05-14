import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle, Clock, List, TrendingUp } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await axios.get('/api/reports');
      setReport(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  const stats = [
    { 
      title: 'Pending Tasks', 
      value: report?.pendingTasks || 0, 
      icon: <Clock className="text-warning" />, 
      percent: 'Immediate attention needed' 
    },
    { 
      title: 'Completed Tasks', 
      value: report?.completedTasks || 0, 
      icon: <CheckCircle className="text-success" />, 
      percent: 'Successfully finished' 
    },
    { 
      title: 'Total Tasks', 
      value: report?.totalTasks || 0, 
      icon: <List className="text-primary" />, 
      percent: 'Total assigned' 
    },
    { 
      title: 'Productivity Score', 
      value: `${report?.productivityScore || 0}%`, 
      icon: <TrendingUp className="text-secondary" />, 
      percent: report?.productivityScore > 70 ? 'Great job! Keep it up' : 'You can do better!' 
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Reports</h1>
        <p>Analyze your schedule & goals to improve every day.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <Card key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-details">
              <p className="stat-title">{stat.title}</p>
              <h2 className="stat-value">{stat.value}</h2>
              <p className="stat-percent">{stat.percent}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="charts-grid">
        <Card title="Tasks Overview">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={report?.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="var(--success-color)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="var(--warning-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Task Progress Over Time">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={report?.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="var(--success-color)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="pending" stroke="var(--primary-color)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
