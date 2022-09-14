import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { addRec, fetchType} from "../store/actions"


let cont = 1000000

export default function AddRec(){
    const [rec, setRec] = useState({
        name : "",
        id: "",
        image: "",
        diets: [],
        description: "",
        steps: "",
        score:""
    })
    const [diets, setDiets] = useState([])
    const [steps,setSteps] = useState("")
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchType)
    })
    let type = useSelector ((state)=> state.types)
    let history = useHistory()
    function onInputChange(e){
        e.preventDefault()
        setRec({
            ...rec,
            [e.target.name] : e.target.value
        })
        console.log(rec)

    }
    function checkChange(e){
        if(e.target.checked){
            setDiets(diets => ([...diets, e.target.name]))
            console.log(diets)
        }
        else {
            let dietsList = diets.filter(g => g !== e.target.name)
            setDiets(dietsList)
    }}
    function addStep(e) {
        e.preventDefault()
        let newStep = rec.steps
        setSteps([...steps, newStep])
        setRec({...rec,
            steps:""})
    }
// function checkChange2(e){
//     console.log(e.target.checked)
//     if (e.target.checked){
//     setType(type => ([...type, e.target.name]))}
//     else {
//         let typeList =  type.filter(p=> p !== e.target.name)
//         setType(typeList)

// }}
function onSubmit(e){
    e.preventDefault()
    rec.diets = diets
    rec.type = type
    rec.id = cont
    cont++
    let post = JSON.stringify({
        name : rec.name,
        id: rec.id,
        type: rec.diets,
        description: rec.description,
        score: rec.score,
        steps: steps
    })
    dispatch(addRec(post, rec))
    history.push("/home")
}
return <div className= "formC">
    <form className="formC" onSubmit={onSubmit}>
        <label className="label" htmlFor="">Name</label>
        <input className="input" name ="name" onChange={onInputChange} type="text" value = {rec.name} />
        <label className="label" htmlFor="">Summary</label>
        <input className="input" name ="description" onChange={onInputChange} type="text" value = {rec.summary} />
        <label className="label" htmlFor="">Score</label>
        <input className="input" name ="score" onChange={onInputChange} type="text" value = {rec.score} />
        <label className="label" htmlFor="">Step by step</label>
        <input className="input" name ="steps" onChange={onInputChange} type="text" value = {rec.steps} />
        <button className="button2" type="button" onClick={addStep}>Add step</button>
        {steps && <p>
                {steps.map((s)=>{
                    return <p>
                        {s}
                        <button className="button3"type="button">Edit step</button>
                        <button className="button3" type="button">Delete step</button>
                    </p>
                })}
        </p>

        }
        <div className="form2">
        {type.map((e, index)=>{
            return <div  key={index}>
                <label className="label2" >{e}</label>
                <input className="input" onChange={checkChange}type="checkbox" name={e} /> 
            </div>
            })}
        </div>
        <br></br>
        <input type="submit" className="button" value="ADD"></input>
        <Link to= "/home">
            <button className="button">BACK</button>
        </Link>
    </form> 
</div>
}