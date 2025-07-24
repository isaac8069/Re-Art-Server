import React from 'react';
import PlansImage from '../images/plansImage.jpeg';
import styles from './PlansSection.module.css';

const PlansSection = () => {
  return (
    <div className={styles.plansContainer}>
      <img src={PlansImage} alt="Plans" />
      <h2>Our Plans</h2>
    </div>
  );
};

export default PlansSection;
