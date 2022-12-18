import {createContext} from "react";

export const initialState = {
    userName: "Melike"
}


const Context = createContext(initialState);

export default Context