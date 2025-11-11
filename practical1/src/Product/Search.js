import { useEffect, useState } from "react";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import axios from "axios";
import Product from "./Product"

function Search(){
    let searchWord = ""
    let queryParms = new URLSearchParams(window.location.search)
    searchWord = queryParms.get("keyword")
    const [products, setproducts] = useState([])


    useEffect(() =>{

        const GetProductData = async() =>{
            let ApiResponse = await axios.get("https://dummyjson.com/products/search?q=iphone")
             setproducts(ApiResponse.data.products)
        }
         GetProductData()

    },[])



    return(
        
         <div>
          <Navbar/>
          <div className="container">
              <div className="row mt-4">
                 <div className="col-4"></div>
                    <div className="col-8">
                        {
                            products.map((product, i) =>(
                                <div>
                                    <Product key={i} data={product}/>
                                </div>
                            ))
                        }

                    </div>

              </div>
             
          </div>
             <Footer/>
      </div>

    )
}



export default Search;