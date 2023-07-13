import React from "react";
import { defaultForm, Tform } from "./interfaces";

const Form = () => {
  //@ts-ignore
  const [form, setForm] = React.useState<Tform>(defaultForm);
  const [counter, setCounter] = React.useState<number>(0);
  const [multiply, setMultiply] = React.useState<number>(1);
  const [customers, setCustomers] = React.useState<Tform[]>([]);

  const handleFormInput = (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleButton = () => {
    setCounter((previous) => previous + 1);
  };

  //create function that multiplies the number by 15
  //create state to hold the number
  //create button to fire that function
  const handleMultiplyButton = () => {
    setMultiply((previous) => previous * 15);
  };

  //create a button to send form info
  //create function that handles the form submission = as POST
  //send to 'localhost:4000'
  const handleFormSubmit = () => {
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form action="submit">
        <label htmlFor="">First Name</label>
        <input type="text" name="firstName" id="" onChange={handleFormInput} />
        <br />

        <label htmlFor="">Last Name</label>
        <input type="text" name="lastName" id="" onChange={handleFormInput} />
        <br />

        <label htmlFor="">Email</label>
        <input type="text" name="email" id="" onChange={handleFormInput} />
        <br />

        <label htmlFor="">Password</label>
        <input type="text" name="password" id="" onChange={handleFormInput} />
      </form>

      {customers?.map((customer: Tform) => (
        <h3>
          {customer.firstName} {customer.lastName}
        </h3>
      ))}
      <button onClick={handleFormSubmit}>Submit</button>
      <button onClick={handleButton}>{counter}</button>
      <button onClick={handleMultiplyButton}>{multiply}</button>
    </>
  );
};

export default Form;
