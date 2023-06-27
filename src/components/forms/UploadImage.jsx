import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { toast } from "react-toastify";

function FileUpload({ images , setImages}) {

    const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    
    let files = e.target.files[0]; 
    

    if (files) {
      
      
        Resizer.imageFileResizer(
          files,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setImages(res.data)
                console.log(res.data.url)

                
              })
              .catch((err) => {
               
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
     
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };
  const handleImageRemove = (public_id) => {
    
    // console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        
        setImages({})

      })
      .catch((err) => {
        console.log(err);
        
      });
  };
  return (
    <>
    <div className="row">
        {images.url  &&
          
            <Badge
              count="X"
              key={images.public_id}
              onClick={() => handleImageRemove(images.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={images.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
         }
      </div>
    <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Choose Image
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  )
}

export default FileUpload