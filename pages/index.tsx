import { GetServerSideProps, NextPage } from "next";
import { Post, PostProps } from "@/utils/types";
import PostCard from "@/components/PostCard";
import Layout from "@/components/Layout";
import axios from "axios";

const Home = ({ posts }: PostProps) => {
  return (
    <Layout pageTitle="Home - All Blog">
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-5">
        <h1 className="text-2xl mb-5 lg:mb-12 font-semibold">All Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post: Post, index: number) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </main>
    </Layout>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`posts`);
  const posts = response.data;

  return {
    props: {
      posts,
    },
  };
};
