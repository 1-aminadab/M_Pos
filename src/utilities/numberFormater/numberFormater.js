const numberFormater = input => {
  const inputStr = input?.toString();
  let indexOfDecimal = inputStr?.indexOf('.');
  var numLength = inputStr?.length - 1;
  let formated = '';
  let detachedDecimal = '';

  if (indexOfDecimal !== -1) {
    let newInputStr = inputStr?.slice(0, indexOfDecimal);
    detachedDecimal = inputStr?.slice(indexOfDecimal);
    numLength = newInputStr?.length - 1;
  }

  if (input) {
    for (let i = 0; i <= numLength; i++) {
      if (i === numLength % 3 || (i - (numLength % 3)) % 3 === 0) {
        formated += inputStr[i] + (i < numLength ? ',' : '');
      } else {
        formated += inputStr[i];
      }
    }
  }

  const output = formated ? formated.concat(detachedDecimal) : '0.00';

  return output;
};

export default numberFormater;
