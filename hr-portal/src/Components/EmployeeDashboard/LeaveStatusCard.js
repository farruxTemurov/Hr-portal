import React, { useState, useEffect } from 'react';

function LeaveStatusCard({ user }) {
    const [leaveStatus, setLeaveStatus] = useState(null);

    useEffect(() => {
        // Fetch leave status from the database
        const fetchLeaveStatus = async () => {
            const response = await fetch('http://localhost:5000/leaveStatus');
            const data = await response.json();

            // Find the leave status for the current user
            const userLeaveStatus = data.find((leave) => leave.username === user.username);
            setLeaveStatus(userLeaveStatus ? userLeaveStatus.status : 'No leave applied');
        };

        fetchLeaveStatus();
    }, [user]);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Steven, View Your Leave Details</h5>
                <button className="btn btn-info" onClick={() => alert(leaveStatus)}>
                    View Leave Status
                </button>
                <div className="mt-3">
                    <p>Status: {leaveStatus || 'Pending'}</p>
                </div>
            </div>
        </div>
    );
}

export default LeaveStatusCard;
