import { useState } from "react";
import { isEmailVaild } from "../Utilitys/Utilities";
import { ERROR_MESSAGE } from "../Constants/Errors";
import { Await } from "react-router-dom";
import { SigninApi } from "../Services/AuthService";


function Signin(){

    const [SigninData , setSigninData] = useState({email:"" ,password:"" })
     const [SigninErrors,setSigninErrors] = useState({name:false, email:false, password:false })

 


    const handleSignin = async() =>{

        console.log(SigninData)

        let TempErrors = {setSigninErrors}

        if(isEmailVaild(SigninData.email)== false){
            TempErrors = ({...TempErrors, email:true})
        }else{
             TempErrors = ({...TempErrors, email:false})
        }

        if(SigninData.password.length < 6){
            TempErrors = ({...TempErrors , password:true})
        }else{
             TempErrors = ({...TempErrors , password:false})
        }

        setSigninErrors({...TempErrors})

        let ApiResponse = await SigninApi({...SigninData})
        console.log(ApiResponse)
        if(ApiResponse.data.result == "success")
            localStorage.setItem("User_Data" , JSON.stringify(ApiResponse.data.data))
            window.location="/"

    }



    return(

        <div className="container">
            <div className="row justify-content-center">
               <div className="col-4">
                 <div className="text-center">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/019/766/240/small/amazon-logo-amazon-icon-transparent-free-png.png" className="logo-img" ></img>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4>Sign in</h4>
                        <div className="mt-3">
                            <strong>Email</strong>
                            <input type="text" className="form-control" placeholder="Enter Your Email" onChange={event=> setSigninData({...SigninData , email:event.target.value})}/>
                            <div className="text-danger">{SigninErrors.email == true && ERROR_MESSAGE.LOGIN.EMAIL}</div>
                        </div>
                        <div className="mt-3">
                            <strong>Password</strong>
                            <input type="password" className="form-control" placeholder="Enter Your Password" onChange={event=> setSigninData({...SigninData , password:event.target.value})}/>
                            <div className="text-danger">{SigninErrors.password == true && ERROR_MESSAGE.LOGIN.PASSWORD}</div>
                        </div>
                        <div className="mt-3 d-grid">
                            <button className="btn btn-primary" onClick={event=> handleSignin()}>Sign in</button>
                        </div>

                    </div>
                    
                </div>
               </div>

            </div>

        </div>

    )
}

export default Signin;