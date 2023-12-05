
import React from 'react';
// import { CiHeart } from 'react-icons/ci';
import { FaHeart } from "react-icons/fa";

const Like = ({ isLiked, onClick }) => {
  // console.log(isLiked);
  return (
    <div onClick={onClick} style={{ color: isLiked ? 'red' : 'white', cursor: 'pointer' }}>
      {/* <CiHeart className='likeBtn' /> */}
      <FaHeart className='likeBtn' />
    </div>
  );
};

export default Like;
