import React from 'react';

function RequestsSection({ leaveRequests }) {
    return (
        <div className="mt-4">
            {leaveRequests.length > 0 ? (
                leaveRequests.map((request, index) => (
                    <div key={index} className="card mb-3" style={{ maxWidth: '540px' }}>
                        <div className="card-body">
                            <h5 className="card-title">{request.email}</h5> {/* Assuming 'name' is email in the leaveInfo */}
                            <p className="card-text"><strong>Reason:</strong> {request.reason}</p>
                            <p className="card-text"><strong>Status:</strong> {request.status}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No leave requests at the moment.</p>
            )}
        </div>
    );
}

export default RequestsSection;
