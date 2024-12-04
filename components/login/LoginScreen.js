import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        return phoneRegex.test(number);
    };

    const handleLogin = () => {
        const predefinedUser = {
            phoneNumber: '0387813695', // Số điện thoại mặc định
            password: '12345678', // Mật khẩu mặc định
        };
    
        if (validatePhoneNumber(phoneNumber)) {
            if (phoneNumber === predefinedUser.phoneNumber && password === predefinedUser.password) {
                // Chuyển hướng sang HomeScreen sau khi đăng nhập thành công
                navigation.navigate('Home');
            } else {
                Alert.alert('Lỗi', 'Số điện thoại hoặc mật khẩu không đúng.');
            }
        } else {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hợp lệ (bắt đầu bằng 03, 05, 07, 08, hoặc 09 và đủ 10 số).');
        }
    };

    return (
        <View style={styles.outerContainer}>
            <Text style={[styles.title, { fontWeight: 'bold' }]}>deeps xin chào!!!</Text>
            <Text style={styles.subtitle}>
                Chào mừng bạn đến với ứng dụng đặt vé xem phim của chúng tôi!
            </Text>
            <View style={styles.innerContainer}>
                <Text style={[styles.loginTitle, { fontWeight: 'bold' }]}>Đăng nhập</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số điện thoại của bạn"
                    placeholderTextColor="#9C9999"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#9C9999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                    <Text style={styles.createAccountText}>Tạo tài khoản mới? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signupLink}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#FFB900',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        position: 'absolute',
        top: 125,
        left: 28,
        right: 20,
        color: 'black',
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
        position: 'absolute',
        top: 155,
        left: 28,
        right: 20,
        color: 'black',
    },
    innerContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: '100%',
        height: '60%',
        paddingHorizontal: 40,
        paddingVertical: 17,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
    },
    loginTitle: {
        fontSize: 30,
        marginVertical: 5,
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
    },
    input: {
        height: 55,
        borderColor: '#A8A8A8',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#FDFDFD',
        width: '100%',
        maxWidth: 300,
    },
    loginButton: {
        height: 55,
        backgroundColor: 'black',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 300,
        marginVertical: 9,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        textAlign: 'center',
        marginVertical: 3,
        color: '#223579',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80,
    },
    createAccountText: {
        fontSize: 15,
        color: 'black',
        marginVertical: 15,
    },
    signupLink: {
        fontSize: 15,
        color: '#223579',
        marginVertical: 15,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
