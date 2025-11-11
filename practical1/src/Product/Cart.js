import axios from "axios";
import { useEffect, useState } from "react"
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

function Cart(){
const [CartData , setCartData] = useState([])




useEffect(() =>{

       const GetCartData = async() =>{
         let userId = 6 ;
        let ApiResponse = await axios.get("https://dummyjson.com/carts/user/" + userId)
         setCartData([...ApiResponse.data.carts])
       }
       GetCartData()

},[])

const UpdateProductData = async(ApiData) =>{

    let ApiResponse = await axios.put("https://dummyjson.com/carts/1" , ApiData)
    console.log(ApiResponse)

}

const IncrementQuantity = async(product,j,cart,i) =>{
    let NewQuantity = product.quantity +1
    let tempcart = [...CartData]

    tempcart[i]["products"][j].quantity = NewQuantity
    setCartData([...tempcart])

     let ApiData ={
        merge:true,
        products:[
            {
                id:product.id,
                quantity:NewQuantity
            }
        ]
    }
    UpdateProductData(ApiData)
}

const DecrementQuantity = async(product,j,cart,i) =>{
    let NewQuantity = product.quantity -1
    if(NewQuantity > 0){
        let tempcart = [...CartData]

        tempcart[i]["products"][j].quantity = NewQuantity
        setCartData([...tempcart])

        let ApiData ={
        merge:true,
        products:[
            {
                id:product.id,
                quantity:NewQuantity
            }
        ]
    }
    UpdateProductData(ApiData)

    
    }
}

const CalculateQuantityAndPrice = (products) =>{
    let totalquantity = 0;
    let totalprice = 0;

    products.forEach((product) =>{
        let temptotalprice = product.quantity * product.price
        totalprice = totalprice + temptotalprice
        totalquantity = totalquantity + product.quantity
    })

    return "(" + totalquantity + "):" + totalprice


}



    return(
    <div>
        <Navbar/>
             <div className="container">
                 <div className="row">
                    <div className="col-8">
                        {
                           CartData.map((cart, i) =>(
                            <div className="card mt-3" key={i}>
                                <div className="card-body">
                                    {
                                        cart.products.map((product , j) =>(
                                            <div key={j}  className="card mb-3 border-0 pb-3 border-bottom">
                                                <div className="row">
                                                    <div className="col-2">
                                                       <img src={product.thumbnail} className="img-fluid"/>
                                                    </div>
                                                        <div className="col-8">
                                                            <div className="card-body">
                                                                <h5>{product.title}</h5>
                                                                    <div>
                                                                        <button className="btn btn-light" onClick={Event => DecrementQuantity(product,j,cart,i)}>-</button>
                                                                        <span>{product.quantity}</span>
                                                                        <button className="btn btn-light" onClick={event => IncrementQuantity(product,j,cart,i)}>+</button>
                                                                        <a href="#" className="card-link">Delete</a>
                                                                         <a href="#" className="card-link">Save For Later</a>
                                                                    </div>
                                                            </div>
                                                            
                                                        </div>
                                                             <div className="col-2 text-end">
                                                                <span class="badge text-bg-danger">Limited time deal</span>
                                                                <strong><i className="bi bi-currency-rupee"></i>{product.price}</strong>

                                                             </div>

                                                </div>

                                            </div>
                                        ))
                                    }
                                       <div className="text-end">
                                             <strong>Sub total {CalculateQuantityAndPrice(cart.products)}</strong>
                                         </div>
                                </div>

                            </div>
                           ))
                        }

                    </div>
                        <div className="col-4">
                             <div className="card mt-3">
                                <div className="card-body">
                                    {
                                        CartData.length > 0 && 
            
                                            <div className="d-grid">
                                                <p><strong>Sub total{CalculateQuantityAndPrice(CartData[0].products)}</strong></p>
                                                <button className="btn btn-primary">Buy Now</button>
                                            </div>
                                        
                                    }

                                </div>

                             </div>
                            
                        </div>

                 </div>

             </div>
        <Footer/>
    </div>


    )
}


export default Cart