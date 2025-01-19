import React, { useState } from 'react';
import AddEmployeeCard from './AddEmployeeCard';
import EmployeeCard from './EmployeeCard';
import RequestsSection from './RequestsSection';

function HrDashboard() {
    const [employees, setEmployees] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Function to add new employee to the list
    const addEmployee = (employee) => {
        setEmployees([...employees, employee]);
    };

    // Toggle the visibility of the AddEmployee form
    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="container mt-5">
            {/* Add New Employee Section */}
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '20px', marginTop: '20px' }}>
                        <h5 className="card-title text-center mb-4">Add New Employee</h5>
                        <button
                            className="btn btn-primary w-100"
                            onClick={toggleFormVisibility}
                        >
                            {showForm ? 'Cancel' : 'Add Employee'}
                        </button>
                        {/* AddEmployeeCard Form */}
                        {showForm && (
                            <div className="mt-4">
                                <AddEmployeeCard addEmployee={addEmployee} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Employee Cards Section */}
            <div className="text-center mt-5">
                <h3>Employee List</h3>
                <div className="d-flex justify-content-center flex-wrap gap-4">
                    {employees.map((employee, index) => (
                        <EmployeeCard key={index} employee={employee} />
                    ))}
                </div>
            </div>

            {/* Leave Requests Section */}
            <div className="text-center mt-5">
                <h3>Leave Requests</h3>
                <RequestsSection leaveRequests={leaveRequests} />
            </div>
        </div>
    );
}

export default HrDashboard;
