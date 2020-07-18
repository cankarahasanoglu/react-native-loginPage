import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  TextInput,
  UIManager,
  LayoutAnimation,
  Platform,
  Keyboard,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const renk1 = '#ff5948'; // 'red', 'rgb(100,50,90)', 'rgba(100,50,90,0.3)'
const renk2 = '#f8c41c';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
const and = Platform.OS === 'android';

const logo1 = require('./images/logo.png');

if (and) UIManager.setLayoutAnimationEnabledExperimental(true); //animasyonları aktif et (sadece android de gerekli)

class UI1 /**GENİŞLETMEK*/ extends React.Component {
  state = {
    sayfa: '',
    klavye: false,
    klavyeH: 0,
  };
  bizimState = {
    sayfa: '',
    klavyeH: 0,
    klavye: false,
  };

  bizimState2 = '';

  x = 8;

  bizimSetState(veri, fonksiyon) {
    if (!veri) return;

    console.log(this.bizimState);
    this.bizimState = {...this.bizimState, ...veri}; //state i kaydet

    setTimeout(() => this.forceUpdate(), 10); //ekranı güncelle

    if (fonksiyon) fonksiyon();
    console.log(this.bizimState);
  }

  bizimSetState2(str, fonksiyon) {
    if (!veri) return;

    this.bizimState2 = str;

    setTimeout(() => this.forceUpdate(), 10);

    if (fonksiyon) fonksiyon();
  }

  componentDidMount() {
    //render dan sonra çalışır, sadece bir kez çalışır
    console.log('componentDidMount');
    Keyboard.addListener(and ? 'keyboardDidShow' : 'keyboardWillShow', (e) => {
      console.log(e.endCoordinates.height);
      //this.setState({ klavye: true, klavyeH: e.endCoordinates.height });
      this.bizimSetState({klavye: true, klavyeH: e.endCoordinates.height});
    });

    Keyboard.addListener(and ? 'keyboardDidHide' : 'keyboardWillHide', () => {
      //this.setState({ klavye: false });
      this.bizimSetState({klavye: false});
    });
  }

  componentDidUpdate() {
    //ekran güncellendikten sonra önce render, sonra bu çalışır
    console.log('componentDidUpdate');
    LayoutAnimation.easeInEaseOut();
  }

  componentWillUnmount() {
    //bileşen devreden çıkarıldığında ya da öldürüldüğünde bu çalışır
    console.log('componentWillUnmount');
  }

  signUpOnPress = () => {
    //ARROW FUNCTION
    //this.setState({ sayfa: 'signUp' });
    this.bizimSetState({sayfa: 'signUp'});
    //console.log(sayfa);
    //this.forceUpdate();
  };
  signInOnPress = () => {
    //ARROW FUNCTION
    //this.setState({ sayfa: 'signIn' });
    this.bizimSetState({sayfa: 'signIn'});
    //console.log(sayfa);
    //this.forceUpdate();
  };

  butonlar() {
    return (
      <View
        style={[
          stil.buttonContainer,
          {
            height: this.bizimState.sayfa !== '' ? 0 : undefined,
          },
        ]}>
        <TouchableOpacity
          style={[stil.button, stil.signUpButton]}
          //onPress={() => { this.signUpOnPress(); }}
          onPress={this.signUpOnPress}>
          <Text style={stil.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[stil.button, stil.signInButton]}
          onPress={this.signInOnPress}>
          <Text style={stil.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  signUp() {
    return <Text>signUp</Text>;
  }
  signIn() {
    return (
      <View
        style={[
          stil.signInContainer,
          {
            marginBottom: H * (this.bizimState.klavye ? 0 : 0.1),
            height: this.bizimState.sayfa !== 'signIn' ? 0 : undefined,
          },
        ]}>
        <View style={stil.inputContainer}>
          <Text style={stil.inputCaption}>Kullanıcı Adı</Text>
          <TextInput style={stil.input} />
        </View>

        <View style={stil.inputContainer}>
          <Text style={stil.inputCaption}>Şifre</Text>
          <TextInput style={stil.input} />
        </View>

        <TouchableOpacity style={stil.passwordForgotbutton}>
          <Text style={[stil.inputCaption, stil.passwordForgot]}>
            Şifreni mi unuttun?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            stil.button,
            stil.loginButton,
            this.bizimState.klavye && stil.loginButtonKeyboard,
          ]}>
          <Text style={stil.loginButtonText}>Oturum Aç</Text>
        </TouchableOpacity>

        {!this.bizimState.klavye && (
          <>
            <TouchableOpacity style={[stil.button]}>
              <Text style={stil.veyaText}>- Ve Ya -</Text>
            </TouchableOpacity>

            <View style={stil.loginButtonContainer}>
              <TouchableOpacity style={[stil.button, stil.socialButton]}>
                <Text style={stil.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[stil.button, stil.socialButton]}>
                <Text style={stil.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }

  render() {
    //ekranda görünecek bileşenleri return eder (update olunca tekrar tekrar çalışır)
    /*return (
            <>
                <View style={{ height: getStatusBarHeight() }} />
                <StatusBar barStyle={'dark-content'} />
                <Text>test</Text>
            </>
        );
        */

    //setTimeout(() => this.forceUpdate(), 50);

    console.log('RENDER ÇALIŞTI');

    //console.log('statusBarHeight: ', StatusBar.currentHeight);

    //setTimeout(() => { this.forceUpdate(); }, 500);

    const a = {ad: 'nurettin', soyad: 'güngör'};
    const b = {...a, meslek: 'Bilgisayar Müh.'};
    const c = {...a, ...b};

    console.log('a', a);
    console.log('b', b);
    console.log('c', c);

    return (
      <>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />

        <TouchableOpacity
          style={stil.mainContainer}
          onPress={() => Keyboard.dismiss()}
          activeOpacity={1}>
          <View style={stil.topContainer}>
            <TouchableOpacity
              onPress={() => {
                //this.setState({ sayfa: '' });
                this.bizimSetState({sayfa: ''});
                Keyboard.dismiss();
              }}
              disabled={this.bizimState.sayfa === ''}>
              <Image
                source={logo1}
                //source={{ uri: 'https://www.vhv.rs/dpng/f/191-1917933_sample-png-images.png' }} //remote
                style={[
                  {
                    width: this.bizimState.klavye ? W * 0.2 : W * 0.5,
                    height: this.bizimState.klavye ? W * 0.2 : W * 0.5,
                    alignSelf: this.bizimState.klavye ? 'flex-start' : null,
                    marginLeft: this.bizimState.klavye ? W * 0.1 : null,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          <View style={stil.bottomContainer}>
            {/*
                        { this.bizimState.sayfa === '' && this.butonlar() }
                        {this.bizimState.sayfa === 'signUp' && this.signUp()}
                        {this.bizimState.sayfa === 'signIn' && this.signIn()}
                    */}

            {this.butonlar()}
            {/*this.signUp()*/}
            {this.signIn()}
          </View>
        </TouchableOpacity>

        <View
          style={{
            height:
              this.bizimState.klavye && !and ? this.bizimState.klavyeH : 0,
            width: W,
          }}
        />
      </>
    );
  }
}

const stil = StyleSheet.create({
  mainContainer: {
    backgroundColor: renk1,
    flex: 1,
  },

  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: W * 0.5,
    height: W * 0.5,
  },

  bottomContainer: {},

  buttonContainer: {
    height: H * 0.25,
    alignItems: 'center',
    overflow: 'hidden',
  },

  button: {
    width: W * 0.65,
    height: H * 0.05,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: W * 0.175,
  },
  signUpButton: {backgroundColor: 'white', marginBottom: H * 0.02},
  signInButton: {backgroundColor: renk2},

  signUpButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  signInButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },

  signInContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  inputContainer: {},
  input: {
    width: W * 0.8,
    borderBottomWidth: 1.5,
    borderColor: 'white',
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 0,
  },
  inputCaption: {
    color: renk2,
    fontWeight: 'bold',
  },
  passwordForgotbutton: {
    marginTop: 10,
    marginRight: W * 0.1,
    alignSelf: 'flex-end',
  },
  passwordForgot: {
    fontSize: 12,
  },

  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: W,
  },
  loginButton: {
    backgroundColor: renk2,
    marginTop: 15,
  },
  loginButtonKeyboard: {
    borderRadius: 0,
    width: W,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  veyaText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },

  socialButton: {
    backgroundColor: 'white',
    width: W * 0.3,
  },
  socialButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UI1;
