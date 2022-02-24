import { Link } from 'react-router-dom';
import './post.css';

export default function Post({ post }) {
   return (
      <div className="post">
         {post.photo && <img className="postImg" src={post.photo} alt="" />}

         <div className="postInfo">
            <div className="postCats">
               {post.categories.map(c => {
                  return (
                     <span className="postCat">
                        {/* <Link className="link" to="/posts?cat=Music">
                     </Link> */}
                        {c.name}
                     </span>
                  );
               })}
            </div>

            <Link to={`/post/${post._id}`} className="link">
               <span className="postTitle">{post.title}</span>
            </Link>

            <hr />

            <span className="postDate">
               {new Date(post.createdAt).toDateString()}
            </span>
         </div>

         <p className="postDesc">{post.desc}</p>
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
