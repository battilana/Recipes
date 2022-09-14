import { useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from "react"
import {fetchRec} from "../store/actions"
import Rec from "./rec"
import "../App.css"
import Paginado from "./paginado"
export default function Recipes(){
    let recs = useSelector ((state) =>state.filteredRec)
    console.log(recs)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchRec())
    },[])
    const [currentPage, setCurrentPage] = useState(1)
    const [recPerPage, setRecPerPage] = useState(9)
    const allRecs = recs
    const indexOfLastRec = currentPage * recPerPage
    const indexOfFirstRec = indexOfLastRec - recPerPage
    const currentRecs = recs.slice(indexOfFirstRec, indexOfLastRec)
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    let type =[]
        return <>
            <Paginado 
            recPerPage={recPerPage}
            allRecs = {allRecs.length}
            paginado = {paginado}
            ></Paginado>
        <div className="Recs">
            {   currentRecs.map((rec)=>{
                return <Rec key= {rec.id} name = {rec.name} image= {rec.image}type= {rec.type} id = {rec.id}></Rec>
            })}
            </div>
        <Paginado 
        recPerPage={recPerPage}
        allRecs = {allRecs.length}
        paginado = {paginado}
        ></Paginado>

        </>}
