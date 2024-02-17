'use client';

import { useRef } from 'react';
import Slider from 'react-slick';

import { Text } from '..';

const setting = {
  arrows: false,
  dots: false,
  autoplay: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
};

type NoticeSliderProp = {
  images?: string[];
  url?: string;
};

const image = [
  'https://www.calliaweb.co.uk/wp-content/uploads/2015/10/600x200.jpg',
  'https://www.calliaweb.co.uk/wp-content/uploads/2015/10/600x200.jpg',
  'https://www.calliaweb.co.uk/wp-content/uploads/2015/10/600x200.jpg',
];

export const NoticeSlider = ({ images, url }: NoticeSliderProp) => {
  const slider = useRef<Slider>(null);
  return (
    <div className="relative">
      <Slider ref={slider} className="w-full" {...setting}>
        {image?.map((imageSrc, idx) => (
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={url}
            className="h-auto rounded-12px"
          >
            <img
              className="z-0 h-auto w-full rounded-12px"
              alt="notice banner"
              src={imageSrc}
            />
          </a>
        ))}
      </Slider>
    </div>
  );
};
