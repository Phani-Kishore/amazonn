import { useState } from "react";
import { isEmailVaild } from "../Utilitys/Utilities";
import { ERROR_MESSAGE } from "../Constants/Errors";
import { SignupApi } from "../Services/AuthService";

function Signup(){

    const [SignupData , setSignupData] = useState({name:"",email:"" ,password:"" })
     const [SignUpErrors,setSignUpErrors] = useState ({name:false, email:false, password:false })




    const handleSignup = async() =>{

        console.log(SignupData)

        let TempErrors = {setSignUpErrors}

        if(SignupData.name.length < 3){
            TempErrors = ({...TempErrors, name:true})

        }else{
             TempErrors = ({...TempErrors, name:false})

        }

        if(isEmailVaild(SignupData.email)== false){
            TempErrors = ({...TempErrors, email:true})
        }else{
             TempErrors = ({...TempErrors, email:false})
        }

        if(SignupData.password.length < 6){
            TempErrors = ({...TempErrors , password:true})
        }else{
             TempErrors = ({...TempErrors , password:false})
        }

        setSignUpErrors({...TempErrors})

        let ApiResponse = await SignupApi({...SignupData})
        console.log(ApiResponse)
        if(ApiResponse.data.result == "success")
            localStorage.setItem("User_Data" , JSON.stringify(ApiResponse.data.data))
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
                        <h4>Sign Up</h4>
                        <div className="mt-3">
                            <strong>Name</strong>
                            <input type="text" className="form-control" placeholder="Enter Your Name" onChange={event=> setSignupData({...SignupData , name:event.target.value})}/>
                            <div className="text-danger">{SignUpErrors.name == true && ERROR_MESSAGE.SIGNUP.NAME}</div>
                        </div>
                        <div className="mt-3">
                            <strong>Email</strong>
                            <input type="text" className="form-control" placeholder="Enter Your Email" onChange={event=> setSignupData({...SignupData , email:event.target.value})}/>
                            <div className="text-danger">{SignUpErrors.email == true && ERROR_MESSAGE.SIGNUP.EMAIL}</div>
                        </div>
                        <div className="mt-3">
                            <strong>Password</strong>
                            <input type="password" className="form-control" placeholder="Enter Your Password" onChange={event=> setSignupData({...SignupData , password:event.target.value})}/>
                            <div className="text-danger">{SignUpErrors.password == true && ERROR_MESSAGE.SIGNUP.PASSWORD}</div>
                        </div>
                        <div className="mt-3 d-grid">
                            <button className="btn btn-primary" onClick={event=> handleSignup()}>Create Account</button>
                        </div>

                    </div>
                    
                </div>
               </div>

            </div>

        </div>

    )
}

export default Signup;