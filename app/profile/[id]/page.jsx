"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams() ;
  const [posts, setPosts] = useState([]) ;

  const userName = searchParams.get("name") ;

  useEffect(() => {
    // Defining
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    // Calling on the first render
    if(params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile page. Explore ${userName}'s amazing prompts and copy the one you find useful.`}
      data={posts}
    />
  );
};

export default UserProfile;
