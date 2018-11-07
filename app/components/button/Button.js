import React from 'react';
import styles from './styles.css';

const Button = props => {
  return (
    <div
      className={`${props.light && styles.lightContainer} ${styles.container}`}
      onClick={props.onClick}
    >
      <span className={`${styles.title} ${props.light && styles.lightTitle}`}>
        {props.title}
      </span>
    </div>
  );
};

export default Button;
