import React, { Component } from 'react';
import images from '../../static/images';
import styles from './styles.css';

type Props = {
  step: number,
  isSmall: boolean
};

export default class Header extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      titles: [
        '1. Seleccioná los catálogos que deseás recibir por mail.',
        '2. Completá tus datos. Todos los campos son obligatorios.'
      ]
    };
  }

  render() {
    return (
      <div
        className={
          this.props.isSmall !== undefined && this.props.isSmall
            ? styles.smallContainer
            : styles.container
        }
      >
        <img src={images.BAR} className={styles.barImage} />
        {!this.props.isSmall && (
          <div className={styles.titleWrapper}>
            <span className={styles.title}>
              {this.state.titles[this.props.step - 1]}
            </span>
            <div className={styles.indicatorsWrapper}>
              <div className={styles.indicator} />
              <div
                className={
                  this.props.setp === 1
                    ? styles.inactiveIndicator
                    : styles.indicator
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
