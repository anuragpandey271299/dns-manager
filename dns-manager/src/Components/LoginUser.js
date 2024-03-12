import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './LoginUser.module.css';
import { Link } from 'react-router-dom';

function LoginUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }

        try {
            setLoading(true); 
            const response = await axios.post('https://dns-manager-backnend.onrender.com/loginuser', { email, password });
            const token = response.data.token;
            localStorage.setItem('jwt', token);

            if (response.status === 200) {
                toast.success('Logged In Successfully');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h1>Assuming you are only authorized for register and login</h1>
            <form>
                <div className={styles.inputs}>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputs}>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={styles.account}>
                    <button type='submit' onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </div>
                <div className={styles.account}>
                    New here? <Link to='/'>Register</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginUser;
