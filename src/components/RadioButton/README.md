## import RadioButton
example
```//the active button of the radio button
  const [state,setState]=useState("Cash")
  //the value of the radio button
 const paymentMethod = ['Cash', 'Bank', 'QR', 'Card'];
 {paymentMethod?.map((i)=>(<RadioButton name={i} state={state} setState={setState} key={i} />))}
 ```

#2inputs name, state, setState