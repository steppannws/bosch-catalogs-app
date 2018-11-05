import React from 'react';
import styles from './styles.css';

const Button = props => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
};

export default Button;
