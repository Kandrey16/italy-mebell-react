import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Rating,
  Typography,
} from "@material-tailwind/react";
import StarRatings from "react-star-ratings";
import Filter from "bad-words";
import badwordsList from "@/data/badwords.json";
import { observer } from "mobx-react";
import { Context } from "@/main";

const CommentAddForm = observer(({ show, onHide, productId }) => {
  const { user, comment } = useContext(Context);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const email = user.user.email_user;

  const filter = new Filter({
    list: badwordsList.badwords,
    replaceRegex: /[A-Za-z0-9А-Яа-я_-]/g,
    placeHolder: "x",
  });

  console.log(badwordsList.badwords);

  const customIsProfane = (text) => {
    const lowerCaseText = text.toLowerCase();
    return filter.list.some((badWord) => lowerCaseText.includes(badWord));
  };

  const addComment = () => {
    if (!user.isAuth) {
      console.log("User is not authenticated!");
      return;
    }

    if (customIsProfane(description)) {
      alert(
        "Ваш комментарий содержит недопустимые выражения. Пожалуйста, отредактируйте его."
      );
      return;
    }

    const formData = new FormData();
    formData.append("mark_comment", rating);
    formData.append("description_comment", description);
    formData.append("id_product", productId);
    formData.append("email_user", email);

    comment
      .createComment(formData)
      .then(() => {
        onHide();
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
  };

  return (
    <Dialog open={show} onClose={onHide}>
      <Card className="p-4">
        <CardBody>
          <div className="mb-4">
            <Typography variant="h5">Добавить отзыв</Typography>
            <StarRatings
              rating={rating}
              starRatedColor="gold" // Золотой цвет выбранных звёзд
              starHoverColor="orange" // Оранжевый цвет звёзд при наведении мыши
              starEmptyColor="grey" // Серый цвет пустых звёзд
              starDimension="24px" // Размер звёзд 30px
              starSpacing="5px" // Отступ между звёздами 5px
              changeRating={handleRatingChange}
              numberOfStars={5}
              name="rating"
            />
          </div>
          <Input
            type="text"
            color="lightBlue"
            size="regular"
            outline="true"
            placeholder="Описание..."
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className="flex justify-end mt-4">
            <Button color="lightBlue" className="mr-4" onClick={addComment}>
              Отправить
            </Button>
            <Button color="red" variant="outlined" onClick={onHide}>
              Отмена
            </Button>
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
});

export default CommentAddForm;
