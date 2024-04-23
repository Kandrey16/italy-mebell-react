// components/CommentCard.jsx
import React from "react";
import { Card, CardHeader, Typography, Rating } from "@material-tailwind/react";
import noPhoto from "@/assets/images/noPhoto.webp";

const CommentItem = ({ comment, product }) => {
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
      className="order bg-white rounded-lg shadow-lg mb-4"
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="flex items-center justify-between rounded-lg mx-0 mt-0 py-4 bg-[#f5f7fa]"
      >
        {product && (
          <div className="flex items-center">
            <img
              src={
                product.url_main_image_product
                  ? `${import.meta.env.VITE_APP_API_URL}/${product.url_main_image_product}`
                  : noPhoto
              }
              alt={product.name_product}
              className="w-20 h-20 mx-4 rounded-lg"
            />
            <div className="flex-col">
              <div className="flex items-center gap-3">
                <Rating value={comment.mark_comment} readonly />
                <Typography className="text-gray-600 text-sm">
                  {formatDate(comment.createdAt)}
                </Typography>
              </div>

              <Typography className="font-bold text-xl">
                {product.name_product}
              </Typography>
            </div>
          </div>
        )}
      </CardHeader>
      <div className="p-4">
        <Typography className="font-bold">
          {comment.description_comment}
        </Typography>
      </div>
    </Card>
  );
};

export default CommentItem;
