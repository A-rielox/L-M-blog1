import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './sidebar.css';

export default function Sidebar() {
   const [cats, setCats] = useState([]);

   useEffect(() => {
      const getCats = async () => {
         const { data } = await axios.get('/categories');

         setCats(data);
      };

      getCats();
   }, []);

   return (
      <div className="sidebar">
         <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img
               src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
               alt=""
            />
            <p>
               Laboris sunt aute cupidatat velit magna velit ullamco dolore
               mollit amet ex esse.Sunt eu ut nostrud id quis proident.
            </p>
         </div>

         {/*  */}

         <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
               {cats.map(c => {
                  return (
                     <Link key={c._id} className="link" to={`/?cat=${c.name}`}>
                        <li className="sidebarListItem">{c.name}</li>
                     </Link>
                  );
               })}
            </ul>
         </div>

         {/*  */}

         <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
               <i className="sidebarIcon fab fa-facebook-square"></i>
               <i className="sidebarIcon fab fa-instagram-square"></i>
               <i className="sidebarIcon fab fa-pinterest-square"></i>
               <i className="sidebarIcon fab fa-twitter-square"></i>
            </div>
         </div>
      </div>
   );
}
/* createdAt: "2022-02-23T20:12:49.049Z"
name: "music"
updatedAt: "2022-02-23T20:12:49.049Z"
__v: 0
_id: "62169541bcf04631484897a4" */
