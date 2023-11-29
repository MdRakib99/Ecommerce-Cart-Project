import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserLoginRequest } from "../apiRequest/apiRequest";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const LoginForm = () => {
  const [formValue, setFormvalue] = useState({ UserEmail: "" });
  const [loader, setLoader] = useState("d-none");
  const navigate = useNavigate();

  const InputOnChange = (key, value) => {
    setFormvalue((formValue) => ({
      ...formValue,
      [key]: value,
    }));
  };

  const submitForm = async () => {
    if (formValue.UserEmail.length === 0) {
      toast.error("Email Address Require");
    } else {
      setLoader("");
      let msg = await UserLoginRequest(formValue);
      setLoader("d-none");
      if (msg === "success") {
        toast.success("Request Successfull");
        navigate("/otp");
      } else {
        toast.error("Request failed, Try Again");
      }
    }
  };
  return (
    <>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <div className='card p-5'>
              <h3>Login</h3>
              <label>User Email</label>
              <input
                value={formValue.UserEmail}
                onChange={(e) => {
                  InputOnChange("UserEmail", e.target.value);
                }}
                type='email'
                className='form-control'
                placeholder='Your Email Address'
              />
              <button
                onClick={submitForm}
                className='btn w-100 btn-primary my-2'
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <Toaster position='bottom-center' />
      </div>
      <Loader visibility={loader} />
    </>
  );
};

export default LoginForm;
