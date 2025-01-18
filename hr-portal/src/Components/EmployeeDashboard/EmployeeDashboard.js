import React, { useState, useEffect } from 'react';
import UserInfoCard from './UserInfoCard';
import LeaveStatusCard from './LeaveStatusCard';
import ApplyLeaveCard from './ApplyLeaveCard';

function EmployeeDashboard() {
    const [userData, setUserData] = useState(null);

    // Assuming the user is logged in and user email is stored in localStorage
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail'); // Email of logged-in user

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:5000/employees');
            const employees = await response.json();

            const user = employees.find((emp) => emp.email === loggedInUserEmail);
            if (user) {
                setUserData(user);
            } else {
                console.error('User not found');
            }
        };

        if (loggedInUserEmail) {
            fetchUserData();
        }
    }, [loggedInUserEmail]);

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <UserInfoCard user={userData} />
                </div>
                <div className="col-md-4">
                    <LeaveStatusCard user={userData} />
                </div>
                <div className="col-md-4">
                    <ApplyLeaveCard user={userData} />
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;
