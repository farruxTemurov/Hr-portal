import React, { useState } from 'react';
import useForm from '../Hooks/useForm'; // Import the custom hook
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); // For redirection
    const { formData, handleChange, handleSubmit } = useForm({
        email: '',
    });
    const [error, setError] = useState(''); // State for error messages

    const submitHandler = async (data) => {
        try {
            // Fetch existing users from db.json
            const response = await fetch('http://localhost:5000/signUpDetails');
            const users = await response.json();

            // Check if the user exists by email
            const user = users.find((user) => user.email === data.email);

            if (user) {
                // Validate the password
                if (user.password === data.password) {
                    alert('Login successful!');
                    // Redirect user to dashboard or home page
                    navigate('/EmployeeDashboard'); // Replace '/dashboard' with your target route
                } else {
                    setError('Invalid password. Please try again.');
                }
            } else {
                setError('User does not exist. Please sign up.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={(e) => handleSubmit(e, submitHandler)}>
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

                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>

                <div className="mt-3 text-center">
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
