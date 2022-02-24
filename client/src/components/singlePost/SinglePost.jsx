import { useLocation } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './singlePost.css';

export default function SinglePost() {
   const { user } = useContext(Context);
   const [post, setPost] = useState({});
   const PF = 'http://localhost:5000/images/';
   const location = useLocation();
   // console.log(location); { ... , pathname: "/post/621666be6e0e88ac26bbaf45"}
   // console.log(location.pathname.split('/')[2]); 621666be6e0e88ac26bbaf45

   const path = location.pathname.split('/')[2];
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [updateMode, setUpdateMode] = useState(false);

   useEffect(() => {
      const getPost = async () => {
         const res = await axios.get('/posts/' + path);
         setPost(res.data);
         setTitle(res.data.title);
         setDesc(res.data.desc);
      };
      getPost();
      // con el path en la dependencia se va a actualizar esto cada q entre a esta pagina
   }, [path]);

   const handleDelete = async () => {
      try {
         // 💥💥💥  al user delete no se puede mandar directo "{ username: user.username }" tiene q ser {data: { username: user.username }}
         await axios.delete(`/posts/${post._id}`, {
            data: { username: user.username },
         });
         window.location.replace('/');
      } catch (err) {}
   };

   const handleUpdate = async () => {
      try {
         await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
         });

         setUpdateMode(false);
      } catch (err) {}
   };

   return (
      <div className="singlePost">
         <div className="singlePostWrapper">
            {post.photo && (
               <img src={PF + post.photo} alt="" className="singlePostImg" />
            )}

            {updateMode ? (
               <input
                  type="text"
                  value={title}
                  className="singlePostTitleInput"
                  autoFocus
                  onChange={e => setTitle(e.target.value)}
               />
            ) : (
               <h1 className="singlePostTitle">
                  {title}
                  {post.username === user?.username && (
                     <div className="singlePostEdit">
                        <i
                           className="singlePostIcon far fa-edit"
                           onClick={() => setUpdateMode(true)}
                        ></i>
                        <i
                           className="singlePostIcon far fa-trash-alt"
                           onClick={handleDelete}
                        ></i>
                     </div>
                  )}
               </h1>
            )}

            <div className="singlePostInfo">
               <span className="singlePostAuthor">
                  Author:
                  <Link to={`/?user=${post.username}`} className="link">
                     <b> {post.username}</b>
                  </Link>
               </span>
               <span className="singlePostDate">
                  {new Date(post.createdAt).toDateString()}
               </span>
            </div>

            {updateMode ? (
               <textarea
                  className="singlePostDescInput"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
               />
            ) : (
               <p className="singlePostDesc">{desc}</p>
            )}

            {updateMode && (
               <button className="singlePostButton" onClick={handleUpdate}>
                  Update
               </button>
            )}
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
