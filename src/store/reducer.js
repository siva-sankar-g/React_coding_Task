import { Actions } from "../components/UserContainer"




const userReducer = (state = {}, action) => {
    console.log('reducer=>', action)

    switch (action.type) {
        case 'SET_ACTION_TYPE': return {
            ...state,
            actionType: action.payload.actionType,
            actionData: action.payload.actionData
        }
        case 'ADD_EDIT_USERS': {
            let list;
            if (state?.actionType === Actions.EDIT) {
                let index = state?.usersList?.findIndex(x => x.id === state?.actionData?.id)
                list = [...state?.usersList]
                list.splice(index, 1, action.payload)
            } else {
                list = state?.usersList ? [...state?.usersList, action.payload] : [action.payload]
            }
            return {
                ...state,
                usersList: list,
                actionData: null,
                actionType: null
            }
        }
        case 'DELETE_RESTORE_USERS': {
            let list, deletedUsersList;
            if (action.payload.actionType === Actions.DELETE) {
                let index = state.usersList?.find(x => x.id === action.payload.userId);
                list = [...state.usersList];
                deletedUsersList = [...(state?.deletedUsersList || []), ...list.splice(index, 1)]
            } else {
                let index = state.deletedUsersList?.find(x => x.id === action.payload.userId);
                deletedUsersList = [...state.deletedUsersList];
                list = [...(state?.usersList || []), ...deletedUsersList.splice(index, 1)]
            }
            return {
                ...state,
                usersList: list,
                deletedUsersList,
                actionType: null
            }
        }
        default: return { ...state }
    }
}

export default userReducer
