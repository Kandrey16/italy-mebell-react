import { Context } from "@/main";
import {
  Card,
  Dialog,
  Typography,
  Input,
  Button,
  CardBody,
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";

const UserProfileEditForm = observer(
  ({ show, onHide, userData, setUserData }) => {
    const { user } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileImage, setProfileImage] = useState(null); // Добавим состояние для изображения

    useEffect(() => {
      if (userData) {
        setFirstName(userData.first_name_user);
        setLastName(userData.second_name_user);
        setPhoneNumber(userData.phone_number_client);
        setProfileImage(userData.image_user_profile);
      }
    }, [userData]);

    const selectProfileImage = (e) => {
      setProfileImage(e.target.files[0]);
    };    

    const handleSave = () => {
      const formData = new FormData();
      formData.append("first_name_user", firstName);
      formData.append("second_name_user", lastName);
      formData.append("phone_number_client", phoneNumber);

      if (profileImage) {
        formData.append("image_user_profile", profileImage);
      }

      user.updateUserProfile(formData).then((updatedUserData) => {
        setUserData({ ...userData, ...updatedUserData });
        onHide();
      });
    };

    return (
      <Dialog open={show}>
        <Card className="p-4 rounded-xl">
          <CardBody>
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="mb-2">
                Редактировать профиль
              </Typography>
              <Input
                size="lg"
                label="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                size="lg"
                label="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                size="lg"
                label="Телефон"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Input type="file" size="lg" onChange={selectProfileImage} />
            </div>
            <div className="flex gap-4">
              <Button color="blue" className="my-2" onClick={handleSave}>
                Сохранить изменения
              </Button>
              <Button
                color="red"
                className="my-2"
                variant="outlined"
                onClick={onHide}
              >
                Отмена
              </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    );
  }
);

export default UserProfileEditForm;
