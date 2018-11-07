// @flow
import React, { Component } from 'react';
// import { Spring } from 'react-spring';
import { Transition, animated, config } from 'react-spring';

import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      images: [
        require('../static/images/PORTADA_1.png'),
        require('../static/images/PORTADA_2.png'),
        require('../static/images/PORTADA_3.png')
      ],
      currentImage: 0,
      animations: ['', 'fadeInRight', 'fadeOutRight'],
      currentAnimation: 0
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.showNextImage();
    }, 3000);
  };

  changeImage = () => {
    this.setState({ currentAnimation: 2 }, () => {
      setTimeout(this.showNextImage, 1000);
    });
  };

  showNextImage = () => {
    const { currentImage, images } = this.state;
    let imageToShow = currentImage + 1;
    if (imageToShow >= images.length) imageToShow = 0;

    setTimeout(
      () =>
        this.setState({ currentAnimation: 1, currentImage: imageToShow }, () =>
          setTimeout(() => this.setState({ currentImage: imageToShow }), 200)
        ),
      1000
    );

    setTimeout(this.changeImage, 8000);
  };

  render() {
    return (
      <div
        className={styles.container}
        onClick={() => this.props.history.push('/catalogs')}
      >
        <div className={`${styles.titleWprapper} animated fadeInLeft`}>
          <span className={styles.titleText}>Descargá</span>
          <span className={styles.titleText}>los catálogos</span>
          <span className={styles.titleText}>digitales</span>
          <span className={styles.titleText}>de Bosch</span>
        </div>

        <div className={styles.subtitleAndLineWrapper}>
          <div
            className={`${styles.subtitleWrapper} animated fadeInDown delay-1s`}
          >
            <span className={styles.subtitleText}>
              Tocá la pantalla para comenzar
            </span>
          </div>
          <div
            className={`${styles.lineWrapper} animated slideInRight delay-2s`}
          >
            <div className={styles.circle} />
            <div className={styles.line} />
            <div
              className={`${styles.catalogImageWrapper} animated ${
                this.state.animations[this.state.currentAnimation]
              }`}
            >
              <img
                className={styles.catalogImage}
                src={this.state.images[this.state.currentImage]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* 
<Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 1000, duration: 1000 }}
          >
            {props => ( */
