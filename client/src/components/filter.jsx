import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchType, filter } from "../store/actions";

export default function Filter(){
    const [toggle, setToggle] = useState("false")
    const [cond, setCond] = useState({types:[]})
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch (fetchType())
    },[])
    let types = useSelector((state)=>state.types)
    function changeToggle(e){
        console.log(types)
        if (toggle === "false"){
            setToggle("true")
        }
        else setToggle("false")
    }
    function checkChange(e){
        if (e.target.checked){
        let typeList = cond.types
        let newType = e.target.name
        typeList = [...typeList, newType]
        setCond({...cond, types: typeList})
        console.log(cond)
    }
        else {
            let typesList = cond.types.filter(g => g != e.target.name)
            setCond({...cond, types: typesList})
            console.log(cond)
        }
}

    function applyChanges(e){
        e.preventDefault()
        console.log(cond)
        dispatch(filter(cond))
    }
    return <div><button className="button"name="select" onClick={changeToggle} >
                FILTER
                </button>
            {(toggle === "false")? null:
            <div className="filter">
            <form className="grid" onSubmit={applyChanges}>
        <p> By type of diet:
            <div>
            {types.map((e, index)=>{
                return <p className="itemFilter" key={index}>
                    <label>{e}</label>
                    <input type="checkbox"  name ={e} onChange={checkChange} /> 
                       </p>
                })
            }
            </div>
        </p>
        <input className= "searchInputButton" type="submit" value = "Apply"/>
                </form></div>
            
                }

                
    </div>
}