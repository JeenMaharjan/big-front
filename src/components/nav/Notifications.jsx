import React from 'react'
import { message, Modal } from "antd";
function Notifications({
    notifications , 
  showNotifications , 
  setShowNotifications,
}) {
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        
         {notifications.map((notification) => (
          <div
            className="flex flex-col border border-solid p-2 border-gray-300 rounded "
            key={notification._id}
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                //   navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h1 className="text-gray-700">{notification.title}</h1>
                <span className="text-gray-600">{notification.message}</span>
                <h1 className="text-gray-500 text-sm">
                  {/* {moment(notification.createdAt).fromNow()} */}
                </h1>
              </div>
              <i
                className="ri-delete-bin-line"
                onClick={() => {
                //   deleteNotification(notification._id);
                }}
              ></i>
            </div>
          </div>
        ))}
        
      </div>
    </Modal>
  )
}

export default Notifications