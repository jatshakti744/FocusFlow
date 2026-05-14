import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';
import Button from '../components/Button';
import Card from '../components/Card';
import './Login.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/auth/send-otp', { email });
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('/api/auth/verify-otp', { email, otp });
            dispatch(setCredentials(res.data));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-brand">
                    <h1>FocusFlow</h1>
                    <p>Organize your daily life, turn chaos into calm.</p>
                </div>

                <Card className="login-card">
                    <h2>{step === 1 ? 'Login / Sign Up' : 'Verify OTP'}</h2>
                    <p className="subtitle">
                        {step === 1 
                            ? 'Enter your email to receive a 6-digit OTP' 
                            : `OTP sent to ${email}`}
                    </p>

                    <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP}>
                        {step === 1 ? (
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="admin@focusflow.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        ) : (
                            <div className="form-group">
                                <label>OTP Code</label>
                                <input 
                                    type="text" 
                                    placeholder="123456" 
                                    maxLength="6"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {error && <p className="error-message">{error}</p>}

                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (step === 1 ? 'Send OTP' : 'Login')}
                        </Button>

                        {step === 2 && (
                            <button 
                                type="button" 
                                className="back-btn" 
                                onClick={() => setStep(1)}
                            >
                                Change Email
                            </button>
                        )}
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
