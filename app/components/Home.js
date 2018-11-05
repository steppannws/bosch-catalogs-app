// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.titleWprapper}>
          <span className={styles.titleText}>Descargá</span>
          <span className={styles.titleText}>los catálogos</span>
          <span className={styles.titleText}>digitales</span>
          <span className={styles.titleText}>de Bosch</span>
        </div>
        <Link to={routes.FORM}>form</Link>
        <Link to={routes.CATALOGS}>ctalogs</Link>
      </div>
    );
  }
}
