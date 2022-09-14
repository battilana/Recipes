import { Link } from "react-router-dom"
import Filter from "./filter"
import SearchBar from "./search"
import Sort from "./sort"
import "../App.css"

export default function NavBar(){
    return  <ul className='navbar-nav'>
                <li>
                    <Link to ="/add"><button className='button'>Add new Recipe</button></Link>
                </li>
                <li>
                    <Sort></Sort> 
                </li>
                <li>
                    <Filter></Filter>
                </li>
                <li>
                    <SearchBar></SearchBar>
                </li>
            </ul>
}