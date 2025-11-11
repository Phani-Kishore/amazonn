import axios from "axios"
import { Component, useEffect, useState } from "react"
import { AddressViewApi } from "../Services/Addressservice"
import { getLoggedInUserId } from "../Utilitys/Utilities"


function AddAddresses(){


    let [AddressData,setAddressData]= useState({
        name: "", Mobile:"" , Adress1:"", city:"",state:"", country:"", pincode:"", latlong:""
    })


    

    const GetLatLong = () =>{
        if(navigator.geolocation){

            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    console.log(position , position.coords.latitude , position.coords.longitude)
                    setAddressData({...AddressData , latlong:position.coords.latitude + "," + position.coords.longitude })
                    GetLocationData(position.coords.latitude , position.coords.longitude)
                }
            )

        }else{

        }
    }

    const GetLocationData = async(lat,long) =>{
        let ApiKey = "AIzaSyDnnHc0RKc21tP9EoENHiGtAw9yV7v94v0"

        let ApiResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +"," + long + "&key=" + ApiKey)
        console.log(ApiResponse)

        let AdressCompentents = ApiResponse.data.results[0].address_components

        let city = "";
        let state= "";
        let country = "";
        let pincode = "";

        city = AdressCompentents.find(Component => Component.types.includes("locality")).long_name
        console.log(city)

         state = AdressCompentents.find(Component => Component.types.includes("administrative_area_level_1")).long_name
        console.log(state)

         country = AdressCompentents.find(Component => Component.types.includes("country")).long_name
        console.log(country)

        pincode = AdressCompentents.find(Component => Component.types.includes("postal_code")).long_name
        console.log(pincode)

        setAddressData({...AddressData , city:city, state:state , country:country, pincode:pincode})
    }

    return(

          <div className="card mt-3">
             <div className="card-body">
                 <button className="btn btn-primary" onClick={event => GetLatLong()}><i class="bi bi-crosshair"></i>Use My Location</button>
                <div className="mt-3">
                    <lable>NAME</lable>
                    <input type="text" className="form-control" value={AddressData.name} onChange={event => setAddressData({...AddressData, name:event.target.value})}/>
                </div>
                 <div className="mt-3">
                    <lable>MOBILE</lable>
                    <input type="text" className="form-control" value={AddressData.Mobile} onChange={event => setAddressData({...AddressData, Mobile:event.target.value})}/>
                </div>
                 <div className="mt-3">
                    <lable>ADDRESS</lable>
                    <input type="text" className="form-control" value={AddressData.Adress1} onChange={event => setAddressData({...AddressData , Adress1:event.target.value})}/>
                </div>
                 <div className="mt-3">
                    <lable>CITY</lable>
                    <input type="text" className="form-control" value={AddressData.city} onChange={event => setAddressData({...AddressData, city:event.target.value})}/>
                </div>
                 <div className="mt-3">
                    <lable>STATE</lable>
                    <input type="text" className="form-control" value={AddressData.state} onChange={event => setAddressData({...AddressData, state:event.target.value})}/>
                </div>
                 <div className="mt-3">
                    <lable>COUNTRY</lable>
                    <input type="text" className="form-control" value={AddressData.country} onChange={event => setAddressData({...AddressData, country:event.target.value})}/>
                </div>
                 <div className="mt-3">
                    <lable>PINCODE</lable>
                    <input type="text" className="form-control" value={AddressData.pincode} onChange={event => setAddressData({...AddressData, pincode:event.target.value})}/>
                </div>

             </div>

          </div>

    )
}

export default AddAddresses