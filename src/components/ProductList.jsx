import React, { useEffect, useState } from "react";
import { AddCartRequest, ProductListRequest } from "../apiRequest/apiRequest";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState("d-none");
  useEffect(() => {
    (async () => {
      setLoader("");
      let res = await ProductListRequest();
      setLoader("d-none");
      setData(res);
    })();
  }, []);

  const AddCart = async (id) => {
    setLoader("");
    let msg = await AddCartRequest(id);
    setLoader("d-none");
    if (msg === "success") {
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
                  <img className='rounded-2' src={item["image"]} />
                  <div className='card-body'>
                    <h6>{item["title"]}</h6>
                    <button
                      className='btn btn-success'
                      onClick={() => {
                        AddCart(item["id"]);
                      }}
                    >
                      Add To Cart
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

export default ProductList;
