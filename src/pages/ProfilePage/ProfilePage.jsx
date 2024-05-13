import React, { useContext, useEffect, useState } from "react";
import { fetchOneUser } from "@/API/UserAPI";
import { Context } from "@/main";
import { observer } from "mobx-react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { toJS } from "mobx";
import { fetchOrdersByEmail } from "@/API/OrderAPI";
import { UserProfile } from "./UserProfile";
import { UserOrders } from "./UserOrdersSection";
import { UserComments } from "./UserCommentsSection";
import { fetchProductCommentsByEmail } from "@/API/ProductCommentAPI";
import UserProfileEditForm from "./Items/EditProfile";

const ProfilePage = observer(() => {
  const { user } = useContext(Context);

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);

  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const userEmail = toJS(user.user.email_user);
  useEffect(() => {
    if (userEmail) {
      fetchOneUser(userEmail).then((data) => {
        setUserData(data);
      });

      fetchOrdersByEmail(userEmail).then((ordersData) => {
        setOrders(ordersData);
      });

      fetchProductCommentsByEmail(userEmail).then((commentsData) => {
        setComments(commentsData);
      });
    }
  }, [userEmail]);

  return (
    <>
      <div className="container grid lg:grid-cols-4 gap-4">
        <UserProfile userData={userData} setUserData={setUserData} />
        <Card color="white" className="container my-5 lg:col-span-3 h-fit">
          <UserOrders
            orders={orders}
            open={open}
            handleOpen={() => handleOpen(1)}
          />
          <UserComments
            comments={comments}
            open={open}
            handleOpen={() => handleOpen(2)}
          />
        </Card>
      </div>

      {userData && (
        <UserProfileEditForm
          show={editProfileVisible}
          onHide={() => setEditProfileVisible(false)}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </>
  );
});

export default ProfilePage;
