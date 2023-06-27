import { Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PlaceNewBid } from "../../functions/bid"
import { toast } from "react-toastify";
import { AddNotification } from "../../functions/notification";
import { CloudFilled } from "@ant-design/icons";


function BidModal({ showBidModal, setShowBidModal , product ,loadSingleProduct }) {
  
  const formRef = React.useRef(null);
  const rules = [{ required: true, message: "Required" }];
  const [loading, setLoading] = useState(false)
    const { user, cart } = useSelector((state) => ({ ...state }));
  const onFinish = async (values) => {
     if(product.quantity < 1){
      setShowBidModal(false); 
          return alert("sorry no product")
          
        }
        try {
        setLoading(true);
      
        const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      } , user.token)
      
        if(response.data ){
          
      
        }else {
          toast.error("bidding limit reached")
        }
      
      
      setShowBidModal(false);
    } catch (error) {
       if (error.response && error.response.status === 400 && error.response.data.message === "You have reached the maximum limit of bids for this product.") {
      toast.error("You have reached the maximum limit of bids for this product.");
    } else {
      toast.success("Bid added successfully");
      await AddNotification({
          title: "A new bid has been placed",
          message: `A new bid has been placed on your product ${product.title} by ${user.name} for $ ${values.bidAmount}`,
          user: product.seller._id,
          onClick: `/profile`,
          read: false,
        } , user.token);
      
      
      loadSingleProduct()
      setShowBidModal(false);
    }
    
    setLoading(false);
    }
      
  }
  return (
      <Modal
      onCancel={() => setShowBidModal(false)}
      open={showBidModal}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        {
          (user && user.email !== product?.seller?.email) ? (<><h1 className="text-2xl font-semibold text-orange-900 text-center">
          New Bid
        </h1>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form></>) : ( 
        <div style={{display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
          <h1>Please Login to Bid on this product {product.title} and also you cannot bid on your own product</h1>
          <p>~~~~~~~~~~~~~~~~~~~~Thank You ~~~~~~~~~~~~~~~~~~~~~</p>
        </div>
        
        )
        }
      </div>
    </Modal>
  )
}

export default BidModal