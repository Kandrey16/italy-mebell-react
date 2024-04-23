import React from 'react';
import { Avatar } from "@material-tailwind/react";
import noPhoto from "@/assets/images/noPhoto.webp";

export const UserProfile = ({ userData, imageUrl }) => {
  const userFirstName = userData ? userData.first_name_user : "";
  const userLastName = userData ? userData.second_name_user : "";
  const userEmailData = userData ? userData.email_user : "";
  const userPhone = userData ? userData.phone_number_client : "";

  return (
    <div>
      <div className="avatar-container">
        <Avatar
          size="xl"
          variant="circular"
          src={imageUrl}
          alt={`${userFirstName} ${userLastName}`}
        />
      </div>
      <div className="user-info">
        <h1>Личный кабинет</h1>
        <p>Имя: {userFirstName}</p>
        <p>Фамилия: {userLastName}</p>
        <p>Email: {userEmailData}</p>
        <p>Телефон: {userPhone}</p>
      </div>
    </div>
  );
};