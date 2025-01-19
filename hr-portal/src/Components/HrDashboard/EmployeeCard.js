import React from 'react';

function EmployeeCard({ employee }) {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{employee.name}</h5>
                <p className="card-text"><strong>Email:</strong> {employee.email}</p>
                <p className="card-text"><strong>Department:</strong> {employee.department}</p>
                <p className="card-text"><strong>Position:</strong> {employee.position}</p>
            </div>
        </div>
    );
}

export default EmployeeCard;
