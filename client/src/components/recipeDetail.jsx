import { ifError } from "assert"
import axios from "axios"
import { useEffect, useState } from "react"
import {useParams} from "react-router"
import { Link } from "react-router-dom"
export default function RecipeDetail(){
    const [rec, setRec] = useState("")
    let {id} = useParams()
    useEffect(()=>{
        axios.get("/recipes/" + id)
        .then((r)=>{
            if(r.data.id < 1000000){
                let recipe = {
                    image:r.data.image,
                    name: r.data.title,
                    description: r.data.summary,
                    score: r.data.healthScore,
                    type: r.data.diets,
                }
                setRec(recipe)
            }
            else setRec(r.data)

        })
    },[])
    console.log(rec)
    return <div>
        { 
        rec?
        <>
         <h1 className="label">{rec.name} </h1> {
             rec.image? 
                <img className="img" src = {rec.image} alt= {rec.name}></img>
            : null
         }
        <ul className="detail">
            <li className="detaiLi" >Summary: {rec.description}</li>
            <li className="detaiLi">Score: {rec.score}</li>
            {/* <li className="detaiLi">Type: </li>{
                rec.dishTypes.map((e, index)=>(
                    <li  className="detaiLi" key = {index}>{e}</li>
            ))
            } */}
             <li className="detaiLi">Diets: </li>{
                rec.type.map((e, index)=>(
                    <li  className="detaiLi" key = {index}>{e}</li>
            ))
            } 
        </ul>
        <button className="button"><Link className="h1" to = "/home">Back</Link></button>
        </>: <div>Loading...</div>
        }
    </div>
}