import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  Dialog,
  Input,
  Button,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import { Context } from "@/main";
import StarRatings from "react-star-ratings";

const CommentEditForm = observer(({ show, onHide, commentData }) => {
  const { comment } = useContext(Context);
  const [description, setDescription] = useState(
    commentData.description_comment
  );
  const [rating, setRating] = useState(commentData.mark_comment);

  useEffect(() => {
    if (commentData) {
      setDescription(commentData.description_comment);
      setRating(commentData.mark_comment);
    }
  }, [commentData]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const editComment = () => {

    if (commentData && commentData.id_product_comment) {
      comment
        .editComment(commentData.id_product_comment, {
          description_comment: description,
          mark_comment: rating,
        })
        .then(() => {
          console.log("Отзыв успешно отредактирован.");
          onHide();
        })
        .catch((error) => {
          console.error("Ошибка при редактировании отзыва:", error);
        });
    }
  };

  return (
    <Dialog open={show}>
      <Card className="p-4">
        <CardBody>
          <Typography variant="h5" className="mb-2">
            Редактировать отзыв
          </Typography>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание отзыва"
          />
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
          <Button color="blue" onClick={editComment}>
            Сохранить
          </Button>
          <Button color="red" variant="outlined" onClick={onHide}>
            Отмена
          </Button>
        </CardBody>
      </Card>
    </Dialog>
  );
});

export default CommentEditForm;
