// @flow
import React, { Component } from 'react';
import Header from '../../components/header';
import styles from './styles.css';
import images from '../../static/images';
import Button from '../../components/button';

type Props = {
  history: object
};

export default class CatalogsPage extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      selectedCatalogs: []
    };

    this.catalogsImages = [
      {
        id: 0,
        name: 'Centro de Capacitación',
        path: './static/images/catalogs/1.jpg'
      },
      {
        id: 1,
        name: 'Superprofecionales',
        path: './static/images/catalogs/2.jpg'
      },
      {
        id: 2,
        name: 'Pastillas de Freno',
        path: './static/images/catalogs/3.jpg'
      },
      { id: 3, name: 'Muscletools', path: './static/images/catalogs/4.jpg' },
      {
        id: 4,
        name: 'Repustos de Motor',
        path: './static/images/catalogs/5.jpg'
      },
      { id: 5, name: 'Lámparas', path: './static/images/catalogs/6.jpg' },
      {
        id: 6,
        name: 'Kit de distribución',
        path: './static/images/catalogs/7.jpg'
      },
      { id: 7, name: 'Filtros', path: './static/images/catalogs/8.jpg' },
      { id: 8, name: 'Escobillos', path: './static/images/catalogs/9.jpg' },
      {
        id: 9,
        name: 'Discos de freno',
        path: './static/images/catalogs/10.jpg'
      },
      { id: 10, name: 'Diagnostics', path: './static/images/catalogs/11.jpg' },
      {
        id: 11,
        name: 'Bujías Incandenscencia',
        path: './static/images/catalogs/12.jpg'
      },
      { id: 12, name: 'Bujías', path: './static/images/catalogs/13.jpg' },
      {
        id: 13,
        name: 'Bombas de combustible',
        path: './static/images/catalogs/14.jpg'
      },
      {
        id: 14,
        name: 'Bobinas de encendio',
        path: './static/images/catalogs/15.jpg'
      },
      { id: 15, name: 'Baterías', path: './static/images/catalogs/16.jpg' },
      {
        id: 16,
        name: 'Rotating Machines',
        path: './static/images/catalogs/17.jpg'
      }
    ];
  }

  selectCatalog = id => {
    const { selectedCatalogs } = this.state;
    const catalog = selectedCatalogs.indexOf(id);
    if (catalog === -1) {
      selectedCatalogs.push(id);
    } else {
      selectedCatalogs.splice(catalog, 1);
    }

    this.setState({ selectedCatalogs });
  };

  renderCatalogItem = (catalog, index) => {
    const { selectedCatalogs } = this.state;
    const isSelected = selectedCatalogs.includes(index);
    // console.log(selectedCatalogs);
    return (
      <div
        className={styles.catalogItemWrapper}
        onClick={() => this.selectCatalog(catalog.id)}
      >
        <img
          src={catalog.path}
          className={styles.catalogImage}
          alt={catalog.name}
        />
        <div className={styles.catalogItemLine} />
        <div className={styles.catalogTtemTitleWrapper}>
          <span className={styles.catalogTtemTitle}>{catalog.name}</span>
        </div>
        <div
          className={`${styles.catalogFavIconWrapper} ${isSelected &&
            styles.catalogFavIconSelected}`}
        >
          <span className={styles.catalogFavIcon}>
            {isSelected ? '-' : '+'}
          </span>
        </div>
      </div>
    );
  };

  render() {
    const { history } = this.props;
    const { selectedCatalogs } = this.state;

    return (
      <div className={styles.container}>
        <Header step={1} />
        <div className={styles.wrapper}>
          <div className={styles.catalogsWrapper}>
            {this.catalogsImages.map(this.renderCatalogItem)}
          </div>

          <div className={styles.bottomWrapper}>
            <div className={styles.logoWrapper}>
              <img className={styles.logo} src={images.LOGO} alt="logo" />
            </div>
            <div className={styles.buttonsWrapper}>
              <Button title="Anterior" onClick={() => history.push('/')} />
              <Button
                title="Siguiente"
                onClick={() =>
                  history.push({
                    pathname: '/form',
                    state: { catalogs: selectedCatalogs }
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
