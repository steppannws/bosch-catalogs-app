// @flow
import React, { Component } from 'react';
import shoetest from 'shoetest';
import Header from '../../components/header';
import styles from './styles.css';
import images from '../../static/images';
import Keyboard from '../../components/keyboard';
import Button from '../../components/button';
import localities from '../../static/data/arg-localities.json';

type Props = {};

export default class FormPage extends Component {
  props: Props;

  constructor(props) {
    super(props);

    const {
      history: {
        location: {
          state = {} // { catalogs = [] }
        }
      }
    } = props;

    this.state = {
      email: '',
      name: '',
      businessType: '',
      businessName: '',
      province: '',
      locality: '',
      phone: '',
      catalogs: state.catalogs || [],
      showForm: true,
      inputType: '',
      selectedInputValue: '',
      localitiesResults: [],
      inputPlaceholders: {
        name: 'Nombre y Apellido',
        email: 'Mail',
        businessType: 'Tipo de Comercio',
        businessName: 'Razón Social',
        province: 'Provincia',
        locality: 'Localidad',
        phone: 'Celular'
      },
      errorText: ''
    };

    this.spanishKeyboard = {
      default: [
        "\u007c 1 2 3 4 5 6 7 8 9 0 ' \u00bf {bksp}",
        '{tab} q w e r t y u i o p \u0301 +',
        '{lock} a s d f g h j k l \u00f1 \u007b \u007d {enter}',
        '{shift} < z x c v b n m , . - {shift}',
        '.com @ {space}'
      ],
      shift: [
        '\u00b0 ! " # $ % & / ( ) = ? \u00a1 {bksp}',
        '{tab} Q W E R T Y U I O P \u0308 *',
        '{lock} A S D F G H J K L \u00d1 \u005b \u005d {enter}',
        '{shift} > Z X C V B N M ; : _ {shift}',
        '.com @ {space}'
      ]
    };

    this.businessTypes = [
      'Casa de Repuestos',
      'Distribuidor',
      'Taller',
      'Centro de Baterías',
      'Talleres Red Bosch',
      'Lubricentro',
      'Otros'
    ];
  }

  componentDidMount = () => {};

  searchLocalityName = searchWord => {
    const province = localities.find(
      province => this.state.province === province.province
    );

    if (province)
      return province.localities.filter(locality =>
        shoetest.test(searchWord, locality.name)
      );

    return [];
  };

  isEmailValid = email => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  };

  idPhoneValid = phone => {
    const reg = /^\d+$/;
    return reg.test(String(phone));
  };

  handleSubmit = () => {
    // TODO: validate form

    console.log('SUBMIT');

    const {
      email,
      name,
      businessType,
      businessName,
      province,
      locality,
      phone,
      catalogs
    } = this.state;

    if (!this.idPhoneValid(phone)) {
      this.setState({ errorText: 'Nnúmero de Celular no valido' });
      return;
    }

    if (name === '') {
      this.setState({ errorText: 'Ingrese Nombre y Apellido' });
      return;
    }

    if (!this.isEmailValid(email)) {
      this.setState({ errorText: 'Ingrese Mail' });
      return;
    }

    if (email === '') {
      this.setState({ errorText: 'No es una cuenta válida' });
      return;
    }

    if (businessType === '') {
      this.setState({ errorText: 'Selecciona Tipo de Comercio' });
      return;
    }

    if (businessName === '') {
      this.setState({ errorText: 'Ingresa Razón Social' });
      return;
    }

    if (province === '') {
      this.setState({ errorText: 'Selecciona Provincia' });
      return;
    }

    if (locality === '') {
      this.setState({ errorText: 'Selecciona Localidad' });
      return;
    }

    if (phone === '') {
      this.setState({ errorText: 'Ingresa Celular' });
      return;
    }

    this.setState({ errorText: '' });

    const formData = {
      email,
      name,
      businessType,
      businessName,
      province,
      locality,
      phone,
      catalogs: catalogs.toString()
    };

    fetch('http://dooplerstudio.com/step/bosch/sendcatalogue.php', {
      method: 'post',
      body: JSON.stringify(formData)
    });

    this.props.history.push('/final');
  };

  handleInputClick = inputType => {
    this.setState({ showForm: false, inputType });
  };

  handleItemSelect = (inputType, value) => {
    this.setState({ showForm: true, [inputType]: value });
  };

  onChange = input => {
    // console.log('Input changed', input);
    this.setState({ [this.state.inputType]: input });

    if (this.state.inputType === 'locality') {
      this.setState({ localitiesResults: this.searchLocalityName(input) });
    }
    //
  };

  onKeyPress = button => {
    // console.log('Button pressed', button);
    if (button === '{enter}') {
      this.setState({ showForm: true });
    }
  };

  renderInputComponent = () => {
    const { inputType } = this.state;

    const inputWithKeyboard = (
      <div className={styles.keyboardWrapper}>
        <div className={styles.keyboardInputTextContainer}>
          <div className={styles.keyboardInputTextWrapper}>
            <span className={styles.keyboardInputText}>
              {this.state[inputType] || this.state.inputPlaceholders[inputType]}
            </span>
          </div>
        </div>

        <div className={styles.keyboard}>
          <Keyboard
            onChange={input => this.onChange(input)}
            onKeyPress={button => this.onKeyPress(button)}
            layout={this.spanishKeyboard}
          />
        </div>
      </div>
    );

    const inputWithBusinessTypes = (
      <div className={styles.selectablesWrapper}>
        <div className={styles.keyboardInputTextWrapper}>
          <span className={styles.keyboardInputText}>
            {this.state[inputType] || this.state.inputPlaceholders[inputType]}
          </span>
        </div>

        <div className={styles.selectableItemsWrapper}>
          {this.businessTypes.map(item => (
            <div
              className={styles.selectableItemTextWrapper}
              onClick={() => this.handleItemSelect(inputType, item)}
            >
              <span className={styles.selectableItemText}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );

    const inputWithProvinces = (
      <div className={styles.selectablesWrapper}>
        <div className={styles.keyboardInputTextWrapper}>
          <span className={styles.keyboardInputText}>
            {this.state[inputType] || this.state.inputPlaceholders[inputType]}
          </span>
        </div>

        <div className={styles.selectableProvinceWrapper}>
          {localities.map(item => (
            <div
              className={styles.selectableItemTextWrapper}
              onClick={() => this.handleItemSelect(inputType, item.province)}
            >
              <span className={styles.selectableItemText}>{item.province}</span>
            </div>
          ))}
        </div>
      </div>
    );

    const inputWithLocalities = (
      <div className={styles.keyboardWrapper}>
        <div className={styles.keyboardInputTextContainer}>
          <div className={styles.keyboardInputTextWrapper}>
            <span className={styles.keyboardInputText}>
              {this.state[inputType] || this.state.inputPlaceholders[inputType]}
            </span>
          </div>

          <div className={styles.selectableItemsWrapper}>
            {this.state.localitiesResults.slice(0, 3).map(item => (
              <div
                className={styles.selectableItemTextWrapper}
                onClick={() => this.handleItemSelect(inputType, item.name)}
              >
                <span className={styles.selectableItemText}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.keyboard}>
          <Keyboard
            onChange={input => this.onChange(input)}
            onKeyPress={button => this.onKeyPress(button)}
            layout={this.spanishKeyboard}
          />
        </div>
      </div>
    );

    if (inputType === 'businessType') {
      return inputWithBusinessTypes;
    }

    if (inputType === 'province') {
      return inputWithProvinces;
    }

    if (inputType === 'locality') {
      return inputWithLocalities;
    }

    return inputWithKeyboard;
  };

  render() {
    const {
      name,
      email,
      businessType,
      businessName,
      province,
      locality,
      phone,
      inputPlaceholders,
      showForm
      // inputType,
      // selectedInputValue
    } = this.state;

    return (
      <div className={styles.container}>
        <Header step={2} />
        <div className={styles.wrapper}>
          {showForm ? (
            <div className={`${styles.formWrapper} animated fadeIn`}>
              <div className={styles.leftColumn}>
                <div
                  className={styles.inputWrapper}
                  onClick={() => this.handleInputClick('name')}
                >
                  <span
                    className={
                      name === '' ? styles.inputText : styles.inputTextWithValue
                    }
                  >
                    {name === '' ? inputPlaceholders.name : name}
                  </span>
                </div>
                <div
                  className={styles.inputWrapper}
                  onClick={() => this.handleInputClick('email')}
                >
                  <span
                    className={
                      email === ''
                        ? styles.inputText
                        : styles.inputTextWithValue
                    }
                  >
                    {email === '' ? inputPlaceholders.email : email}
                  </span>
                </div>
                <div
                  className={styles.inputWrapper}
                  onClick={() => this.handleInputClick('province')}
                >
                  <span
                    className={
                      province === ''
                        ? styles.inputText
                        : styles.inputTextWithValue
                    }
                  >
                    {province === '' ? inputPlaceholders.province : province}
                  </span>
                  <img
                    src={images.ARROW_DOWN_ICON}
                    className={styles.arrowIcon}
                  />
                </div>
                <div
                  className={styles.inputWrapper}
                  onClick={() => this.handleInputClick('locality')}
                >
                  <span
                    className={
                      locality === ''
                        ? styles.inputText
                        : styles.inputTextWithValue
                    }
                  >
                    {locality === '' ? inputPlaceholders.locality : locality}
                  </span>
                  <img src={images.SEARCH_ICON} className={styles.arrowIcon} />
                </div>
              </div>

              <div className={styles.rightColumn}>
                <div
                  className={styles.inputWrapper}
                  onClick={() => this.handleInputClick('businessType')}
                >
                  <span
                    className={
                      businessType === ''
                        ? styles.inputText
                        : styles.inputTextWithValue
                    }
                  >
                    {businessType === ''
                      ? inputPlaceholders.businessType
                      : businessType}
                  </span>
                  <img
                    src={images.ARROW_DOWN_ICON}
                    className={styles.arrowIcon}
                  />
                </div>
                <div
                  className={styles.inputWrapper}
                  onClick={() => this.handleInputClick('businessName')}
                >
                  <span
                    className={
                      businessName === ''
                        ? styles.inputText
                        : styles.inputTextWithValue
                    }
                  >
                    {businessName === ''
                      ? inputPlaceholders.businessName
                      : businessName}
                  </span>
                </div>
                <div
                  className={styles.inputWrapper}
                  onClick={() => this.handleInputClick('phone')}
                >
                  <span
                    className={
                      phone === ''
                        ? styles.inputText
                        : styles.inputTextWithValue
                    }
                  >
                    {phone === '' ? inputPlaceholders.phone : phone}
                  </span>
                </div>
              </div>
              <div className={styles.errorWrapper}>
                <span className={styles.errorText}>{this.state.errorText}</span>
              </div>
            </div>
          ) : (
            this.renderInputComponent()
          )}

          <div className={styles.bottomWrapper}>
            <div className={styles.logoWrapper}>
              <img className={styles.logo} src={images.LOGO} />
            </div>
            <div className={styles.buttonsWrapper}>
              <Button
                title="Anterior"
                onClick={() => this.props.history.push('/catalogs')}
              />
              <Button title="Siguiente" onClick={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
