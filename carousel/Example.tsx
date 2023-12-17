import React from "react";
import { CarouselContainer, CarouselItem } from "./Carousel";

const Example = () => {
  const items = [];
  return (
    <CarouselContainer>
      {items?.map((item, index) => {
        return <CarouselItem key={index}>{item}</CarouselItem>;
      })}
    </CarouselContainer>
  );
};

export default Example;
