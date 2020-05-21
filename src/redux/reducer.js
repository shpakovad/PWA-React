import CacheManager from "../cache";

const TEXT_ITEMS_FETCH_DATA_SUCCESS = "TEXT-ITEMS-FETCH-DATA-SUCCESS";
const CHANGED_INPUT_VALUE = "CHANGED-INPUT-VALUE";
const ADDED_TEXT_ITEM = "ADDED-TEXT-ITEM";
const REFRESH_STATE = "REFRESH-STATE";

const cache = new CacheManager()

const initialState = {
    textItems: [],
    inputValue: "",
}

let newState

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TEXT_ITEMS_FETCH_DATA_SUCCESS:
            newState = {
                ...state,
                textItems: action.textItems
            }
            cache.writeData('state', newState)
            return newState

        case CHANGED_INPUT_VALUE:
            return {
                ...state,
                inputValue: action.inputValue
            }

        case ADDED_TEXT_ITEM:
            newState = {
                ...state,
                textItems: [...state.textItems, action.newTextItem]
            }
            cache.writeData('state', newState)
            return newState

        case REFRESH_STATE:
            return action.state

        default:
            return state
    }
}

export const textItemsFetchDataSuccess = (textItems) => {
    return {type: TEXT_ITEMS_FETCH_DATA_SUCCESS, textItems}
};
export const changeInputValue = (inputValue) => {
    return {type: CHANGED_INPUT_VALUE, inputValue}
};
export const addNewTextItem = (newTextItem) => {
    return {type: ADDED_TEXT_ITEM, newTextItem}
};
export const refreshState = state => {
    return {type: REFRESH_STATE, state}
}


export function textItemFetchData(url) {
    return (dispatch) => {
        fetch(url, {headers: {Pragma: 'no-cache'}, method: 'GET'})
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(textItems => dispatch(textItemsFetchDataSuccess(textItems)))
            .catch(error => console.log(error));
    }
}

export function addTextItemFetchData(url, newTextItem) {
    return (dispatch) => {
        fetch(url, {headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify(newTextItem)})
            .then((item) => {
                console.log(newTextItem)
                dispatch(addNewTextItem(newTextItem))
            })
    }
}

export default reducer
