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

    this.catalogsImages = [
      './static/images/catalogs/1.jpg',
      './static/images/catalogs/2.jpg',
      './static/images/catalogs/3.jpg',
      './static/images/catalogs/4.jpg',
      './static/images/catalogs/5.jpg',
      './static/images/catalogs/6.jpg',
      './static/images/catalogs/7.jpg',
      './static/images/catalogs/8.jpg',
      './static/images/catalogs/9.jpg',
      './static/images/catalogs/10.jpg',
      './static/images/catalogs/11.jpg',
      './static/images/catalogs/12.jpg',
      './static/images/catalogs/13.jpg',
      './static/images/catalogs/14.jpg',
      './static/images/catalogs/15.jpg',
      './static/images/catalogs/16.jpg'
    ];
  }

  renderCatalogItem = (image, index) => {
    return (
      <div className={styles.catalogItemWrapper}>
        <img src={image} className={styles.catalogImage} />
      </div>
    );
  };

  render() {
    // const {

    // } = this.state;

    return (
      <div className={styles.container}>
        <Header step={1} />
        <div className={styles.wrapper}>
          <div className={styles.catalogsWrapper}>
            {this.catalogsImages.map(this.renderCatalogItem)}
          </div>

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
