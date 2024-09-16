import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RoomOption from '../components/RoomOptions';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faCalendar} from '@fortawesome/free-regular-svg-icons/faCalendar';
import GoBackBtn from '../components/GoBackBtn';
import {Socket, SocketOptions, io} from 'socket.io-client';
import Sign from './Sign';
// import image from '../documents/guia.png';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import PDFReader from 'react-native-pdf';
import addSignatureToPDF from '../utils/addSignatureToPDF';
import getFieldSizes from '../utils/getFieldSize';
import Idle from './Idle';

const Home = () => {
  const {width} = Dimensions.get('window');
  const [pdfFile, setPdfFile] = useState('');
  const [openSign, setOpenSign] = useState(false);
  const [fieldSizes, setFieldSizes] = useState({});

  const navigation = useNavigation();
  // const ipgiulia = '192.168.1.11';
  const ipdanilo = '192.168.1.22';
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(`http://192.168.14.225:3000`);

    socket.current.on('connect', () => {
      console.log('Connected to server:');
    });

    socket.current.on('fileData', async file => {
      // Handle receiving the binary data (file) from server
      setPdfFile(file);
    });
  }, []);

  function sendGuide(signedPdf) {
    const data = {
      status: !!signedPdf,
      signedPdf,
    };
    socket.current?.emit('sendBackImage', data);
  }

  const confirmSign = async signature => {
    setOpenSign(false);
    const signedPdf = await addSignatureToPDF(pdfFile, signature);
    setPdfFile(signedPdf);
    sendGuide(signedPdf);

    setTimeout(() => {
      setPdfFile('');
    }, 3000);
  };

  const ref = useRef<SignatureViewRef>(null);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          display: 'flex',
          flex: 1,
        }}>
        {pdfFile ? (
          openSign ? (
            <View>
              <View style={{...styles.titleBox, width: width - 108}}>
                <Text style={{color: '#000', fontSize: 31}}>
                  Realize sua assinatura no espaço determinado
                </Text>
              </View>

              <View style={{height: 156}}>
                <SignatureScreen
                  ref={ref}
                  backgroundColor="#FFFFFF"
                  scrollable={false}
                  onOK={signature => confirmSign(signature)}
                  trimWhitespace
                />
              </View>
            </View>
          ) : (
            <PDFReader
              source={{
                uri: 'data:application/pdf;base64,' + pdfFile,
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onError={error => {
                console.error(error);
              }}
              style={styles.pdf}
            />
          )
        ) : (
          <Idle />
        )}
        {pdfFile && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={e =>
                openSign ? ref.current?.clearSignature() : sendGuide('')
              }>
              <Text style={{color: '#000', fontSize: 24}}>
                {openSign ? 'Refazer' : 'Cancelar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                openSign ? ref.current?.readSignature() : setOpenSign(!openSign)
              }>
              <Text style={{color: '#000', fontSize: 24}}>
                {openSign ? 'Confirmar' : 'Assinar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    // marginTop: 42,
    // paddingHorizontal: 100
  },
  signature: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 262,
  },
  button: {
    width: 235,
    height: 41,
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 35,
  },
  titleBox: {
    backgroundColor: '#eaeaea',
    borderRadius: 18,
    height: 116,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginBottom: 54,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 100,
  },
});

export default Home;
