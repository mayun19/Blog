import React from "react";
import { Post } from "@/utils/types";
import Link from "next/link";

type TPostCardProps = {
  post: Post;
};

const PostCard = ({ post }: TPostCardProps) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <div className="transition-all duration-300 hover:-translate-y-2 flex flex-col rounded-[10px] bg-whiteBk md:p-5 p-4 shadow-[rgba(0,_0,_0,_0.15)_0px_8px_40px_0px] cursor-pointer gap-3">
        <h3 className="text-xl font-medium text-center">{post.title}</h3>
        <p className="text-base line-clamp-4 text-justify text-[#919191]">
          {post.body}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
