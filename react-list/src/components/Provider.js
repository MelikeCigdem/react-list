import React,{useReducer} from "react";
import {reducer} from "./Reducer";

import Context, {initialState} from "./Store";

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    );
}

export default Provider;