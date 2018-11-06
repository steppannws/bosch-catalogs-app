// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props);
    return (
      <div
        className={styles.container}
        onClick={() => this.props.history.push('/catalogs')}
      >
        <div className={styles.titleWprapper}>
          <span className={styles.titleText}>Descargá</span>
          <span className={styles.titleText}>los catálogos</span>
          <span className={styles.titleText}>digitales</span>
          <span className={styles.titleText}>de Bosch</span>
        </div>

        <div className={styles.subtitleAndLineWrapper}>
          <div className={styles.subtitleWrapper}>
            <span className={styles.subtitleText}>
              Tocá la pantalla para comenzar
            </span>
          </div>
          <div className={styles.lineWrapper}>
            <div className={styles.circle} />
            <div className={styles.line} />
          </div>
        </div>
        {/* <Link to={routes.FORM}>form</Link> */}
        {/* <Link to={routes.CATALOGS}>ctalogs</Link> */}
      </div>
    );
  }
}
