import React, { useEffect, useState } from "react";
import { CartListRequest, RemoveCartRequest } from "../apiRequest/apiRequest";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

const CartList = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState("d-none");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    (async () => {
      setLoader("");
      let res = await CartListRequest();
      setLoader("d-none");
      setData(res);
    })();
  }, [refresh]);

  const RemoveCart = async (id) => {
    setLoader("");
    let msg = await RemoveCartRequest(id);
    setLoader("d-none");
    if (msg === "success") {
      setRefresh(refresh + 1);
      toast.success("Request Success");
    } else {
      toast.error("Request Failed");
    }
  };
  return (
    <>
      <div className='container'>
        <div className='row'>
          {data.map((item, index) => {
            return (
              <div className='col-md-3 p-2'>
                <div className='card'>
                  <img className='rounded-2' src={item["product"]["image"]} />
                  <div className='card-body'>
                    <h6>{item["product"]["title"]}</h6>
                    <button
                      className='btn-btn-danger'
                      onClick={() => {
                        RemoveCart(item["product"]["id"]);
                      }}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Loader visibility={loader} />
      <Toaster position='bottom-center' />
    </>
  );
};

export default CartList;
