import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm.jsx";
import UserNav from "../../../components/nav/UserNav";
import { getCategories , getCategorySubs  } from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { createProduct } from "../../../functions/product";
import { getAdmin , AddNotification } from "../../../functions/notification";
import { useSelector } from "react-redux";
import FileUpload from "../../../components/forms/FileUpload.jsx";

/**
 * EASY WAY TO RE-POPULATE SUBS IF USER SELECT ANOTHER CATEGORY??
 if (product.category._id === e.target.value) {
  loadProduct();
} else {
  setArrayOfSubIds([]);
}
 */

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [
    // {
    //   public_id: "jwrzeubemmypod99e8lz",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
    // },
    // {
    //   public_id: "j7uerlvhog1eic0oyize",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480912/j7uerlvhog1eic0oyize.jpg",
    // },
    // {
    //   public_id: "ho6wnp7sugyemnmtoogf",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480913/ho6wnp7sugyemnmtoogf.jpg",
    // },
  ],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
  brandNew : ["Yes" , "No"] , 
  age : 2 ,
};

const ProductCreate = ({match}) => {
  const [values, setValues] = useState(initialState);
 const [subOptions, setSubOptions] = useState([]);
 const [loading, setLoading] = useState(false);
 const [showSub, setShowSub] = useState(false);
 const [adminAcc, setAdminAcc] = useState({})
 const [aid, setAid] = useState("")
 const [setId, setSetId] = useState({});
 const { user } = useSelector((state) => ({ ...state }));
  const location = match.path.split("/")[1]
  
  const obj = {
    adminAcc
  }
  console.log(obj)
  const ids = Object.keys(obj.adminAcc).map((key) => obj.adminAcc[key]._id);

// Call setSetId with the desired ID once the component is mounted
useEffect(() => {
  if (ids.length >= 2) {
    setSetId(...ids ); // Assuming you want to set the ID at index 1
  }
}, []);
console.log(setId)



console.log(values)
      useEffect(() => {
    loadCategories();
    loadAdmin()
  }, []);

    const loadCategories = () =>
    {getCategories().then((c) => setValues({ ...values, categories: c.data }));
    
    }
    const loadAdmin = async() => {
      await getAdmin().then((res) => {setAdminAcc(res) 
       
      } )

    }

    
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProduct({...values , seller : user._id} , user.token)
      .then(async (res) => {
        console.log(res);
      if(user.role !== "admin"){
        await AddNotification({
          title: "A new product has been add",
          message: ` ${res.data.title} by ${user.name} for $ ${res.data.price} has been added`,
          user: ids,
          onClick: `/profile`,
          read: false,
        } , user.token);
      }
      
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
    
  };

    const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs:[] , category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
      
    });
    setShowSub(true);
  };

  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {
            location === "user" ? <UserNav/> : <AdminNav/>
          }
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />

          {/* {JSON.stringify(values.images)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              loading= {loading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;