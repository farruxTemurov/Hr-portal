import React, { useState } from 'react';
import useForm from '../Hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit } = useForm({
        email: '',
    });
    const [error, setError] = useState('');

    const submitHandler = async (data) => {
        try {
            // Fetch signUpDetails
            const signUpResponse = await fetch('http://localhost:5000/signUpDetails');
            const users = await signUpResponse.json();

            // Check if the user exists in signUpDetails
            const user = users.find((user) => user.email === data.email);

            if (user) {
                localStorage.setItem('loggedInUserEmail', data.email);

                if (user.role === 'hr') {
                    // Check if HR exists in the hrs section
                    const hrResponse = await fetch('http://localhost:5000/hrs');
                    const hrs = await hrResponse.json();

                    const isHR = hrs.some((hr) => hr.email === data.email);

                    if (isHR) {
                        // Redirect HR user to HR Dashboard
                        navigate('/hrDashboard');
                    } else {
                        // If HR is not found in the hrs section
                        setError('HR not found. Please contact the administrator.');
                    }
                    return;
                } else if (user.role === 'employee') {
                    // Check if the user exists in the employees section
                    const employeeResponse = await fetch('http://localhost:5000/employees');
                    const employees = await employeeResponse.json();

                    const isEmployee = employees.some((employee) => employee.email === data.email);

                    if (isEmployee) {
                        // If the user is in the employees section, redirect to Employee Dashboard
                        navigate('/employeeDashboard');
                    } else {
                        // If the user is not in the employees section, show a message
                        setError('You are not an employee yet. Please contact HR.');
                    }
                    return;
                }
            } else {
                // User not found in signUpDetails
                setError('User not found. Please sign up or try again.');
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
