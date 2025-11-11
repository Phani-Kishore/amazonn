import { useParams } from "react-router-dom"
import Navbar from "../Shared/Navbar"
import Footer from "../Shared/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import {SideBySideMagnifier} from 'react-image-magnifiers'
import { getLoggedInUserId } from "../Utilitys/Utilities"
import {ToastContainer, toast} from 'react-toastify'



function SingleProduct(){
    const {productId} = useParams()
    const [productData, setproductData] = useState(null)
    const [MainImage, setMainImage] = useState("")
    const [Quantity, setQuantity] = useState(1)

    useEffect(() =>{
        const GetSingleProductData = async() =>{
            let ApiResponse = await axios.get("https://dummyjson.com/products/" + productId)
            setproductData({...ApiResponse.data})

        }

        GetSingleProductData()

    },[])

    const AddtoCart = async() =>{
        console.log(productId, Quantity)
        if(Quantity <= productData.stock){
             let userId = getLoggedInUserId()
             let product={
                Id:productId , Quantity:Quantity
             }
             console.log(userId , product)
             let products = []
             products.push(product)

             let ApiResponse = await axios.post("https://dummyjson.com/carts/add" , {userId:1, products:products })
              toast.success("Add To Cart",{position:"top-center"})
        }else{
             toast.error("We Dont have Enough stock to process your order",{position:"top-center"})
            console.log("Not in Stock")
        }
           
    }

    

    return(
        
           <div>
                <Navbar/>
                        <div className="container">
                            <div className="row">
                                <div className="col-5">
                                   {
                                    productData != null &&
                                    <div className="row mt-3">
                                    {
                                            productData.images.map((image,i )=>(
                                                <div className="col-3" key={i}>
                                                    <img className="img-thumbnail"  src={image} onMouseOver={event => setMainImage(image)}/>
                                                </div>
                                            ))
                                    }

                                    </div>
                                   }
                                   {
                                    <SideBySideMagnifier
                                      imageSrc={MainImage}
                                      alwaysInPlace={false}
                                      fillAvailableSpace={false}
                                      zoomPosition="right"
                                      zoomContainerBorder="1px soild #ccc"
                                      zoomContainerBoxShadow="0 4px 8px rgba ()0,0,0,0.3"
                                      style={{width:'300px',height:'300px'}}
                                    />
                                   }

                                </div>
                                <div className="col-3 mt-3">
                                    {productData != null && <h2>{productData.title}</h2>}
                                    <div>
                                       <i className="bi bi-star-fill"></i> {productData?.rating}
                                       <h2><i className="bi bi-currency-rupee"></i> {productData?.price}</h2>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card mt-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Add to Cart</h5>
                                            <select className="form-control" onChange={event => setQuantity(event.target.value)}>
                                                <option>1</option>
                                                 <option>2</option>
                                                  <option>3</option>
                                                   <option>4</option>
                                                    <option>5</option>
                                                     <option>6</option>
                                                      <option>7</option>
                                            </select>
                                            <div className="d-grid mt-3">
                                                <button className="btn btn-primary" onClick={event => AddtoCart()}>Add to Cart</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        
                        </div>
                        <ToastContainer/>
                 <Footer/>
            </div>


    )
}

export default SingleProduct