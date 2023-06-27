import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  NotificationOutlined ,
  CustomerServiceOutlined ,
  MessageTwoTone 
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search.jsx";
import Notifications from "./Notifications.jsx";
import { GetAllNotifications, ReadAllNotifications } from "../../functions/notification.js";
const { SubMenu, Item } = Menu;
function Header() {
  const [current, setCurrent] = useState("home");
const [notifications, setNotifications] = useState([]);
  
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  
  
  const [showNotifications, setShowNotifications] = useState(false)
  let history = useHistory();
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

    const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
  const getNotifications = async () => {
    try {
      
      const token = user?.token
      console.log(token)
      const response = await GetAllNotifications(token , user?._id);
      
      if (response.success) {
        setNotifications(response.data);
        console.log(response.data)
      } else {
        
      }
    } catch (error) {
      console.log(error)
    }
  };

    const readNotifications = async () => {
    try {
      
      const response = await ReadAllNotifications(user?.token);
      
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error)
    }
  };

 useEffect(() => {
  let isMounted = true;

  const fetchNotifications = async () => {
    await getNotifications();
    
  };

  if (isMounted && user && user.token) {
    fetchNotifications();
  }

  return () => {
    isMounted = false;
  };
}, [user]);

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
{/* 
      {
        user && (
       <Item key="notification" icon={<NotificationOutlined />} onClick={() => {
                
                setShowNotifications(true);
              }}>
        
          <Badge count={cart.length} offset={[9, 0]}>
            Notification
          </Badge>
        
      </Item>
        )
      } */}
          {user && <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>}

     {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="services" icon={<CustomerServiceOutlined />} className="float-right">
          <Link to="/services">Sevices</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          
          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          {
        user && (
       <Item key="notification" icon={<NotificationOutlined />} onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}>
        
          <Badge count={
                notifications?.filter((notification) => !notification.read)
                  .length
              } offset={[9, 0]}>
            Notification
          </Badge>
        
      </Item>
        )
      }


           {user && <Item key="services" icon={<CustomerServiceOutlined />} className="float-right">
          <Link to="/services">Sevices</Link>
        </Item>}

        {user && <Item key="chat" icon={<MessageTwoTone />} className="float-right">
          <Link to="/user/chat">Chat</Link>
        </Item>}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
    <Notifications
            notifications={notifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
    </div>
  )
}

export default Header