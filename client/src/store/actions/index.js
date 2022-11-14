import axios from "axios"
export const FETCH_REC = "FETCH_REC"
export const SEARCH = "SEARCH"
export const SORT = "SORT"
export const FILTER = "FILTER"
export const FETCH_T = "FETCH_T"
export const ADD_REC= "ADD_rEC"
export function fetchRec(){
    return function (dispatch){
        axios.get("/recipes")
        .then ((rec) =>{
            dispatch({
                type: FETCH_REC,
                payload: rec
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}
export function searchRec(name){
    return function (dispatch){
        axios.get("/recipes?name="+name)
        .then ((rec) =>{
            dispatch({
                type: SEARCH,
                payload: rec
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}
export function addRec(post, rec){
    return function (dispatch){
    axios.post("/recipes/add", post,  
    {headers:{"Content-Type" : "application/json"}})
    .then((rec)=>{
        dispatch({type: ADD_REC,
        payload: rec})
    })
    .catch((error)=>{
        console.log(error)
    })}
}
export function fetchType(){
    return function (dispatch){
        axios.get("/types")
        .then((t)=>{
            dispatch({
                type: FETCH_T,
                payload: t})
        })
        .catch((error)=>{
            console.log(error)
        }
        )
    }
}
export function sort(order){
    return {
        type: SORT,
        payload: order
    }
}
export function filter(data){
    return{
        type: FILTER,
        payload: data
    }
}