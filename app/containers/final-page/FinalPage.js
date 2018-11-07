// @flow
import React, { Component } from 'react';
import Header from '../../components/header';
import styles from './styles.css';
import images from '../../static/images';
import Button from '../../components/button';

type Props = {};

export default class FinalPage extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {};

    this.inactiveInterval;
  }

  componentDidMount = () => {
    this.startInactivityTimer();
  };

  componentWillUnmount = () => {
    clearInterval(this.inactiveInterval);
  };

  startInactivityTimer = () => {
    clearInterval(this.inactiveInterval);
    this.inactiveInterval = setInterval(this.resetApp, 1 * 60 * 1000);
  };

  resetApp = () => {
    clearInterval(this.inactiveInterval);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className={styles.container}>
        <Header isSmall />
        <div className={styles.wrapper}>
          <div className={`${styles.titleWprapper} animated fadeInLeft`}>
            <span className={styles.titleText}>Listo!</span>
            <span className={styles.titleText}>Se han enviado</span>
            <span className={styles.titleText}>los catálogos</span>
            <span className={styles.titleText}>a tu casilla de mail.</span>
          </div>
          <div className={`animated fadeInDown delay-1s`}>
            <span className={styles.subtitleText}>
              Verificá tu conexión a Internet para poder
            </span>
            <br />
            <span className={styles.subtitleText}>
              recibirlos correctamente.
            </span>
          </div>
          <div className={styles.bottomWrapper}>
            <div className={styles.buttonsWrapper}>
              <Button
                title="Terminar"
                light
                onClick={() => this.props.history.push('/')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
