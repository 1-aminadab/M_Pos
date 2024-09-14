import axios from "axios";

export const sendotp= async(user)=>{
    console.log("Api:",user)
try {
const response= await axios.post("https://heady-bronze-wanderer.glitch.me",user)
return response.data
}catch(e){
    console.error(e)
}
}