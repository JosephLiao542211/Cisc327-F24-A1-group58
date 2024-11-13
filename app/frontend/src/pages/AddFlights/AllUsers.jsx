
import React from 'react';

const AllUsers = ({ users }) => {
    return (
        <div className='control-panel'>
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <strong>{user.firstName} {user.lastName}</strong>
                        <div className="text-gray-500">
                            <strong>User Id: </strong>{user._id} <strong>User Email: </strong>{user.email} <strong>User PhoneNumber: </strong>{user.phoneNumber}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllUsers;