import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";





const SignupPage = () => {

  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = () => {
    firebase.signupUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Signup Successful!", userCredential);
      })
      .catch((error) => {
        console.error("Signup Error:", error.code, error.message);
      });
  };

  const handleSignupWithGoogle = () => {
    firebase.signupWithGoogle()
      .then((userCredential) => {
        console.log("Signup Successful!", userCredential);
      }).catch((err) => {
        console.log(err);
      });
  };



  


  return (
    <div className="flex flex-col items-center justify-center ">

      <h1 className="m-8">Firebase Signup</h1>

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Enter Email"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Enter Password"
        className="m-4"
      />
      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleSignupWithGoogle} className="m-8 p-2">SignUp with Google</button>
    </div>
  );
}

export default SignupPage;