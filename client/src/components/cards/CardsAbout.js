import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './CardsAbout.module.css';

const teamMembers = [
  {
    name: 'Mackenzie Miller',
    img: 'https://media-exp1.licdn.com/dms/image/C4E03AQErywh-ObhcXQ/profile-displayphoto-shrink_400_400/0/1636826946318?e=1645056000&v=beta&t=G5y-uvS5AhnP4P1Fj9Nz3OmDREfyO_G4hfsvAonOVHE',
    github: 'https://github.com/Mackmiller',
    linkedin: 'https://www.linkedin.com/in/mackmiller-dev/',
  },
  {
    name: 'Isaac Newman',
    img: 'https://media-exp1.licdn.com/dms/image/C4D03AQEM60PeYsCnsg/profile-displayphoto-shrink_400_400/0/1602781791357?e=1645056000&v=beta&t=W2DP_TTwjo5JI6OkQamqUxPY-6QNaityvsD3qpRIlXo',
    github: 'https://github.com/isaac8069',
    linkedin: 'https://www.linkedin.com/in/lonewman/',
  },
  {
    name: 'Isaac Waggoner',
    img: 'https://media-exp1.licdn.com/dms/image/C4D03AQEWHHbxAv5cug/profile-displayphoto-shrink_400_400/0/1597330190093?e=1645056000&v=beta&t=nH70b6DiDZHY1iLqXRAlCypkTJKWFPMiqM_X74qi8og',
    github: 'https://github.com/iwaggoner',
    linkedin: 'https://www.linkedin.com/in/iwaggoner/',
  },
  {
    name: 'Michael Kohlberg',
    img: 'https://media-exp1.licdn.com/dms/image/C5603AQHhWAYMpDoD9Q/profile-displayphoto-shrink_400_400/0/1581896475156?e=1645056000&v=beta&t=w90-0-fqvToz6iOUDf21Zmqo2IRlMml696PaFuagKrk',
    github: 'https://github.com/mgkdn9',
    linkedin: 'https://www.linkedin.com/in/michaelkohlberg/',
  },
];

const CardsAbout = () => {
  return (
    <div className={styles.cardsContainer}>
      {teamMembers.map((member, index) => (
        <Card key={index} className={styles.card}>
          <Card.Img
            variant="top"
            src={member.img}
            alt={member.name}
            className={styles.cardImage}
          />
          <Card.Body>
            <div className={styles.cardText}>
              <h4>{member.name}</h4>
              <h6>
                <a
                  href={member.github}
                  className={styles.cardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </h6>
              <h6>
                <a
                  href={member.linkedin}
                  className={styles.cardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </h6>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CardsAbout;
