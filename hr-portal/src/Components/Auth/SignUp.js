import React, { useState } from 'react';
import useForm from '../Hooks/useForm'; // Import the custom hook
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate(); // Use navigate to redirect
    const [error, setError] = useState(''); // State for displaying errors

    // Use the custom hook for form data management
    const { formData, handleChange, handleSubmit, setFormData } = useForm({
        username: '',
        password: '',
        role: 'employee', // Default role
    });

    // Handle role change separately
    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            role: e.target.value,
        });
    };

    // Submit handler function
    const submitHandler = async (data) => {
        try {
            // Fetch existing users
            const response = await fetch('http://localhost:5000/signUpDetails');
            const existingUsers = await response.json();

            // Check if email already exists
            const emailExists = existingUsers.some((user) => user.email === data.email);

            if (emailExists) {
                setError('An account with this email already exists. Please log in.');
                return;
            }

            // If email doesn't exist, add new user
            const addResponse = await fetch('http://localhost:5000/signUpDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (addResponse.ok) {
                alert('Sign-up successful!');
                navigate('/login'); // Redirect to login page
            } else {
                console.error('Failed to add user:', addResponse.statusText);
                setError('Sign-up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={(e) => handleSubmit(e, submitHandler)}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="employee"
                                    name="role"
                                    value="employee"
                                    checked={formData.role === 'employee'}
                                    onChange={handleRoleChange}
                                />
                                <label className="form-check-label" htmlFor="employee">Employee</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="hr"
                                    name="role"
                                    value="hr"
                                    checked={formData.role === 'hr'}
                                    onChange={handleRoleChange}
                                />
                                <label className="form-check-label" htmlFor="hr">HR</label>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>

                <div className="mt-3 text-center">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
