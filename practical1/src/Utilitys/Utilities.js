export const isEmailVaild = (email)=>{
    let emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   return emailRegex.test(email)
}

export const CheckUserLoginstatus = () =>{
    let User_Data = localStorage.getItem('User_Data')
    if(User_Data == undefined){
        return false
    }else{
        return true
    }
}

export const getLoggedInUserId = () =>{
    let User_Data = localStorage.getItem('User_Data')
    User_Data = JSON.parse(User_Data)
    return User_Data.id;
}