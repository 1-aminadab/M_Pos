import axios from 'axios';

export const reglocal = async user => {
  console.log(user);
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(
      'https://mobileapp.qa.addissystems.et/signup',
      // '{\n  "Fname": "abebe",\n  "Lname": "lema",\n  "UserName": "abebe",\n  "password": "112233",\n  "DateOfBir": "12/12/22",\n  "phone": "1234567",\n  "Gend": "male",\n  "email": "abebe@gmail.com",\n  "party": "ABC"\n}',
      user,
      {headers},
    );
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};
