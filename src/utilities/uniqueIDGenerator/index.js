const generateUniqueID = () => {
  const timestamp = Date.now().toString(); // Get the current timestamp as a string
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  const uniqueID = timestamp + randomNum.toString(); // Combine the timestamp and random number

  return uniqueID;
};

export default generateUniqueID;
