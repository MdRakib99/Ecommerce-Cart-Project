import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { getEmail } from "../Utility/TokenHelper";
import { OTPVerifyRequest } from "../apiRequest/apiRequest";

const OTPForm = () => {
  const [formValue, setFormvalue] = useState({
    UserEmail: getEmail(),
    OTP: "",
  });
  const [loader, setLoader] = useState("d-none");
  const navigate = useNavigate();

  const InputOnChange = (key, value) => {
    setFormvalue((formValue) => ({
      ...formValue,
      [key]: value,
    }));
  };

  const submitForm = async () => {
    if (formValue.OTP.length === 0) {
      toast.error("OTP Code Require");
    } else {
      setLoader("");
      let msg = await OTPVerifyRequest(formValue);
      setLoader("d-none");
      if (msg === "success") {
        toast.success("Request Successfull");
        window.location.href = "/";
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
              <h3>OTP Verification</h3>

              <input
                value={formValue.OTP}
                onChange={(e) => {
                  InputOnChange("OTP", e.target.value);
                }}
                type='number'
                className='form-control'
                placeholder='OPT Code'
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

export default OTPForm;
