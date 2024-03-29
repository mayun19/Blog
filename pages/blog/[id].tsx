import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Layout from "@/components/Layout";
import { PostDetailProps } from "@/utils/types";

function DetailBlog({ post, comments }: PostDetailProps) {
  if (!post) {
    return (
      <Layout pageTitle="Post Not Found">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-3xl">Loading data...</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout pageTitle={`${post?.title}`}>
      <div className="flex min-h-screen flex-col items-center justify-between lg:p-24 px-6 py-5 gap-6 md:gap-12">
        <article>
          <h1 className="mb-5 lg:mb-12 text-center text-3xl font-semibold">
            {post.title}
          </h1>
          {post.body && (
            <p className="text-xl text-justify mt-0 text-slate-600">
              {post.body}
            </p>
          )}
        </article>
        <div className=" w-full bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3
            className={`${
              comments.length > 0 ? "mb-8" : "mb-0"
            } text-xl font-medium border-b pb-4`}>
            {comments.length} Comments
          </h3>
          {comments.length > 0 && (
            <div>
              {comments.map((comment: any, index: number) => (
                <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                  <p className="mb-4 font-medium">{comment.name}</p>
                  <p className="whitespace-pre-line text-slate-500  w-full">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DetailBlog;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { id } = params;

  try {
    const resPost = await axios.get(
      `https://gorest.co.in/public/v2/posts/${id}`
    );
    const post = resPost.data;

    const resComments = await axios.get(
      `https://gorest.co.in/public/v2/comments/?post_id=${id}`
    );
    const comments = resComments.data;

    return {
      props: {
        post,
        comments,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        post: null,
        comments: [],
      },
    };
  }
};
