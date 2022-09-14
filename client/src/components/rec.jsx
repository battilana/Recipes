import { Link } from "react-router-dom";
import "../App.css"
export default function Rec ({ id, type, image,  name }){
    return <Link className ="card" to ={`/${id}`}>
            {image && <img className="img" src={image} alt="imagen"></img>}
            <div className="item">
                <p>{name}</p>
            </div>

             {type? 
                type.map((e, index)=>(
                    <h3 className="h3" key = {index}>{e}</h3> 
                ))      
                :null}   
            </Link>

}