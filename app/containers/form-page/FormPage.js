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

    this.state = {
      email: '',
      name: '',
      businessType: '',
      businessName: '',
      province: '',
      locality: '',
      phone: '',
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
      }
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

    console.log(localities);
  }

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

  handleSubmit = () => {
    //TODO: validate form

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
        <div className={styles.keyboardInputTextWrapper}>
          <span className={styles.keyboardInputText}>
            {this.state[inputType] || this.state.inputPlaceholders[inputType]}
          </span>
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
      showForm,
      inputType,
      selectedInputValue
    } = this.state;

    return (
      <div className={styles.container}>
        <Header step={2} />
        <div className={styles.wrapper}>
          {showForm ? (
            <div className={styles.formWrapper}>
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
                <div className={styles.inputWrapper}>
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
                <div className={styles.inputWrapper}>
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
