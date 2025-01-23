import React, { useState } from 'react';

function RequestsSection({ leaveRequests, updateLeaveRequest }) {
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const handleManageClick = (id) => {
        setSelectedRequestId(selectedRequestId === id ? null : id); // Toggle form visibility
    };

    const handleUpdate = (id) => {
        updateLeaveRequest(id, newStatus); // Update request in db.json
        setSelectedRequestId(null); // Close the form after update
    };

    return (
        <div className="d-flex flex-wrap justify-content-center gap-4 align-items-start">
            {leaveRequests.length > 0 ? (
                leaveRequests.map((request) => (
                    <div key={request.id} className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Request by: {request.email}</h5>
                            <p className="card-text"><strong>Reason:</strong> {request.reason}</p>
                            <p className="card-text"><strong>Status:</strong> {request.status}</p>
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => handleManageClick(request.id)}
                            >
                                Manage Request
                            </button>
                            {selectedRequestId === request.id && (
                                <div className="mt-3">
                                    <select
                                        className="form-select"
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Accepted">Accepted</option>
                                    </select>
                                    <button
                                        className="btn btn-success mt-2 w-100"
                                        onClick={() => handleUpdate(request.id)}
                                    >
                                        Update
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-white'>No leave requests available.</p>
            )}
        </div>
    );
}

export default RequestsSection;
