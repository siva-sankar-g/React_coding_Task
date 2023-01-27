import React, { useState } from 'react';
import UsersList from './UsersList';
import UserDeleteList from './UserDeleteList';
import UsersCreateEdit from './UsersCreateEdit';


export const Actions = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    EDIT: 'EDIT',
    RESTORE: 'RESTORE',
    USER: 'USER',
    DUSER: 'DUSER'
}

function UserContainer() {
    const [show, setShow] = useState(Actions.USER);
    return (
        <div className='container mt-4'>
            <h3>React Task</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button type='button' className={`nav-link ${show === Actions.USER ? 'active' : ""}`} onClick={() => { setShow(Actions.USER) }}>User</button>
                </li>
                <li className="nav-item">
                    <button type='button' className={`nav-link ${show === Actions.DUSER ? 'active' : ""}`} onClick={() => { setShow(Actions.DUSER) }}>Delete User</button>
                </li>
            </ul>
            {show === Actions.USER ? <UsersList /> : <UserDeleteList />}
            <UsersCreateEdit />
        </div>

    )
}

export default UserContainer