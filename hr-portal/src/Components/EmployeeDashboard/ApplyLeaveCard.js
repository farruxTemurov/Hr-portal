import React, { useState } from 'react';

function ApplyLeaveCard({ user }) {
    const [leaveReason, setLeaveReason] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setLeaveReason(e.target.value);
    };

    const handleApplyLeave = async () => {
        if (!leaveReason) {
            setError('Please provide a reason for leave.');
            return;
        }

        const leaveData = {
            username: user.username,
            reason: leaveReason,
            status: 'Pending', // Initially set status to 'Pending'
        };

        try {
            const response = await fetch('http://localhost:5000/leaveStatus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leaveData),
            });

            if (response.ok) {
                alert('Leave application submitted!');
                setLeaveReason('');
            } else {
                alert('Failed to apply for leave.');
            }
        } catch (err) {
            console.error('Error applying for leave:', err);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Apply for Leave</h5>
                <div className="form-group mb-3">
                    <label htmlFor="leaveReason">Reason for Leave</label>
                    <textarea
                        id="leaveReason"
                        className="form-control"
                        value={leaveReason}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button className="btn btn-primary" onClick={handleApplyLeave}>
                    Apply for Leave
                </button>
            </div>
        </div>
    );
}

export default ApplyLeaveCard;
