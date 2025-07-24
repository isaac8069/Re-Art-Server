import React from 'react';
import Tag from '../tags/Tag';
import Carousel from '../carousel/CarouselImage';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Carousel />
      <Tag />
    </div>
  );
};

export default Home;
