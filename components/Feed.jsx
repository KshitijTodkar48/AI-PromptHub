"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data , handleTagClick }) => {
   return (
    <div className="prompt_layout mt-16">
      {
        data.map((post) => 
          <PromptCard 
            key = {post._id}
            post = {post}
            handleTagClick = {handleTagClick}
          />
        )
      }
    </div>
   )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchText, setSearchText] = useState('') ;
  const [searchTimeout, setSearchTimeout] = useState(null) ;

  useEffect(() => {
    // Defining 
    const fetchPosts = async() => {
      const response = await fetch("/api/prompt") ;
      const data = await response.json() ;
      setAllPosts(data) ;
    }
    // Calling on the first render
    fetchPosts() ;
  } , [])

  const filterPrompts = (searchText) => {
     const regex = new RegExp(searchText , "i") // 'i' flag for case-insensitive search
     return allPosts.filter((post) => {
        return  regex.test(post.creator.username) || 
                regex.test(post.tag) || 
                regex.test(post.prompt) 
     });
  }

  const handleSearchChange = (e) => {

    setSearchText(e.target.value) ;

    // Debounce mechanism
    clearTimeout(searchTimeout) ;

    setSearchTimeout(
      setTimeout(() => {
        const result = filterPrompts(e.target.value) ;
        setSearchedPosts(result) ;
      } , 500)
    );
  }

  const handleTagClick = (tagName) => {
     setSearchText(tagName) ;

     const result = filterPrompts(tagName) ;
     setSearchedPosts(result) ;
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username or prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ? 
        (<PromptCardList 
          data={ searchedPosts }
          handleTagClick = {handleTagClick}
        />)
        :
        (<PromptCardList 
          data={ allPosts }
          handleTagClick = {handleTagClick}
        />)
      }
      
    </section>
  );
};

export default Feed;
