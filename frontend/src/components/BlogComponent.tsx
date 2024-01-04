import axios from "axios";
import BlogCard from "./BlogCard";

type Tprops = {
  id: string | number;
  user?: any;
};

const BlogComponent = async ({ id, user }: Tprops) => {
  const blogId = id;
  const res = await axios.get(`http://localhost:8000/blog/getpost/${blogId}`);
  const { data } = await res;
  return (
    <div className="flex flex-col gap-y-5">
      <BlogCard data={data} blogId={blogId} />
    </div>
  );
};

export default BlogComponent;
