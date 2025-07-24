import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Photo1 from '../images/photo1.jpeg';
import Photo2 from '../images/Modern1.jpeg';
import Photo3 from '../images/pop.jpeg';
import styles from './Cards.module.css';

const Cards = () => {
  const cardData = [
    { src: Photo2, title: 'Modern', link: '/available_art' },
    { src: Photo3, title: 'Pop', link: '/available_art' },
    { src: Photo1, title: 'Photography', link: '/available_art' },
  ];

  return (
    <div className={styles.cardsContainer}>
      {cardData.map((card, index) => (
        <Card key={index} className={styles.card}>
          <Card.Img variant="top" src={card.src} className={styles.cardImage} />
          <Card.Body className={styles.cardBody}>
            <Link to={card.link} className={styles.cardLink}>
              {card.title}
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
