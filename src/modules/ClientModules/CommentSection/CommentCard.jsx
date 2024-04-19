import {
  Card,
  CardHeader,
  Avatar,
  CardBody,
  Rating,
  Typography,
} from "@material-tailwind/react";
import noPhoto from "@/assets/images/noPhoto.webp";

const CommentCard = ({ data }) => {
  const user = data.user;

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const formatedDate = formatDate(data.createdAt);

  const imageUrl = user.image_user_profile
    ? `${import.meta.env.VITE_APP_API_URL}/user_photo/${user.image_user_profile}`
    : noPhoto;

  return (
    <Card shadow={true} className="w-full max-w-[32rem] p-5 m-4">
      <CardHeader
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src={imageUrl}
          alt={data.first_name_user}
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {`${user.first_name_user} ${user.second_name_user}`}
            </Typography>
            <div className="5 flex items-center gap-0">
              <Rating value={data.mark_comment} readonly />
            </div>
          </div>
          <Typography color="gray">{formatedDate}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>{data.description_comment}</Typography>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
