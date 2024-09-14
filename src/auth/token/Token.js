import EncryptedStorage from 'react-native-encrypted-storage';
import * as Keychain from 'react-native-keychain';
import realm from '../../database';
export const getToken=()=>{ 
return new Promise((resolve,reject)=>{

 EncryptedStorage.getItem('user_id').then(session=>
  {if (session !== undefined && session !== null) resolve(session)
    else reject(null)}
  ).catch((error) => reject(error));
  
    
}

)
   
}

export const loadCredentials = async (user,password) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      let x
      x= realm.objects("Profile").filter(d=>d._id==credentials.username);
      //console.log(typeof credentials.username,"xxxxx",x)
      return x
    } else {
      console.log('No credentials stored');
      return null
    }
  } catch (error) {
    console.error('Error retrieving credentials:', error);
  }
};



  // try {
  //   const session = await EncryptedStorage.getItem('user_id');

  //   if (session !== undefined && session !== null) {
  //     // console.log('Session:', session);
  //     const parsedSession = JSON.parse(session); // Parse the stored string into an object
  //     // console.log('Parsed Session:',typeof parsedSession.token);

  //     if (parsedSession.token) {
  //       // console.log('Parsed Session:',typeof parsedSession.token,parsedSession.token);
  //       return parsedSession.token;
  //     }
  //   }

  //   return null; // Return null if no valid session or token is found
  // } catch (error) {
  //   console.error('Error retrieving token:', error);
  //   return null; // Handle the error and return null or an appropriate value
  // }