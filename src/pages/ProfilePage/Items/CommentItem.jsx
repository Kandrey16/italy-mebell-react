// components/CommentCard.jsx
import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  Rating,
  CardBody,
  Button,
} from "@material-tailwind/react";
import noPhoto from "@/assets/images/noPhoto.webp";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "@/routes/utils/consts";
import editIcon from "@/assets/edit-solid.svg";
import deleteIcon from "@/assets/delete.svg";

const CommentItem = ({ comment, product, handleEdit, handleDelete }) => {
  const navigate = useNavigate();
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Card
      key={comment.id_comment}
      className="bg-white mb-4"
      style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "10px" }}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="flex items-center justify-between rounded-b-none mx-0 mt-0 py-4 bg-[#f5f7fa]"
      >
        <div className="flex items-center justify-start">
          {product && (
            <>
              <img
                src={
                  product.url_main_image_product
                    ? `${import.meta.env.VITE_APP_API_URL}/${product.url_main_image_product}`
                    : noPhoto
                }
                alt={product.name_product}
                className="w-20 h-20 mx-4 rounded-lg cursor-pointer"
                onClick={() =>
                  navigate(PRODUCT_ROUTE + "/" + product.id_product)
                }
              />
              <div>
                <Typography
                  className="font-bold text-xl cursor-pointer"
                  onClick={() =>
                    navigate(PRODUCT_ROUTE + "/" + product.id_product)
                  }
                >
                  {product.name_product}
                </Typography>
                <div className="flex items-center gap-3 mt-1">
                  <Rating value={comment.mark_comment} readonly size="small" />
                  <Typography className="text-gray-600 text-sm">
                    {formatDate(comment.createdAt)}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-end px-4 gap-3">
          <img
            className="w-8 h-8 cursor-pointer"
            src={editIcon}
            onClick={() => handleEdit(comment)}
          ></img>
          <img
            src={deleteIcon}
            className="w-8 h-8 cursor-pointer"
            onClick={() => handleDelete(comment.id_comment)}
          ></img>
        </div>
      </CardHeader>
      <CardBody className="rounded-xl rounded-t-none p-4 bg-[#f5f7fa]">
        <Typography className="font-bold text-xl">
          {comment.description_comment}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default CommentItem;
