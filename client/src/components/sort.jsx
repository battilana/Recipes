import "../App.css"
import {useDispatch} from "react-redux"
import {sort} from "../store/actions"
import {ASCENDENTE, DESCENDENTE, SCOREAS, SCOREDES} from "../constants/sort"
export default function Sort(){
    const dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    return <select name ="select" onChange={onSelectChange} className="button">
        <option className="button" value= "" >Sort by: </option>
        <optgroup className="button" label="Alphabetic">
        <option className="" value={ASCENDENTE} >Ascendent</option>
        <option className="" value={DESCENDENTE} >Descendent</option>
        </optgroup>
        <optgroup className="button" label="Health score">
        <option className="" value={SCOREAS} >Ascendent </option>
        <option className="button" value={SCOREDES} >Descendent </option>
        </optgroup>
    </select>
    
} 