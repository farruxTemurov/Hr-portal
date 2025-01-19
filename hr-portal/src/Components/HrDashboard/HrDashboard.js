import React, { useState, useEffect } from 'react';
import AddEmployeeCard from './AddEmployeeCard';
import EmployeeCard from './EmployeeCard';
import RequestsSection from './RequestsSection';

function HrDashboard() {
    const [employees, setEmployees] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);

    // Function to add new employee to the list
    const addEmployee = (employee) => {
        setEmployees([...employees, employee]);
    };

    // Fetch leave requests from db.json on component mount
    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await fetch('http://localhost:5000/leaveInfo');
                const leaveData = await response.json();
                setLeaveRequests(leaveData); // Set the fetched leave requests in state
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };

        fetchLeaveRequests();
    }, []); // Empty dependency array to fetch only once when the component mounts

    return (
        <div className="container mt-5">
            {/* Add New Employee Section */}
            <div className="text-center mb-4">
                <h2>Add New Employee</h2>
                <AddEmployeeCard addEmployee={addEmployee} />
            </div>

            {/* Employee Cards */}
            <div className="d-flex justify-content-center flex-wrap gap-4">
                {employees.map((employee, index) => (
                    <EmployeeCard key={index} employee={employee} />
                ))}
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
