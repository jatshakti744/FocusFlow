import React from 'react';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle, Clock, List, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const data = [
    { name: '10 Apr', completed: 5, pending: 2 },
    { name: '14 Apr', completed: 8, pending: 3 },
    { name: '18 Apr', completed: 12, pending: 5 },
    { name: '22 Apr', completed: 15, pending: 6 },
    { name: '26 Apr', completed: 18, pending: 8 },
    { name: '30 Apr', completed: 20, pending: 5 },
  ];

  const stats = [
    { title: 'Pending Tasks', value: '5', icon: <Clock className="text-warning" />, percent: '25% of total' },
    { title: 'Completed Tasks', value: '15', icon: <CheckCircle className="text-success" />, percent: '75% of total' },
    { title: 'Total Tasks', value: '20', icon: <List className="text-primary" />, percent: '100% of total' },
    { title: 'Productivity Score', value: '75%', icon: <TrendingUp className="text-secondary" />, percent: 'Great job! Keep it up' },
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
              <BarChart data={data}>
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
              <LineChart data={data}>
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
