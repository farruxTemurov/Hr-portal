import React from 'react';
import useForm from '../Hooks/useForm'; // Import the custom hook
import { Link } from 'react-router-dom';

function SignUp() {
    // Use the custom hook for form data management
    const { formData, handleChange, handleSubmit, setFormData } = useForm({
        username: '',
        password: '',
        role: 'employee', // Default role
    });

    // Handle role change separately
    const handleRoleChange = (e) => {
        // Directly updating the form data using setFormData
        setFormData({
            ...formData,
            role: e.target.value,
        });
    };

    // Submit handler function
    const submitHandler = (data) => {
        console.log('SignUp Form Submitted:', data);
        // You can handle form submission logic here
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
                        <label>Role</label>
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
