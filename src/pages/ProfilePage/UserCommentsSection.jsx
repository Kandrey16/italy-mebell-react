import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  CardHeader,
  Typography,
  Rating,
} from "@material-tailwind/react";
import CommentItem from "./Items/CommentItem";
import { fetchOneProduct } from "@/API/ProductAPI";
import noPhoto from "@/assets/images/noPhoto.webp";
import { Context } from "@/main";
import { observer } from "mobx-react";
import CommentEditForm from "./Items/EditCommentForm";

export const UserComments = observer(({ comments, open, handleOpen }) => {
  const [products, setProducts] = useState({});

  const { comment } = useContext(Context);
  const [currentComment, setCurrentComment] = useState(null);
  const [commentEditVisible, setCommentEditVisible] = useState(false);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    const productPromises = comments.map((comment) =>
      fetchOneProduct(comment.id_product).then((productData) => {
        setProducts((prevProducts) => ({
          ...prevProducts,
          [comment.id_product]: productData,
        }));
      })
    );

    Promise.all(productPromises).catch(console.error);
  }, [comments]);

  const handleDelete = (id) => {
    comment.deleteComment(id);
  };

  const handleEdit = (comment) => {
    setCurrentComment(comment);
    setCommentEditVisible(true);
  };

  return (
    <div className="mt-6">
      <Accordion open={open === 2}>
        <AccordionHeader
          onClick={() => handleOpen()}
          className="text-2xl font-bold mb-4 cursor-pointer"
        >
          Ваши отзывы
        </AccordionHeader>
        <AccordionBody>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id_product_comment}
                comment={comment}
                product={products[comment.id_product]}
                handleEdit={() => handleEdit(comment)}
                handleDelete={() => handleDelete(comment.id_product_comment)}
              />
            ))
          ) : (
            <p className="text-gray-500">У вас нет отзывов.</p>
          )}
        </AccordionBody>
      </Accordion>

      {currentComment && (
        <CommentEditForm
          commentData={currentComment}
          show={commentEditVisible}
          onHide={() => {
            setCommentEditVisible(false);
            setCurrentComment(null);
          }}
        />
      )}
    </div>
  );
});
