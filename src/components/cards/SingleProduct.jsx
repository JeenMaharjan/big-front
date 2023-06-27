import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import ProductListItems from "./ProductListItems.jsx";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { showAverage } from "../../functions/rating";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Button, message } from "antd";
import BidModal from "./BidModal.jsx";
import moment from "moment";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star, loadSingleProduct, bidding }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const dispatch = useDispatch();
  const { user, cart, bid } = useSelector((state) => ({ ...state }));
  let history = useHistory();
 let id = "";
bidding?.find((b) => {
  if (b.buyer.email === user.email) {
    id = b._id; // Assuming the id you want to save is the _id property of the matching object
    return true; // Exit the loop if a match is found
  }
  return false; // Continue iterating if no match is found
});
console.log(id);
  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    if (product.quantity < 1) {
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
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
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (!user?.token) {
      toast.error("Please login first");
      history.push("/login");
      return;
    }
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((i) => (
              <img src={i.url} key={i.public_id} />
            ))}
          </Carousel>
        ) : (
          <Card cover={<img src="img" className="mb-3 card-image" />} />
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xxxx xxx xxx to learn more about this jeen
          </TabPane>
          <TabPane tab="Bid" key="3">
            {bidding?.map((bid) => (
              <div className="border border-300 border-solid p-3 rounded mt-2" key={bid._id}>
                <div className="flex justify-between text-gray-700">
                  <span>Name</span>
                  <span>{bid.buyer.name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Bid Amount</span>
                  <span>$ {bid.bidAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Bid Place On</span>
                  <span>{moment(bid.createdAt).format("MMM D, YYYY hh:mm A")}</span>
                </div>
              </div>
            ))}
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add To Cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" />
              <br />
              Add to Wishlist
            </a>,
            product.brandNew === "No" && (
              <a onClick={() => setShowAddNewBid(!showAddNewBid)}>
                <HeartOutlined className="text-info" />
                <br />
                {id ? "Update Bid" : "New Bid" }
              </a>
            ),
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>

      <BidModal
        showBidModal={showAddNewBid}
        setShowBidModal={setShowAddNewBid}
        product={product}
        loadSingleProduct={loadSingleProduct}
      />
    </>
  );
};

export default SingleProduct;
