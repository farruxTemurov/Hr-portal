import React, { useState } from 'react';

function UserInfoCard({ user }) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails((prevState) => !prevState);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Welcome, {user.name}</h5>
                <button className="btn btn-info" onClick={toggleDetails}>
                    {showDetails ? 'Hide Details' : 'View Details'}
                </button>
                {showDetails && (
                    <div className="mt-3">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.position}</p>
                        <p><strong>Department:</strong> {user.department}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserInfoCard;
