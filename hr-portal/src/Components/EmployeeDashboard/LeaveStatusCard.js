import React, { useState, useEffect } from 'react';

function LeaveStatusCard({ user }) {
    const [leaveStatus, setLeaveStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaveStatus = async () => {
            try {
                console.log("Fetching leave info for user:", user); // Debug log
                const response = await fetch('http://localhost:5000/leaveInfo');
                const leaveData = await response.json();

                console.log("Fetched leave data:", leaveData); // Debug log

                // Find the leave info for the current user's email
                const userLeave = leaveData.find((leave) => leave.email === user.email);

                if (userLeave) {
                    console.log("Leave found for user:", userLeave); // Debug log
                    setLeaveStatus(userLeave.status);
                } else {
                    console.log("No leave applied for user:", user.email); // Debug log
                    setLeaveStatus('No leave applied');
                }
            } catch (error) {
                console.error('Error fetching leave status:', error);
                setLeaveStatus('Error fetching leave status');
            } finally {
                setLoading(false); // Ensure loading stops
            }
        };

        if (user?.email) {
            fetchLeaveStatus();
        } else {
            console.error('User email is missing or undefined');
            setLeaveStatus('No leave applied');
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <p>Loading leave status...</p>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{user.name || 'User'}, View Your Leave Details</h5>
                <button
                    className="btn btn-info"
                    onClick={() => alert(leaveStatus || 'No leave applied')}
                >
                    View Leave Status
                </button>
                <div className="mt-3">
                    <p><strong>Status:</strong> {leaveStatus || 'Pending'}</p>
                </div>
            </div>
        </div>
    );
}

export default LeaveStatusCard;
