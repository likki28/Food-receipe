import { useState } from "react";
import { createContext } from "react";

export const GlobalContext=createContext(null);

export default function GlobalState({children}){

    const [searchParam,setSearchParam] =useState('');
    const [recipeList, setRecipeList] = useState([]);
    const [loading,setLoading]=useState(false)


    async function handleSubmit(searchParam) {
        try{

            console.log("call made")
            const res= await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
            const data=await res.json();
            console.log("the value is",data);

            if(data?.data?.recipes){

                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam("");
            }

        }catch(e){

            console.log(e);
            setLoading(false);
            setSearchParam("");
        }
        
    }

    return <GlobalContext.Provider value={{searchParam,setSearchParam,handleSubmit,recipeList}}>{children}</GlobalContext.Provider>

}
