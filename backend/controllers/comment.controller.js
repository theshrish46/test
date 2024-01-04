import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const commentPost = async (req, res) => {
  try {
    const postIdParams = req.params.id;
    const post = await Post.findById(postIdParams);
    if (!post) {
      throw new APIError(400, "NO post found");
    }
    const { userId, postId, comment } = req.body;
    const commentPost = await Comment.create({
      postId: postId,
      authorId: userId,
      text: comment,
    });
    const user = await User.findById(userId);
    return res.status(200).json({
      user: user,
      post: post,
    });
  } catch (error) {
    console.log("Error in the comment route", error);
  }
};

const likedUser = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new APIError(404, "No post found");
  }
  const { userId } = req.body;
  post.likes += 1;
  await post.save();
  post.likedBy = userId;
  await post.save();
  return res.json({
    post: post,
  });
};

export { commentPost, likedUser };
