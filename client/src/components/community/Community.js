import React from 'react';
import Community1 from '../images/community1.jpeg';
import Community2 from '../images/community2.jpg';
import styles from './Community.module.css';

const Community = () => {
  return (
    <div className={styles.communityContainer}>
      <img src={Community1} alt="Community 1" />
      <img src={Community2} alt="Community 2" />
    </div>
  );
};

export default Community;
