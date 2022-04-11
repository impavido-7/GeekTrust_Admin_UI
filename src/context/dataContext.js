import createDataContext from "./createDataContext";

import API from "../API/api";

const dataReducer = (state, action) => {
    switch (action.type) {
        case "get_data":
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

const getData = (dispatch) => {
    return async () => {
        try {
            const response = await API.get("/members.json");
            dispatch({
                type: "get_data",
                payload: response.data
            })
        } catch (err) {
            console.log(err.message)
        }
    }
}

const editItem = dispatch => (entry, data) => {
    const pos = data.map(item => item.id).indexOf(entry.id);
    data[pos].name = entry.name;
    data[pos].email = entry.email;
    data[pos].role = entry.role;
    dispatch({ type: "get_data", payload: data });
}

const deleteItem = dispatch => (id, data) => {
    const pos = data.map(item => item.id).indexOf(id);
    data.splice(pos, 1);
    dispatch({ type: "get_data", payload: data });
}

const deleteMultipleEntries = dispatch => (indexArray, totalArray) => {
    const array = totalArray.filter(item => indexArray.indexOf(item.id) === -1);
    dispatch({ type: "get_data", payload: array });
}

export const { Provider, Context } = createDataContext(
    dataReducer,
    { getData, editItem, deleteItem, deleteMultipleEntries },
    { data: null }
);