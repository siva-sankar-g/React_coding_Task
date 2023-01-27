import React, { useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setActionType } from '../store/actions';
import { Actions } from './UserContainer';
import { addEditUsers } from '../store/actions';
import { v4 as uuidv4 } from 'uuid';

function UsersCreateEdit() {
    const dispatch = useDispatch();
    const [error, setError] = useState({})
    const actionData = useSelector(state => state?.userReducer?.actionData || null);
    const actionType = useSelector(state => state?.userReducer?.actionType)
    const usersList = useSelector(state => state?.userReducer?.usersList || []);
    console.log('actions=>', actionType, actionData)
    const toggle = () => dispatch(setActionType(actionType, { isModalOpen: false }));

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);

    const createUser = () => {
        let name = nameRef.current.value;
        let email = emailRef.current.value;
        let mobile = mobileRef.current.value;
        let errors = {}
        if (!name.length) {
            errors[nameRef.current.name] = 'Name is Required';
        } else if (!/^[a-zA-z ]+$/.test(name)) {
            errors[nameRef.current.name] = 'This Field Allow Only Alphabets';
        } else {
            delete errors[nameRef.current.name]
        }

        if (!email.length) {
            errors[emailRef.current.name] = 'Email is Required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            errors[emailRef.current.name] = 'Invalid Email';
        } else if (usersList.some(x => x.id === actionData?.id ? false : x.email === email)) {
            errors[emailRef.current.name] = 'Email already Exists';
        }
        else {
            delete errors[emailRef.current.name]
        }

        if (!mobile.length) {
            errors[mobileRef.current.name] = 'Mobile No is Required';
        } else if (!/^[0-9]{10}$/.test(mobile)) {
            errors[mobileRef.current.name] = 'Allow Only Numbers, Must have 10 Characters';
        } else {
            delete errors[mobileRef.current.name];
        }

        if (Object.keys(errors)?.length > 0) {
            console.log('erors=>', errors)
            setError(errors)
        } else {
            let user = {
                id: uuidv4(),
                name,
                email,
                mobile,
            }
            dispatch(addEditUsers(user))
            setError({})
        }
        // console.log(name, email, mobile)
    }


    return (
        <div>
            {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
            <Modal isOpen={!!actionData?.isModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{actionType === Actions.ADD ? "User Create" : "User Update"}</ModalHeader>
                <ModalBody>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                                name='name'
                                ref={nameRef}
                                className="form-control"
                                defaultValue={actionData?.name}
                                id="name"
                                placeholder="enter your name" />
                            <div className='mt-1 text-danger'>{error?.name}</div>
                            {console.log(error)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email"
                                name='email'
                                ref={emailRef}
                                className="form-control"
                                defaultValue={actionData?.email}
                                id="email"
                                placeholder="name@example.com" />
                            <div className='mt-1 text-danger'>{error?.email}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Mobile No</label>
                            <input type="mobile"
                                name='mobile'
                                ref={mobileRef}
                                className="form-control"
                                defaultValue={actionData?.mobile}
                                id="mobile"
                                placeholder="enter your mobile number" />
                            <div className='mt-1 text-danger'>{error?.mobile}</div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={createUser}>{actionType === Actions.ADD ? "Create" : "Update"}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UsersCreateEdit