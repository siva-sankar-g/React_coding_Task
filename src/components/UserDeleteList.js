import React from 'react';
import { setActionType, deleteRestoreUsers } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from './UserContainer';

function UserDeleteList() {

    const dispatch = useDispatch();

    const usersList = useSelector(state => state?.userReducer?.deletedUsersList);

    return (
        <div className='mt-3'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (usersList?.length > 0 ? usersList : []).map((user) => <tr key={user.id}>
                            <th>{user.name}</th>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <button type="button" className="btn btn-primary ms-2" onClick={() => dispatch(deleteRestoreUsers(Actions.RESTORE, user.id))}>Restore</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            {(!usersList || usersList?.length === 0) && <h6 className='text-center'>No Records</h6>}
        </div>
    )
}

export default UserDeleteList