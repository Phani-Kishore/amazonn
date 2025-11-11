import { useEffect, useState } from "react"
import Footer from "../Shared/Footer"
import Navbar from "../Shared/Navbar"
import AddAddresses from "./AddAddresses"
import { AddressViewApi } from "../Services/Addressservice"
import { getLoggedInUserId } from "../Utilitys/Utilities"
import SingleAddress from "./SingleAddress"

function Addresses(){

    const [ShowAddAddresses, setShowAddAddresses] = useState(false)
    const [AddressData, setAddressData] = useState([])

    useEffect(() =>{

        const GetAddress = async() =>{
            let ApiResponse = await AddressViewApi({userId:getLoggedInUserId()});
            setAddressData([...ApiResponse.data.data])
           
        }
        GetAddress()

    },[])



    return(
         <div>
          <Navbar/>
            <div className="container"> 
                <div className="row mt-3">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={event => setShowAddAddresses(true)}>Add New Addresse</button>
                        {
                            ShowAddAddresses == true && <AddAddresses/>
                        }
                    </div>
                    <div className="col-3"></div>

                </div>
                <div className="row">
                    {
                        AddressData.map((address , i)=>(
                            <SingleAddress  key={i} address={address}/>
                        ))
                    }

                </div>
                
            </div>
            <Footer/>
      </div>
    )
}

export default Addresses