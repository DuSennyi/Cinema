import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import CheckInformation from './CheckInformation';
import CheckInformationCam from './CheckInformationCam';
import CheckInformationCDHM from './CheckInformationCDHM';
import CheckInformationJoker from './CheckInformationJoker';
import CheckInformationCBCH from './CheckInformationCBCH';
import ComboScreen from './ComboScreen';
import ComboCamScreen from './ComboCamScreen';
import ComboCDHMScreen from './ComboCDHMScreen';
import ComboJokerScreen from './ComboJokerScreen';
import ComboCBCHScreen from './ComboCBCHScreen';
import Cam from './film/Cam';
import Captain from './film/Captain';
import CBCH from './film/CBCH';
import CDHM from './film/CDHM';
import CTBL from './film/CTBL';
import DiaDao from './film/DiaDao';
import Joker from './film/Joker';
import Mai from './film/Mai';
import Mufasa from './film/Mufasa';
import NhimSonic from './film/NhimSonic';
import FindCinemaScreen from './FindCinemaScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import LoginRepairScreen from './LoginRepairScreen';
import NewPassScreen from './NewPassScreen';
import PaymentDetails from './PaymentDetails';
import PaymentDetailsCam from './PaymentDetailsCam';
import PaymentDetailsCDHM from './PaymentDetailsCDHM';
import PaymentDetailsJoker from './PaymentDetailsJoker';
import PaymentDetailsCBCH from './PaymentDetailsCBCH';
import RegisterScreen from './RegisterScreen';
import SeatScreen from './SeatScreen';
import SeatCBCHScreen from './SeatCBCHScreen';
import SeatJokerScreen from './SeatJokerScreen';
import SeatCamScreen from './SeatCamScreen';
import SeatCDHMScreen from './SeatCDHMScreen';
import SelectVoucher from './SelectVoucher';
import SuccessScreen from './SuccessScreen';
import SuccessCamScreen from './SuccessCamScreen';
import SuccessJokerScreen from './SuccessJokerScreen';
import SuccessCBCHScreen from './SuccessCBCHScreen';
import SuccessCDHMScreen from './SuccessCDHMScreen';
import VerificationCodeScreen from './VerificationCodeScreen';
import VerificationCodeRepairScreen from './VerificationCodeRepairScreen';
import SelectShowTimesCamScreen from './SelectShowTimesCamScreen';
import SelectShowTimesCDHMScreen from './SelectShowTimesCDHMScreen';
import SelectShowTimesMaiScreen from './SelectShowTimesMaiScreen';
import SelectShowTimesCBCHScreen from './SelectShowTimesCBCHScreen';
import SelectShowTimesJokerScreen from './SelectShowTimesJokerScreen';
import MyTicketScreen from './MyTicketScreen';
const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 9000000); // Thời gian giữ màn hình splash (bạn có thể điều chỉnh)

        return () => clearTimeout(timer); // Dọn dẹp khi component unmount
    }, [navigation]);

    // Hàm xử lý khi người dùng nhấn nút để bỏ qua màn hình splash
    const skipSplashScreen = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            {/* Thay shape1 thành hình ảnh */}
            <Image
                source={require('./assets/Shape1.png')} // Đảm bảo bạn có file ảnh shape1.png trong thư mục assets
                style={styles.shape1}
            />
            <Image
                source={require('./assets/login/logo.png')}
                style={styles.logo}
            />
            {/* Thay shape2 thành hình ảnh */}
            <Image
                source={require('./assets/Shape2.png')} // Đảm bảo bạn có file ảnh shape2.png trong thư mục assets
                style={styles.shape2}
            />

            <Text style={styles.title}>deeps</Text>

            {/* Nút bỏ qua ở góc dưới bên phải */}
            <TouchableOpacity style={styles.skipButton} onPress={skipSplashScreen}>
                <Text style={styles.skipButtonText}>Get started !</Text>
            </TouchableOpacity>
        </View>
    );
};

const App = () => {


    return (
        <NavigationContainer>
             <StatusBar hidden={true} />
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LoginRepair" component={LoginRepairScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="VerificationCodeRepairScreen" component={VerificationCodeRepairScreen} options={{ headerShown: false }} />
                <Stack.Screen name="NewPass" component={NewPassScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="FindCinema" component={FindCinemaScreen} options={{ headerShown: false }}  />
                <Stack.Screen name="DiaDao" component={DiaDao} options={{ headerShown: false }} />
                <Stack.Screen name="NhimSonic" component={NhimSonic} options={{ headerShown: false }} />
                <Stack.Screen name="Captain" component={Captain} options={{ headerShown: false }} />
                <Stack.Screen name="CTBL" component={CTBL} options={{ headerShown: false }} />
                <Stack.Screen name="Mufasa" component={Mufasa} options={{ headerShown: false }} />
                <Stack.Screen name="CBCH" component={CBCH} options={{ headerShown: false }} />
                <Stack.Screen name="Joker" component={Joker} options={{ headerShown: false }} />
                <Stack.Screen name="Cam" component={Cam} options={{ headerShown: false }} />
                <Stack.Screen name="CDHM" component={CDHM} options={{ headerShown: false }} />
                <Stack.Screen name="Mai" component={Mai} options={{ headerShown: false }} />
                <Stack.Screen name="SelectShowTimesCam" component={SelectShowTimesCamScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SelectShowTimesMai" component={SelectShowTimesMaiScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SelectShowTimesCBCH" component={SelectShowTimesCBCHScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SelectShowTimesJoker" component={SelectShowTimesJokerScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SelectShowTimesCDHM" component={SelectShowTimesCDHMScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SeatScreen" component={SeatScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SeatCamScreen" component={SeatCamScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SeatJokerScreen" component={SeatJokerScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SeatCDHMScreen" component={SeatCDHMScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SeatCBCHScreen" component={SeatCBCHScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ComboScreen" component={ComboScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ComboCamScreen" component={ComboCamScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ComboCDHMScreen" component={ComboCDHMScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ComboJokerScreen" component={ComboJokerScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ComboCBCHScreen" component={ComboCBCHScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CheckInformation" component={CheckInformation} options={{ headerShown: false }} />
                <Stack.Screen name="CheckInformationCam" component={CheckInformationCam} options={{ headerShown: false }} />
                <Stack.Screen name="CheckInformationCDHM" component={CheckInformationCDHM} options={{ headerShown: false }} />
                <Stack.Screen name="CheckInformationJoker" component={CheckInformationJoker} options={{ headerShown: false }} />
                <Stack.Screen name="CheckInformationCBCH" component={CheckInformationCBCH} options={{ headerShown: false }} />
                <Stack.Screen name="MyTicket" component={MyTicketScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentDetails" component={PaymentDetails} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentDetailsCam" component={PaymentDetailsCam} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentDetailsCDHM" component={PaymentDetailsCDHM} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentDetailsJoker" component={PaymentDetailsJoker} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentDetailsCBCH" component={PaymentDetailsCBCH} options={{ headerShown: false }} />
                <Stack.Screen name="SelectVoucher" component={SelectVoucher} options={{ title: '           Chọn mã giảm giá' }} />
                <Stack.Screen name="SuccessScreen" component={SuccessScreen}  options={{ title: '            Đặt vé thành công' }} />
                <Stack.Screen name="SuccessCamScreen" component={SuccessCamScreen}  options={{ title: '            Đặt vé thành công' }} />
                <Stack.Screen name="SuccessCDHMScreen" component={SuccessCDHMScreen}  options={{ title: '            Đặt vé thành công' }} />
                <Stack.Screen name="SuccessJokerScreen" component={SuccessJokerScreen}  options={{ title: '            Đặt vé thành công' }} />
                <Stack.Screen name="SuccessCBCHScreen" component={SuccessCBCHScreen}  options={{ title: '            Đặt vé thành công' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
    },
    logo: {
        width: 200,
        height: 150,
        zIndex: 2, // Đảm bảo logo nằm trên các hình shape
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        zIndex: 2, // Đảm bảo tiêu đề nằm trên các hình shape
    },
    shape1: {
        position: 'absolute',
        width: 152,
        height: 190,
        top: 0, // Đặt hình ở góc trên cùng bên phải
        right: 0,
        zIndex: 1, // Đảm bảo hình shape nằm dưới logo và text
    },
    shape2: {
        position: 'absolute',
        width: 170,
        height: 169,
        bottom: 0, // Đặt hình ở góc dưới cùng bên trái
        left: 0,
        zIndex: 1, // Đảm bảo hình shape nằm dưới logo và text
    },
    skipButton: {
        position: 'absolute',
        bottom: 20, // Đặt nút cách phần dưới cùng của màn hình
        right: 20, // Đặt nút cách phần phải của màn hình
        backgroundColor: '#FFB900',
        paddingVertical: 9,
        paddingHorizontal: 10,
        borderRadius: 50,
        zIndex: 2, // Đảm bảo nút nằm trên cùng
    },
    skipButtonText: {
        fontSize: 16,
        color: 'black',
    },
});

export default App;
