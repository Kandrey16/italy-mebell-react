import { fetchProductComments } from "@/API/ProductCommentAPI";
import CommentCard from "./CommentCard";
import { useContext, useEffect, useState } from "react";
import { fetchOneUser } from "@/API/UserAPI";
import CommentAddForm from "./AddCommentForm";
import { observer } from "mobx-react";
import { Context } from "@/main";

const CommentSection = observer(({ id }) => {
  const { comment } = useContext(Context);
  const [commentData, setCommentData] = useState([]);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  useEffect(() => {
    fetchProductComments().then(async (data) => {
      const sortedComments = data.filter(
        (commentData) => commentData.id_product === parseInt(id)
      );
      const commentDataWithUserData = await Promise.all(
        sortedComments.map(async (commentData) => {
          const userData = await fetchOneUser(commentData.email_user);
          return { ...commentData, user: userData };
        })
      );
      setCommentData(commentDataWithUserData);
    });
  }, [id]);

  const handleShowAddCommentClick = () => {
    setShowAddCommentForm(true);
  };
  const handleClose = () => {
    setShowAddCommentForm(false);
  };

  function getCommentWord(count) {
    const tens = count % 100;
    const ones = count % 10;

    if (tens > 10 && tens < 20) {
      return "отзывов";
    } else if (ones > 1 && ones < 5) {
      return "отзыва";
    } else if (ones === 1) {
      return "отзыв";
    }
    return "отзывов";
  }

  return (
    <div className="py-5 bg-light-blue-50/50">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <h2 className="text-3xl py-5 font-semibold">Отзывы о товаре</h2>
            <p>
              {commentData.length} {getCommentWord(commentData.length)}
            </p>
          </div>
          <span
            className="flex text-base py-5 font-semibold cursor-pointer 
              hover:text-colorPrimaryHover commentData_icon"
            onClick={handleShowAddCommentClick}
          >
            Добавить отзыв
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
              className="ml-2"
            >
              <path
                fill="currentColor"
                d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2m-3 9h-4v4h-2v-4H7V9h4V5h2v4h4z"
              />
            </svg>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {commentData.length > 0 ? (
            commentData.map((comment) => (
              <CommentCard
                key={comment.id_product_commentData}
                data={comment}
              />
            ))
          ) : (
            <p className="col-span-full">Отзывы о товаре отсутствуют</p>
          )}
        </div>
        {showAddCommentForm && (
          <CommentAddForm
            show={showAddCommentForm}
            onHide={handleClose}
            productId={id}
          />
        )}
      </div>
    </div>
  );
});

export default CommentSection;
