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
        className='relative overflow-hidden rounded-full h-20 w-20 p-1 border border-white/40'
        onClick={openModal}
      >
        <img
          src={imgUrl}
          alt='logo'
          className='w-full h-full object-cover rounded-full shadow-2xl cursor-pointer'
        />
      </div>

      {isModalOpen && (
        <div
          className='fixed top-0 left-0 inset-0 bg-black/50  backdrop-blur-md z-50 flex items-center justify-center cursor-pointer p-10'
          onClick={closeModal}
        >
          <div className='flex items-center justify-center   overflow-hidden rounded-md '>
            <img
              src={imgUrl}
              alt='modal'
              className='max-h-[90vh] md:max-h-[70vh] object-contain cursor-pointer'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePic;
