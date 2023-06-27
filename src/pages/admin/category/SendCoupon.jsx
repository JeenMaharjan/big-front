import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getUsers , sendCoupon } from "../../../functions/user";
import { Avatar, Button , Input , Form  } from 'antd';

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./coupon.css"
import { AddNotification } from "../../../functions/notification";



const SendCoupon = () => {
  const [users, setUsers] = useState([]);
 
  const { user } = useSelector((state) => ({ ...state }));
    const [gap, setGap] = useState("2")
    const [coupon, setCoupon] = useState("")

    const [openInputs, setOpenInputs] = useState({});

  const handleOpenInput = (userId) => {
    setOpenInputs((prevState) => {
        const updatedInputs = {};

        // Close input for all users
        
        Object.keys(prevState).forEach((key) => {
            updatedInputs[key] = false;
        });

        // Toggle the open state for the specific user
        updatedInputs[userId] = !prevState[userId];
          
        return updatedInputs;
    });
};

  // const handleOpenInput = (userId) => {
  //   setOpenInputs((prevState) => ({
  //     ...prevState,
  //     [userId]: !prevState[userId] // Toggle the open state for the specific user
  //   }));
  // };


useEffect(() => {
  
loadUser()
    
}, [])

const loadUser = async() =>{
    await getUsers(user.token).then((res) => {setUsers(res.data) 
    console.log(res.data)
    })
}
    
const handleClick = async(email , id) => {
  if(coupon === ""){
    return toast.error("field is empty")
  }
  try {
      await sendCoupon(email , coupon , user.token).then(async(res) =>{
        console.log(res)
    setCoupon("")
    setOpenInputs(!openInputs)
    await AddNotification({
          title: "Coupon from admin",
          message: `use this coupon --${coupon}-- enjoy shopping`,
          user: id,
          onClick: `/profile`,
          read: false,
        } , user.token);
    toast.success("coupon send successfully")
      })
  } catch (error) {
    toast.error(error.response.data.message)
  }
}
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h1>Send Coupons</h1>
          <div className="row">
            {
                users.map((u) => 
                  <div className="main">
                    <Avatar
                    shape="square" 
            className="user"
            size="large"
            gap={gap}
            onClick={() => handleOpenInput(u._id)} // Pass the user ID to the handler
          >
            <p className="text">{u.name}</p>
          </Avatar>
          {openInputs[u._id] && (<><Input placeholder={`coupon to ${u.name}`} value={coupon} onChange={(e) => setCoupon(e.target.value)} className="in" /> <Button type="primary"
          className="button"
          onClick={() => handleClick(u.email, u._id)}
          >
            
            Send
          </Button></>) }
                  </div>
                )
            } 
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SendCoupon;