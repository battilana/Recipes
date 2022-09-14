import React from "react";
import "../App.css"
export default function Paginado ({recPerPage, allRecs, paginado}){
    const pageNumbers = []
    for (let i= 1; i <=Math.ceil(allRecs/recPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav className = "paginationBox">
            <div className="pagination" >
                {pageNumbers &&
                pageNumbers.map((number, i) =>(
                    <a key={i} href="#"onClick={()=>paginado(number)}>{number}
                    </a>
                    ))}
            </div>
        </nav>
    )
}
