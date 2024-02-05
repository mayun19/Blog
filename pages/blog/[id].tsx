import { GetServerSideProps } from "next";
import axios from "axios";
import Layout from "@/components/Layout";
import { PostDetailProps } from "@/utils/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function DetailBlog({ post, comments }: PostDetailProps) {
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    // Fetch post details
    const { id } = query;
    const resPost = await axios.get(`posts/${id}`);
    const post = resPost.data;

    // Fetch comments for the post
    const commentsResponse = await axios.get<Comment[]>(
      `comments/?post_id=${id}`
    );

    const comments = commentsResponse.data;

    return {
      props: {
        post,
        comments,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true, // or handle the error in another way
    };
  }
};
