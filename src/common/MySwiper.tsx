import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/lazy/lazy.min.css"

import SwiperCore, { Zoom, Lazy, Pagination, Navigation } from 'swiper';
SwiperCore.use([Zoom, Pagination, Navigation, Lazy]);

const images = [
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
  'https://swiperjs.com/demos/images/nature-4.jpg',
  'https://swiperjs.com/demos/images/nature-5.jpg',
  'https://swiperjs.com/demos/images/nature-6.jpg',
  'https://swiperjs.com/demos/images/nature-7.jpg',
  'https://swiperjs.com/demos/images/nature-8.jpg'
]

export default function MySwiper() {
  return (
    <Swiper style={{
      height: 500,
      position: 'relative',
      overflow: 'hidden'
    }}
      lazy={true}
      pagination={{ clickable: true }}
      navigation={true}
      loop={true}
      zoom={true}
    >
      {images.map((s, k) =>
        <SwiperSlide key={k}
          className="swiper-zoom-container"
          style={{ background: '#000' }}>
          <img
            alt=""
            data-src={s}
            className="swiper-lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            className="swiper-lazy-preloader swiper-lazy-preloader-white"
          />
        </SwiperSlide>
      )}
    </Swiper>
  )
}