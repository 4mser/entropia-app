'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

function Projects() {
  const projects = [
    {
      name: 'Cultibox',
      image: '/images/banner.png',
    },
    {
      name: 'Deep Eye',
      image: '/images/img-eye.jpg',
    },
    {
      name: 'M.A.P.S',
      image: '/images/OIP.jpeg',
    },
    {
      name: 'Deep Eye',
      image: '/images/img-eye.jpg',
    },
    {
      name: 'M.A.P.S',
      image: '/images/OIP.jpeg',
    },
  ];

  return (
    <section className=' overflow-hidden'>
      <Swiper slidesPerView={1.8} spaceBetween={10} className='mySwiper'>
        {projects.map((project, index) => (
          <SwiperSlide key={index} className='overflow-hidden'>
            <div className={`border border-white/10 rounded-md  shadow-md overflow-hidden ${index === 0 ? 'ml-3' : ''}`}>
              <img src={project.image} alt={project.name} className='w-full h-20 object-cover' />
              <p className='text-[12px] p-1 text-white'>{project.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Projects;
