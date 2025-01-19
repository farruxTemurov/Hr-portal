import React, { useState, useEffect } from 'react';
import AddEmployeeCard from './AddEmployeeCard';
import EmployeeCard from './EmployeeCard';
import RequestsSection from './RequestsSection';

function HrDashboard() {
    const [employees, setEmployees] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Fetch employees and leave requests from `db.json` when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesResponse = await fetch('http://localhost:5000/employees');
                const employeesData = await employeesResponse.json();
                setEmployees(employeesData);

                const leaveResponse = await fetch('http://localhost:5000/leaveInfo');
                const leaveData = await leaveResponse.json();
                setLeaveRequests(leaveData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Add new employee to the `db.json` file and update state
    const addEmployee = async (employee) => {
        try {
            const response = await fetch('http://localhost:5000/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee),
            });
            const newEmployee = await response.json();
            setEmployees([...employees, newEmployee]);
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    // Update leave request status in `db.json` and update state
    const updateLeaveRequest = async (id, newStatus) => {
        try {
            const requestToUpdate = leaveRequests.find((request) => request.id === id);
            const updatedRequest = { ...requestToUpdate, status: newStatus };

            await fetch(`http://localhost:5000/leaveInfo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRequest),
            });

            // Update the leaveRequests state with the new status
            setLeaveRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === id ? updatedRequest : request
                )
            );
        } catch (error) {
            console.error('Error updating leave request:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 text-white">HR Dashboard</h1>

            {/* Add Employee Section */}
            <div className="text-center mb-5">
                <div className="card mx-auto" style={{ width: '30rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Add New Employee</h5>
                        <button
                            className="btn btn-primary w-100"
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Cancel' : 'Add Employee'}
                        </button>
                        {showForm && (
                            <div className="mt-4">
                                <AddEmployeeCard addEmployee={addEmployee} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Employee Cards Section */}
            <div className="text-center">
                <h3 className="text-white">Employee List</h3>
                <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
                    {employees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                </div>
            </div>

            {/* Leave Requests Section */}
            <div className="text-center mt-5">
                <h3 className="text-white">Leave Requests</h3>
                <RequestsSection
                    leaveRequests={leaveRequests}
                    updateLeaveRequest={updateLeaveRequest}
                />
            </div>
        </div>
    );
}

export default HrDashboard;
