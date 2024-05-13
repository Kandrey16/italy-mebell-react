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
import ChangePasswordForm from "./Items/ChangePasswordForm";

export const UserProfile = ({ userData, setUserData }) => {
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const userFirstName =
    userData && userData.first_name_user ? userData.first_name_user : "";
  const userLastName =
    userData && userData.second_name_user ? userData.second_name_user : "";
  const userEmailData = userData ? userData.email_user : "";
  const userPhone = userData ? userData.phone_number_client : "";

  const handleShowQRCode = () => setShowCode(!showCode);
  const handleEditProfile = () => setEditProfileVisible(true);
  const handleEditPassword = () => setEditPasswordVisible(true);

  // Функция для обновления данных профиля
  const handleUpdateUserData = (newUserData) => {
    setUserData(newUserData);
    setEditProfileVisible(false);
  };

  const handleCloseEditForm = () => {
    setEditProfileVisible(false);
  };

  const imageUrl =
    userData && userData.image_user_profile
      ? `${import.meta.env.VITE_APP_API_URL}/user_photo/${userData.image_user_profile}`
      : noPhoto;

  return (
    <Card className="container my-5 p-4 col-span-1 min-w-60 h-fit">
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
        <div className="flex flex-col">
          <span
            className="text-green-400 font-semibold my-2 cursor-pointer"
            onClick={handleEditProfile}
          >
            Редактировать профиль
          </span>
          <span
            className="text-green-400 font-semibold cursor-pointer"
            onClick={handleEditPassword}
          >
            Изменить пароль
          </span>
        </div>
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

      {editPasswordVisible && (
        <ChangePasswordForm
          show={editPasswordVisible}
          onHide={() => setEditPasswordVisible(false)}
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
            <img src={QR_Code} className="w-full h-fit" />
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
