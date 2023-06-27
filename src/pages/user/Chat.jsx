import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import Home from "./Home/Home.jsx";
import { getUsers, uploadImage } from '../../functions/user';
import { useSelector } from "react-redux";
import UploadImage from "../../components/forms/UploadImage";
import { toast } from "react-toastify";
import "./upload.css"

const Chat = () => {
  const [images, setImages] = useState({})
   const { user } = useSelector((state) => ({ ...state }));
 

  const handleClick = () => {
    uploadImage(images.url , user.token ).then((res) => {
      toast.success(res.message)
      setImages({})
    })
  }
  return (
    <div className="container-fluid" >
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <div className="upload">
            {
            images.url && <label className="btn btn-danger btn-raised mt-3" onClick={handleClick}>
            Upload now
          
        </label>
          }

          </div>


          <UploadImage  images = {images} setImages = {setImages}/>

          
        
          
          <Home />
          
        </div>
      </div>
    </div>
  );
};

export default Chat;