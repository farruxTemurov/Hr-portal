import React, { useState } from 'react';

function AddEmployeeCard({ addEmployee }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        position: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const employee = {
            ...formData,
            id: Date.now().toString(), // Generate unique ID
        };
        addEmployee(employee); // Call parent function
        setFormData({ name: '', email: '', department: '', position: '' }); // Clear form
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    className="form-control"
                    value={formData.department}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="position" className="form-label">Position</label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    className="form-control"
                    value={formData.position}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-success w-100">Add Employee</button>
        </form>
    );
}

export default AddEmployeeCard;
