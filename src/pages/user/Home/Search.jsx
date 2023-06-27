import React, { useContext, useState } from "react";
import avatar from "./11.jpg";
import { useDispatch, useSelector } from "react-redux";
import { conversation } from "../../../functions/messenger";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { findUsers } from "../../../functions/user";

const Search = ({users}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const dispatch = useDispatch();

  const handleClick = async (id) => {
    try {
      const res = await conversation(user?._id, id, user?.token);
      dispatch({
        type: "SET_CONVERSATION",
        payload: res,
      });
    } catch (error) {
      // Handle the error
    }
  };

 const handleChange = (e) => {
  const searchQuery = e.target.value;
  setSearch(searchQuery);

  if (searchQuery.trim() !== "") {
  
    const newSearchTimeout = setTimeout(() => {
     
      findUsers(searchQuery, user.token)
        .then((res) => setSearchResults(res))
        .catch((error) => {
          // Handle the error
        });
    }, 300); 
      return () => clearTimeout(newSearchTimeout);
   
  } else {
    setSearchResults([]); // Empty the search results when search query is empty
  }
};


  const usersToDisplay = search.trim() !== "" ? searchResults : users;

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          className="form-control"
          onChange={(e) => handleChange(e)}
        />
        <hr style={{ color: "black" }} />
      </div>
      {usersToDisplay?.map((user) => (
        <div className="userChat" onClick={() => handleClick(user._id)} key={user._id}>
          <img className="img" src={user?.images ? user?.images : avatar} alt="" />
          <div className="userChatInfo">
            <span style={{ color: "black", fontSize: "13px", paddingRight: "2px" }}>
              {user.name} {user.role === "admin" && (
                <FontAwesomeIcon icon={faShieldAlt} style={{ color: "#1458cc", display: "inline" }} />
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
