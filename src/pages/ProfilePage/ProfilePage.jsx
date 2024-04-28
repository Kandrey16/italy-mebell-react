import React, { useContext, useEffect, useState } from "react";
import { fetchOneUser } from "@/API/UserAPI";
import noPhoto from "@/assets/images/noPhoto.webp";
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
import OrderItem from "./Items/OrderItem";
import { UserProfile } from "./UserProfile";
import { UserOrders } from "./UserOrdersSection";
import { UserComments } from "./UserCommentsSection";
import { fetchProductCommentsByEmail } from "@/API/ProductCommentAPI";
import { fetchOneProduct } from "@/API/ProductAPI";
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

  const imageUrl =
    userData && userData.image_user_profile
      ? `${import.meta.env.VITE_APP_API_URL}/user_photo/${userData.image_user_profile}`
      : noPhoto;

  return (
    <>
      <Card color="white" className="container my-5">
        <UserProfile userData={userData} imageUrl={imageUrl} />
        <span className="text-green-400 font-semibold text-lg cursor-pointer" color="blue" onClick={() => setEditProfileVisible(true)}>
          Редактировать профиль
        </span>
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
