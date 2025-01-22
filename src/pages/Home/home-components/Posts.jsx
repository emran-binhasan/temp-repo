import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { use } from "react";

const Posts = () => {
  const [post, setPost] = useState([]);
  console.log("post: ", post);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <div className=" pt-6 px-6 container mx-auto ">
      <h2 className="text-[2.63rem] leading-[2.8rem] font-semibold text-black mb-4">
        Latest Posts
      </h2>
	  <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 space-y-6 sm:space-y-0">
  {post.map((post) => (
    <Link to={`/post/${post.id}`} key={post.id} className="group relative">
      <div className="overflow-hidden">
        <img
          className="transition-transform duration-[2000ms] transform group-hover:scale-110"
          src={post.image}
          alt=""
        />
      </div>
      <p className=" text-lg font-semibold text-black">{post.title}</p>
    </Link>
  ))}
</div>

    </div>
  );
};

export default Posts;
