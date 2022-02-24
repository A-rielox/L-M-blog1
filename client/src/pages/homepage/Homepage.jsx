import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import './homepage.css';

export default function Homepage() {
   const { search } = useLocation(); // search "?user=pepi" o "?cat=music"

   const [posts, setPosts] = useState([]);

   useEffect(() => {
      // "proxy": "http://localhost:5000/api"
      const fetchPosts = async () => {
         const res = await axios.get(`/posts${search}`);

         setPosts(res.data);
      };

      fetchPosts();
   }, [search]);

   return (
      <>
         <Header />
         <div className="home">
            <Posts posts={posts} />
            <Sidebar />
         </div>
      </>
   );
}
