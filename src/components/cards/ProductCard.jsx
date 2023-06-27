import React, { useState } from 'react'
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from '../../functions/rating';
import _ from "lodash";
import { useDispatch } from 'react-redux';
const { Meta } = Card;
function ProductCard({product}) {
  const [tooltip, setTooltip] = useState("Click to add");
  const { images, title, description, slug, price , _id } = product;
  const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        if(product.quantity < 1){
          return setTooltip("Sorry! product is empty  ")
        }
         // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      console.log(cart)
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // remove duplicates
       setTooltip("Added");

        dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
          type: "SET_VISIBLE",
          payload: true,
        });
    }
    }
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            alt={images.name}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${_id}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard