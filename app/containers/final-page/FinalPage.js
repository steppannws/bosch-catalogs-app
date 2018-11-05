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

    console.log(props);
  }

  render() {
    // const {

    // } = this.state;

    return (
      <div className={styles.container}>
        <Header isSmall />
        <div className={styles.wrapper}>
          <div className={styles.titleWprapper}>
            <span className={styles.titleText}>Listo!</span>
            <span className={styles.titleText}>Se han enviado</span>
            <span className={styles.titleText}>los catálogos</span>
            <span className={styles.titleText}>a tu casilla de mail.</span>
          </div>
          <span className={styles.subtitleText}>
            Verificá tu conexión a Internet para poder
          </span>
          <span className={styles.subtitleText}>recibirlos correctamente.</span>
          <div className={styles.bottomWrapper}>
            <div className={styles.buttonsWrapper}>
              <Button
                title="Terminar"
                onClick={() => this.props.history.push('/')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
