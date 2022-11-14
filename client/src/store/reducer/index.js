import { ASCENDENTE, DESCENDENTE, SCOREAS, SCOREDES } from "../../constants/sort"
import {FETCH_T, FETCH_REC, FILTER, SEARCH, SORT, ADD_REC} from "../actions"
import axios from "axios"
const initialState ={
    rec: [],
    filteredRec: [],
    types: []
}
export default function reducer(state=initialState, action){
    switch(action.type){
        case FETCH_REC:
            let res = action.payload.data
            // let gen = []
            // res = res.map((e)=>{
            //     if(e.id<555555){
            //     e.genre.map((g) =>{
            //         return gen.push(g.name)
            //     })
            //     e.genre = gen}
            //     gen = []
            //     return e
            // })
            return {
                ...state,
                rec: res,
                filteredRec: res
            }
             case SEARCH:
                let res2 = action.payload.data
                let type2 = []
                console.log(res2)
                //     res2 = res2.map((e)=>{
                //     e.types.map((g) =>{
                //         return type2.push(g.name)
                //     })
                //     e.genre = gen2 
                //     gen2 = []
                //     return e
                // })
                return {
                    ...state,
                     filteredRec: res2
                 }
                 case SORT:
                    let orderedRec = [...state.filteredRec]
                    orderedRec.sort((a, b)=>{
                        switch(action.payload){
                        case ASCENDENTE : 
                            if (a.name < b.name){
                            return -1 }return 1;
                        case DESCENDENTE : 
                            if (a.name > b.name){
                            return  -1} return 1;
                        case SCOREAS : 
                            if (a.score < b.score){
                            return -1} return 1;
                        case SCOREDES : 
                            if(a.score > b.score){
                            return -1} return 1;
                        default : return 0;}})
                    return {
                        ...state,
                        filteredRec: orderedRec
                    }
            case FETCH_T:
                let types = action.payload.data
                let typesState = types.map((t) => t = t.name)
                return {
                    ...state,
                    types : typesState
                }
            case FILTER:
                console.log(state.rec)
                let newFiltered = [...state.rec]
                let cond = action.payload.types
                if (cond){
                    console.log(cond)
                    cond.forEach((t)=>{
                        t = t.toLowerCase()
                        console.log(t)
                        newFiltered = newFiltered.filter(r=>
                             r.types.includes(t)
                            )
                    })
                }
                return {
                    ...state,
                    filteredRec: newFiltered
                }

            //     switch(action.payload.type){
            //         case 0: return {
            //             ...state,
            //             filteredrec: newFiltered
            //         };
            //         case 1: console.log(newFiltered) 
            //             newFiltered = [...state.filteredrec].filter(v =>
            //             v.id < 555555)
            //         return {
            //             ...state,
            //             filteredrec: newFiltered
            //         };
                            
            //         case 2: newFiltered = [...state.filteredrec].filter(v => v.id > 555555)
            //         console.log(newFiltered)
            //         return {
            //             ...state,
            //             filteredrec: newFiltered
            //         };
            //         default: return {
            //             ...state,
            //             filteredrec: newFiltered
            //         }
            //     }
                case ADD_REC:
                    let newRec = action.payload
                    let newAdded = [...state.filteredRec].push(newRec)
                    newRec.type.map((t)=>(
                        axios.post(`/recipes/${newRec.id}/types/${t}`)
                        .catch((error)=>console.log(error))
                    ))
                    return {
                        ...state,
                        filteredRec: newAdded
                    }
        default: return state
    }
}