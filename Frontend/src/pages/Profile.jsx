import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import Button from '../components/Button';
import { User, Mail, Shield, Flame, Target, Share2, Copy } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="profile-page">
      <div className="profile-header-banner">
        <div className="profile-avatar-large">
          <User size={60} />
        </div>
        <div className="profile-main-info">
          <h1>{userInfo?.name}</h1>
          <p>{userInfo?.role?.toUpperCase()}</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-left-col">
          <Card title="Personal Details">
            <div className="detail-item">
              <User size={20} className="detail-icon" />
              <div>
                <p className="detail-label">Full Name</p>
                <p className="detail-value">{userInfo?.name}</p>
              </div>
            </div>
            <div className="detail-item">
              <Mail size={20} className="detail-icon" />
              <div>
                <p className="detail-label">Email Address</p>
                <p className="detail-value">{userInfo?.email}</p>
              </div>
            </div>
            <div className="detail-item">
              <Shield size={20} className="detail-icon" />
              <div>
                <p className="detail-label">Account Role</p>
                <p className="detail-value">{userInfo?.role}</p>
              </div>
            </div>
          </Card>

          <Card title="Referral Program" className="mt-20">
            <p className="referral-text">Invite your friends and earn +10 streaks for each signup!</p>
            <div className="referral-box">
              <span>{userInfo?.referralCode || 'FOCUS-REF-123'}</span>
              <button className="copy-btn"><Copy size={16} /></button>
            </div>
            <Button variant="outline" className="w-full mt-10">
              <Share2 size={18} /> Share Link
            </Button>
          </Card>
        </div>

        <div className="profile-right-col">
          <div className="stats-row">
            <Card className="stat-box flame-box">
              <Flame size={32} className="stat-icon-flame" />
              <div>
                <h3>{userInfo?.streak || 0}</h3>
                <p>Current Streak</p>
              </div>
            </Card>
            <Card className="stat-box level-box">
              <Target size={32} className="stat-icon-target" />
              <div>
                <h3 className="capitalize">{userInfo?.level || 'Beginner'}</h3>
                <p>Achievement Level</p>
              </div>
            </Card>
          </div>

          <Card title="Milestones" className="mt-20">
            <div className="milestone-list">
              <div className="milestone-item completed">
                <div className="milestone-check">✓</div>
                <div>
                  <p className="milestone-title">Started the Journey</p>
                  <p className="milestone-desc">Created your FocusFlow account</p>
                </div>
              </div>
              <div className="milestone-item {userInfo?.streak >= 50 ? 'completed' : ''}">
                <div className="milestone-check">{userInfo?.streak >= 50 ? '✓' : '50'}</div>
                <div>
                  <p className="milestone-title">Intermediate Explorer</p>
                  <p className="milestone-desc">Reach a 50-day streak</p>
                </div>
              </div>
              <div className="milestone-item {userInfo?.streak >= 100 ? 'completed' : ''}">
                <div className="milestone-check">{userInfo?.streak >= 100 ? '✓' : '100'}</div>
                <div>
                  <p className="milestone-title">Advanced Master</p>
                  <p className="milestone-desc">Reach a 100-day streak</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
