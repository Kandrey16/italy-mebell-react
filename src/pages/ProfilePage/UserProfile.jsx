import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaQrcode } from "react-icons/fa"; // Иконка QR-кода
import noPhoto from "@/assets/images/noPhoto.webp";
import QR_Code from "@/assets/images/qr-code.png";
import UserProfileEditForm from "./Items/EditProfile";

export const UserProfile = ({ userData, setUserData }) => {
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const userFirstName =
    userData && userData.first_name_user ? userData.first_name_user : "";
  const userLastName =
    userData && userData.second_name_user ? userData.second_name_user : "";
  const userEmailData = userData ? userData.email_user : "";
  const userPhone = userData ? userData.phone_number_client : "";

  const handleShowQRCode = () => setShowCode(!showCode);

  const handleEditProfile = () => {
    setEditProfileVisible(true);
  };

  // Функция для скрытия формы редактирования
  const handleCloseEditForm = () => {
    setEditProfileVisible(false);
  };

  // Функция для обновления данных профиля
  const handleUpdateUserData = (newUserData) => {
    setUserData(newUserData);
    handleCloseEditForm();
  };

  const imageUrl =
    userData && userData.image_user_profile
      ? `${import.meta.env.VITE_APP_API_URL}/user_photo/${userData.image_user_profile}`
      : noPhoto;

  return (
    <Card className="container my-5 p-4 col-span-1 h-fit">
      <div>
        <Avatar
          size="xxl"
          variant="circular"
          src={imageUrl}
          alt={`${userFirstName} ${userLastName}`}
        />
      </div>
      <div className="user-info">
        <p className="text-2xl font-bold">{`${userFirstName} ${userLastName}`}</p>
        <p>{userEmailData}</p>
        <p>{userPhone}</p>
        <span
          className="text-green-400 font-semibold my-2"
          onClick={handleEditProfile}
        >
          Редактировать профиль
        </span>
      </div>
      <Button
        onClick={handleShowQRCode}
        className="flex items-center place-content-center bg-colorPrimary my-2 space-x-2"
      >
        <FaQrcode />
        <p>Показать QR-Код</p>
      </Button>

      {editProfileVisible && (
        <UserProfileEditForm
          show={editProfileVisible}
          onHide={handleCloseEditForm}
          userData={userData}
          setUserData={handleUpdateUserData}
        />
      )}

      {showCode && (
        <Dialog
          open={showCode}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          onClose={handleShowQRCode}
        >
          <DialogBody>
            <img src={QR_Code} className="w-auto h-fit" />
          </DialogBody>
          <DialogFooter>
            <span className="cursor-pointer" onClick={handleShowQRCode}>
              Закрыть
            </span>
          </DialogFooter>
        </Dialog>
      )}
    </Card>
  );
};
