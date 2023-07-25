import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import 'moment/locale/id';
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';


const MydetailMenu = ({ label, img, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        width: windowWidth / 4.5,
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <View style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.border,
        }}>
          <Image source={img} style={{
            width: 60,
            height: 60
          }} />
        </View>
        <View style={{
          marginTop: 5,
          height: 50,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: 13,
            textAlign: 'center',

          }}>{label}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}


export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const __getProduk = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'produk').then(res => {

      setData(res.data);
    });
    await axios.post(apiURL + 'company').then(res => {
      console.log(res.data);
      setComp(res.data.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      __getProduk();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.zavalabs,
          margin: 5,
        }}>
          <Image source={{
            uri: item.foto
          }} style={{
            width: '100%',
            height: 150,
          }} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 13
          }}>{item.nama_produk}</Text>
          <Text style={{
            fontFamily: fonts.primary[800],
            fontSize: 15,
            color: colors.secondary,
          }}>Rp. {new Intl.NumberFormat().format(item.harga_produk)}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: 11
          }}>{item.keterangan_produk}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>

      <MyHeader />
      <MyGap jarak={20} />
      <MyCarouser />
      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>


        <View style={{
          paddingHorizontal: '4%',
          justifyContent: 'space-around',
          flexDirection: 'row'
        }}>

          <MydetailMenu onPress={() => navigation.navigate('ProdukKategori', {
            menu: 'Pembelian Obat'
          })} label="Pembelian Obat" img={require('../../assets/a1.png')} />
          <MydetailMenu onPress={() => navigation.navigate('MenuWa', {
            menu: 'Diet dan Pola Makan',
            modul: 'diet'
          })} label="Diet & Pola Makan" img={require('../../assets/a2.png')} />
          <MydetailMenu onPress={() => navigation.navigate('MenuWa', {
            menu: 'Konseling Obat',
            modul: 'obat'

          })} label="Konseling Obat" img={require('../../assets/a3.png')} />



        </View>
        <View style={{
          paddingHorizontal: '4%',
          justifyContent: 'space-around',
          flexDirection: 'row'
        }}>

          <MydetailMenu onPress={() => navigation.navigate('Dokter', {
            menu: 'Konsultasi Dokter'
          })} label="Konsultasi Dokter" img={require('../../assets/a4.png')} />
          <MydetailMenu onPress={() => navigation.navigate('MenuWa', {
            menu: 'Hipnoterapi',
            modul: 'hipnoterapist'
          })} label="Hipnoterapi" img={require('../../assets/a5.png')} />
          <MydetailMenu onPress={() => navigation.navigate('MenuWa', {
            menu: 'Homecare Diabetes',
            modul: 'homecare'

          })} label="Homecare Diabetes" img={require('../../assets/a6.png')} />

        </View>
        <View style={{
          paddingHorizontal: '4%',
          justifyContent: 'space-around',
          flexDirection: 'row'
        }}>
          <MydetailMenu onPress={() => navigation.navigate('MenuWa', {
            menu: 'Pendampingan Minum Obat',
            modul: 'minum'
          })} label="Pendampingan Minum Obat" img={require('../../assets/a7.png')} />
          <MydetailMenu onPress={() => navigation.navigate('MenuWa', {
            menu: 'Hipnokhitan',
            modul: 'mombabycare'
          })} label="Hipnokhitan" img={require('../../assets/a8.png')} />
          <MydetailMenu onPress={() => {
            let urlWA = 'https://wa.me/' + comp.tlp + `?text=Saya mau *Layanan Pesan Antar*`;

            Linking.openURL(urlWA)
            console.log(urlWA)

          }} label="Layanan Pesan Antar" img={require('../../assets/a9.png')} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})