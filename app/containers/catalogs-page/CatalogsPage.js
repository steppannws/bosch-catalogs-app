// @flow
import React, { Component } from 'react';
import Header from '../../components/header';
import styles from './styles.css';
import images from '../../static/images';
import Button from '../../components/button';

type Props = {};

export default class CatalogsPage extends Component {
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
        <Header step={1} />
        <div className={styles.wrapper}>
          <div className={styles.catalogsWrapper} />

          <div className={styles.bottomWrapper}>
            <div className={styles.logoWrapper}>
              <img className={styles.logo} src={images.LOGO} />
            </div>
            <div className={styles.buttonsWrapper}>
              <Button
                title="Anterior"
                onClick={() => this.props.history.push('/')}
              />
              <Button
                title="Siguiente"
                onClick={() => this.props.history.push('/form')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
