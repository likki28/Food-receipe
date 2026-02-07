import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext=createContext(null);

export default function GlobalState({children}){

    const [searchParam,setSearchParam] =useState('');
    const [recipeList, setRecipeList] = useState([]);
    const [loading,setLoading]=useState(false)
    const [recipeDetailsData,setRecipeDetailsData]=useState(null);
    const [favoritesList, setFavoritesList] = useState([])

    const navigate=useNavigate();


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
                navigate('/')
            }

        }catch(e){

            console.log(e);
            setLoading(false);
            setSearchParam("");
        }
        
    }

    function handleAddToFavorite(getCurrentItem){

        let cpyFavortesList=[...favoritesList]

        const index=cpyFavortesList.findIndex(item=>item.id===getCurrentItem.id)

        if(index=== -1){
            cpyFavortesList.push(getCurrentItem)
        }else {
            cpyFavortesList.splice(index)
        }

        setFavoritesList(cpyFavortesList)

        
    }
    console.log("Aded to fav",favoritesList);

    return <GlobalContext.Provider value={{searchParam,
        setSearchParam,
        handleSubmit,
        recipeList,
        loading,
    favoritesList,
setFavoritesList,
recipeDetailsData,
setRecipeDetailsData,
handleAddToFavorite}}>{children}</GlobalContext.Provider>

}
