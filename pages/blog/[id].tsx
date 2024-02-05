import { GetServerSideProps } from "next";
import axios from "axios";
import Layout from "@/components/Layout";

function DetailBlog({ post, comments }: any) {
  return (
    <Layout pageTitle={`${post.title}`}>
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
                  <p className="mb-4">
                    <span className="font-medium">{comment.name}</span>
                  </p>
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const resPost = await axios.get(`posts/${id}`);
  const post = resPost.data;

  const resComments = await axios.get(`comments/?post_id=${id}`);
  const comments = resComments.data;

  return {
    props: {
      post,
      comments,
    },
  };
};
