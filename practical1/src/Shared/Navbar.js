import { Link } from "react-router-dom"
import { CheckUserLoginstatus } from "../Utilitys/Utilities"
import { useState } from "react"
import { SearchSuggestionApi } from "../Services/SearchServices"

function Navbar(){

const isUseredLoggedin = CheckUserLoginstatus()
let [searchWord, setsearchWord]= useState("")
const [ShowSearchDropDown , setShowSearchDropDown] = useState(false)
const [SearchSuggestionList , setSearchSuggestionList] = useState ([])


const logoutuser = () =>{
    localStorage.clear()
    
}

    const SearchHandler = async(event) =>{
        let keyword = event.target.value;
        if(keyword.length > 0)
            console.log("Make Api Call")

        let ApiResponse = await SearchSuggestionApi({searchWord: keyword})
      let SuggestionList = ApiResponse.data.data
      console.log(SuggestionList)
      let SuggestionValues = SuggestionList.map(suggestion =>{
             return suggestion.value
      })
        console.log(SuggestionValues)
        setSearchSuggestionList([...SuggestionValues])
        setShowSearchDropDown(true)
     }

     const HandleSuggestionList = (suggestion) =>{
        console.log(suggestion)
        window.location='/search-product? keyword='  + suggestion

     }


    return(
        <nav className="navbar bg-body-tertiary navbar-expand-lg">
             <div className="container-fluid">
                <h3 className="navabr-brand">Amazon</h3>
                <div class="input-group">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action before</a></li>
                            <li><a class="dropdown-item" href="#">Another action before</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                                <input type="text" class="form-control" onChange={event => SearchHandler(event)}/>
                                <button class="btn btn-outline-secondary "><i class="bi bi-search"></i></button>
                                {
                                  ShowSearchDropDown == true &&
                                  <div className="search-dropdown shadow">
                                    {
                                         SearchSuggestionList.map((suggestion, i  ) => (
                                            <div key={i} className="suggestion-item"  onClick={event=> HandleSuggestionList(suggestion)}>
                                            {suggestion}
                                            </div>
                                        ))
                                       
                                    }
                                  </div>
                                }
                    </div>
                    <div className="d-flex">
                        <ul className="navbar-nav">
                            <li className="navbar-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/">Pricing</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/">Contact Us </Link>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                                {
                                 isUseredLoggedin == false &&
                                 <ul className="dropdown-menu">
                                            <Link className="dropdown-item" to="/sign-in">Sign in</Link>
                                 </ul>
                                }
                                {
                                        isUseredLoggedin == true &&
                                         <ul className="dropdown-menu">
                                            <Link className="dropdown-item" to="/cart">Cart</Link>
                                            <Link className="dropdown-item" to="/addresses">Manage Addresse</Link>
                                        <Link className="dropdown-item" onClick={event => logoutuser()}>Log Out</Link>
                                    </ul>
                                    }
                    </div>
             </div>
        </nav>

    )
}

export default Navbar