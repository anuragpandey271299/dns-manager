import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './SignupUser.module.css';

function SignupUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            alert('Enter each entry');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('https://dns-manager-backnend.onrender.com/createuser', {
                firstName,
                lastName,
                email,
                password,
            });
            
            if (response.status === 201) {
                toast.success('Registered Successfully');
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Email already in use');
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h1>Assuming you are only one authorized for register and login</h1>
            <form>
                <div className={styles.inputs}>
                    <label>First Name</label>
                    <input name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className={styles.inputs}>
                    <label>Last Name</label>
                    <input name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className={styles.inputs}>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputs}>
                    <label>Password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
                </div>
                <div className={styles.account}>
                    <button type='submit' onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </div>
                <div className={styles.account}>
                    Already have an account? <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    );
}

export default SignupUser;
