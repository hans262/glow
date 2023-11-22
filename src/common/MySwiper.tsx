export const a =2

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Lazy, Zoom } from 'swiper';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import "swiper/css/lazy";
// import "swiper/css/zoom";

// const images = [
//   'https://swiperjs.com/demos/images/nature-1.jpg',
//   'https://swiperjs.com/demos/images/nature-2.jpg',
//   'https://swiperjs.com/demos/images/nature-3.jpg',
//   'https://swiperjs.com/demos/images/nature-4.jpg',
//   'https://swiperjs.com/demos/images/nature-5.jpg',
//   'https://swiperjs.com/demos/images/nature-6.jpg',
//   'https://swiperjs.com/demos/images/nature-7.jpg',
//   'https://swiperjs.com/demos/images/nature-8.jpg'
// ]

// export default () => {
//   return (
//     <Swiper style={{
//       height: 500,
//     }}
//       modules={[Navigation, Pagination, Lazy, Zoom]}
//       lazy={true}
//       pagination={{ clickable: true }}
//       navigation={true}
//       loop={true}
//       zoom={true}
//     >
//       {images.map((src, index) => <SwiperSlide
//         key={index}
//         style={{ background: '#000' }}>
//         <div className="swiper-zoom-container">
//           <img
//             alt=""
//             data-src={src}
//             className="swiper-lazy"
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//           />
//           <div
//             className="swiper-lazy-preloader swiper-lazy-preloader-white"
//           />
//         </div>
//       </SwiperSlide>)}
//     </Swiper>
//   )
// }