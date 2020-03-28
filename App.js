import React,{useState,useEffect} from 'react';
import Posts from './comp/Posts';
import Pag from'./comp/Pag';
import axios from 'axios';
import './App.css';

const App=()=> {
  const [posts,setPosts]=useState([]);
  const[loading,setLoading]=useState(false);
  const[currentPage,setCurrentPage]=useState(1);
  const[postsPerPage,setPostsPerPage]=useState(10);

  useEffect(()=>{
  const fetchPosts=async()=>{
    setLoading(true);
    const res=await axios.get('http://jsonplaceholder.typicode.com/posts')
    setPosts(res.data);
    setLoading(false);
  }
    fetchPosts();
  },[]);

  const indexOfLastPost=currentPage*postsPerPage;
  const indexOfFirstPost=indexOfLastPost-postsPerPage;
  const currentPost=posts.slice(indexOfFirstPost,indexOfLastPost);

  const paginate=(pageNumber)=> setCurrentPage(pageNumber)

  return (
    <div className="container">
        <h1>My App</h1>
        <Posts posts={currentPost} loading={loading}></Posts>
        <Pag postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}></Pag>
    </div>
  );
}

export default App;
