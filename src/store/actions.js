
export const setActionType = (actionType, actionData) => ({
    type: 'SET_ACTION_TYPE',
    payload: { actionType, actionData }
});

export const addEditUsers = (userData) => ({
    type: 'ADD_EDIT_USERS',
    payload: userData
});

export const deleteRestoreUsers = (actionType, userId) => ({
    type: "DELETE_RESTORE_USERS",
    payload: { actionType, userId }
})


