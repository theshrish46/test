import axios from "axios";

type TProps = {
  dataa: any;
};

const CommentCard = async ({ dataa }: TProps) => {
  const { comment, post } = dataa;
  const res = await axios.post("http://localhost:8000/auth/getuserpost", post);
  const { data } = res;
  return (
    <div className="my-5">
      {comment.map((item, index) => (
        <div
          className="bg-secondary my-4 py-4 flex flex-col gap-y-3"
          key={index}
        >
          <div className="flex gap-x-3 px-3">
            {/* <div>Author {user?.name} On the post</div> */}
            <div>Post {post.title}</div>
          </div>
          <div className="px-3 text-lg font-medium text-gray-900">
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
