'use client';

import { useState, useEffect } from 'react';

const images = [
  'https://images.ctfassets.net/mdpgzc1lmx9t/CokMkRaEo8wFv6FKrxjYe/9ffcf3864f2e99be1ba43818aee12b21/Fender-Productstory-stratocaster.webp',
  'https://sterlingbymusicman.com/cdn/shop/files/ST-AX50QM-LVB-M2-FRONT-FULL_49f1a578-0acf-4255-8276-da0bb1c4bf11.webp?v=1736957158',
  'https://cdn.connectsites.net/user_files/esp/product_images/000/035/887/original.png?1719245363',
];

export default function SlideBanner() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className=" relative w-full max-w-5xl mx-auto rounded-lg pl-15 pr-15 p-10">
      {images.map((img, index) => (
        <div
          key={index}
          className={`transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
        >
          {index === current && (
            <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-48 sm:h-64 md:h-80 object-contain rounded-lg"
            loading="lazy"
            />
          )}
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        aria-label="Next Slide"
      >
        ›
      </button>
    </div>
  );
}
