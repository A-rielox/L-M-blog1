import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './singlePost.css';

export default function SinglePost() {
   const [post, setPost] = useState({});
   const location = useLocation();
   // console.log(location); { ... , pathname: "/post/621666be6e0e88ac26bbaf45"}
   // console.log(location.pathname.split('/')[2]); 621666be6e0e88ac26bbaf45

   const path = location.pathname.split('/')[2];

   useEffect(() => {
      const getPost = async () => {
         const res = await axios.get(`/posts/${path}`);

         setPost(res.data);
      };

      getPost();
   }, [path]);

   return (
      <div className="singlePost">
         <div className="singlePostWrapper">
            {post.photo && (
               <img className="singlePostImg" src={post.photo} alt="" />
            )}

            <h1 className="singlePostTitle">
               {post.title}
               <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit"></i>
                  <i className="singlePostIcon far fa-trash-alt"></i>
               </div>
            </h1>

            <div className="singlePostInfo">
               <span>
                  Author:
                  <Link className="link" to={`/?user=${post.username}`}>
                     <b className="singlePostAuthor">{post.username}</b>
                  </Link>
               </span>
               <span>{new Date(post.updatedAt).toDateString()}</span>
            </div>

            <p className="singlePostDesc">{post.desc}</p>
         </div>
      </div>
   );
}

/* 
categories: []
createdAt: "2022-02-23T16:54:22.803Z"
desc: "primer post primer post primer post primer post"
title: "primer post pepi"
updatedAt: "2022-02-23T17:03:10.529Z"
username: "pepi"
__v: 0
_id: "621666be6e0e88ac26bbaf45"
*/
