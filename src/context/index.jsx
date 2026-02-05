import { useState } from "react";
import { createContext } from "react";

export const GlobalContext=createContext(null);

export default function GlobalState({children}){

    const [searchParam,setSearchParam] =useState('')

    return <GlobalContext.Provider value={{searchParam,setSearchParam}}>{children}</GlobalContext.Provider>

}
