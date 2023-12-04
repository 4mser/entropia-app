'use client'
import React, { useState } from 'react';

interface ProfilePicProps {
  imgUrl: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ imgUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        id="profile-image"
        className='relative overflow-hidden rounded-full h-20 w-20'
        onClick={openModal}
      >
        <img
          src={imgUrl}
          alt='logo'
          className='w-full h-full object-cover shadow-2xl cursor-pointer'
        />
      </div>

      {isModalOpen && (
        <div
          className='fixed top-0 left-0 inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center p-20'
          onClick={closeModal}
        >
          <div className=' relative overflow-hidden rounded-md '>
            <img
              src={imgUrl}
              alt='modal'
              className='h-full md:max-h-[70vh] object-contain cursor-pointer'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePic;
