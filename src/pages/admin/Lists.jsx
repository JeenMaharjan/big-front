import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getList } from '../../functions/product';
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UpdateProductStatus } from '../../functions/user';
import { useSelector } from 'react-redux';


function Lists() {
     
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
     const loadAllProducts = () => {
         getList(100).then((p) => {
             setProducts(p.data);
             setLoading(false);
            });
        };
        
        useEffect(() => {
       loadAllProducts();
       // fetch categories
       
     }, []);

     const handleStatusChange =async (e , id) =>{
        let status = e.target.value

        const response = await UpdateProductStatus(id, status , user.token);
        loadAllProducts();
     }
     console.log(products)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>All product lists</h4>
          {/* {JSON.stringify(orders)} */}
          <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Seller</th>
          <th scope="col">Category</th>
          <th scope="col">Age</th>
          <th scope="col">Status</th>
          <th scope="col">Added On</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

     <tbody>
        
          {products.map((p , i ) => (<tr key={i}>
            <td >
              <Link to={`/product/${p._id}`}>
            <EyeOutlined  /> {p.title}
          </Link>
            </td>
            <td>{p.seller.name}</td>
            <td>{p.category.name}</td>
            <td>{p.age}</td>
            <td>{p.status}</td>
            <td>
                {moment(p.createdAt).format("DD-MM-YYYY hh:mm A")}
            </td>
            <td><select  className="form-control" onChange={(e) =>
                    handleStatusChange(e ,p._id)
                  }
                  defaultValue={p.status}>
                <option value="pending">Block</option>
                <option value="approved">Unblock</option>
                </select>
            </td>
          </tr>))}
        
      </tbody>
    </table>
        </div>
      </div>
    </div>
  )
}

export default Lists