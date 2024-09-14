import axios from 'axios'
const headers = {
    accept: 'application/json',
    'x-auth-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzMyYzIzODNkZmQ5ZTQwOWRjMGZhNiIsImlhdCI6MTY4NTI2OTU3Nn0.tGNpNVOcUaf7mDvNF4jscOr0MnwVRrtIw9FVkaH4t08',
    'Content-Type': 'application/json',
  };
export const fetchData=async()=>{ 
  
    const response = await axios.get('https://party.addispay.et/Party', { headers })

    return response.data;


}
export const deleteData=async(id)=>{
    const data = {
        "_id": id
      };
      
      axios.delete('https://party.addispay.et/single_Party', {
        headers: headers,
        data: data
      })
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}
export const createData = async (body) => {
    const response = await axios.post(`https://party.addispay.et/Demo_handler`, body,{headers});
    return response.data;
  };
  export const isLicence = async (licence) => {
    const headers = {
      'accept': 'application/json',
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzMyYzIzODNkZmQ5ZTQwOWRjMGZhNiIsImlhdCI6MTY4NTI2OTU3Nn0.tGNpNVOcUaf7mDvNF4jscOr0MnwVRrtIw9FVkaH4t08'
    };
    //console.log(licence)
    // await axios.post(`https://party.addispay.et/CheckLicenseNotExist/${encodeURIComponent(licence)}`, "",{headers}).then(response=>{return response?response.data:null}).catch(e=>console.log("error:",e))
    // //return 
    try {
      const response = await axios.post(
        `https://party.addispay.et/CheckLicenseNotExist/${encodeURIComponent(licence)}`,
        "",
        { headers }
      );
  console.log("response",response.data.OwnerTIN)
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to be caught by the mutation
    }
    
  };
  
  
    export const isTin = async (tin) => {
      const headers = {
        'accept': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzMyYzIzODNkZmQ5ZTQwOWRjMGZhNiIsImlhdCI6MTY4NTI2OTU3Nn0.tGNpNVOcUaf7mDvNF4jscOr0MnwVRrtIw9FVkaH4t08'
      };
      console.log(encodeURIComponent(tin))
      // await axios.post(`https://party.addispay.et/CheckLicenseNotExist/${encodeURIComponent(licence)}`, "",{headers}).then(response=>{return response?response.data:null}).catch(e=>console.log("error:",e))
      // //return 
      try {
        const response = await axios.post(
          `https://party.addispay.et/CheckTinNotExist/${tin}`,
          "",
          { headers }
        );
          //console.log(response.data)
          //console.log("response",response.data.BusinessInfo.RegNo,response.data.BusinessLicensingGroupMain[0].BusinessMain.LicenceNumber)
        return response.data;
      } catch (error) {
        console.log("Error:", error);
        return null
        throw error; // Rethrow the error to be caught by the mutation
      }
      
  };
  export const createUser=async(user)=>{
    console.log(user)
    try{
      const response = await axios.post("https://party.addispay.et/Demo_handler",user,{headers})
      return response.data
    }
    catch(error){
      console.error("Error on User",error)
      return null
    }
  }
  