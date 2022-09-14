import './App.css';
import { Switch, Route, Link} from "react-router-dom"
import Recipes from './components/recipes';
import RecipeDetail from "./components/recipeDetail"
import AddRec from './components/addRecipe';
import NavBar from './components/navBar';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Link to="/home">
            <button className='button'>
            Enter Henry Recipes
            </button>
          </Link>
        </Route>
        <Route exact path="/home">
        <NavBar></NavBar>
        <Recipes/>
        </Route>
        <Route exact path="/add">
          <AddRec></AddRec>
        </Route>
        <Route exact path="/:id">
          <RecipeDetail></RecipeDetail>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
