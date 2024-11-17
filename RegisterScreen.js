import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        // Kiểm tra nếu mật khẩu và mật khẩu xác nhận không khớp
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu không khớp.');
            return;
        }

        // Kiểm tra thông tin đã nhập
        if (!email || !phoneNumber) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            // Gửi OTP qua backend (cần implement backend gửi OTP)
            // Ví dụ gửi OTP qua API
            const response = await fetch('http://localhost:3000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phoneNumber }),
            });

            const data = await response.json();
            if (data.success) {
                // Chuyển hướng tới màn hình xác minh mã OTP
                navigation.navigate('VerificationCode', { email, phoneNumber });
            } else {
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            Alert.alert('Lỗi', 'Không thể gửi OTP. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.outerContainer}>
            <Text style={[styles.title, { fontWeight: 'bold' }]}>deeps xin chào!!!</Text>
            <View style={styles.innerContainer}>
                <Text style={[styles.loginTitle, { fontWeight: 'bold' }]}>Đăng ký</Text>
                
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
                    placeholder="Nhập email của bạn"
                    placeholderTextColor="#9C9999"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#9C9999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor="#9C9999"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                
                <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>
                
                <View style={styles.signupContainer}>
                    <Text style={styles.createAccountText}>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signupLink}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


// Các kiểu dáng cho các thành phần
const styles = StyleSheet.create({
    // Container chính của màn hình
    outerContainer: {
        flex: 1, // Chiếm toàn bộ không gian
        backgroundColor: '#FFB900', // Nền màu vàng
        alignItems: 'center', // Căn giữa các thành phần theo chiều ngang
        justifyContent: 'center', // Căn giữa tất cả các thành phần theo chiều dọc
    },
    // Tiêu đề chào mừng
    title: {
        fontSize: 30, // Kích thước chữ
        fontWeight: 'normal', // Độ dày chữ
        textAlign: 'left', // Căn trái
        position: 'absolute', // Đặt vị trí tuyệt đối
        top: 125, // Khoảng cách từ đầu màn hình
        left: 28, // Khoảng cách từ bên trái
        right: 20, // Khoảng cách từ bên phải
        color: 'black', // Màu chữ
    },
    // Container chứa các thành phần đăng ký
    innerContainer: {
        backgroundColor: 'white', // Nền màu trắng
        borderTopLeftRadius: 60, // Bo tròn góc trái trên
        borderTopRightRadius: 60, // Bo tròn góc phải trên
        width: '100%', // Chiều rộng 100%
        height: '70%', // Chiều cao 60%
        paddingHorizontal: 40, // Khoảng cách bên trong theo chiều ngang
        paddingVertical: 17, // Khoảng cách bên trong theo chiều dọc
        position: 'absolute', // Đặt vị trí tuyệt đối
        bottom: 0, // Đặt ở đáy màn hình
        alignItems: 'center', // Căn giữa các thành phần theo chiều ngang
    },
    // Tiêu đề của màn hình đăng ký
    loginTitle: {
        fontSize: 30, // Kích thước chữ
        marginVertical: 5, // Khoảng cách dọc
        marginBottom: 15, // Khoảng cách dưới
        textAlign: 'center', // Căn giữa
        color: 'black', // Màu chữ
    },
    // Thanh điền thông tin
    input: {
        height: 55, // Chiều cao trường nhập
        borderColor: '#A8A8A8', // Màu viền cho input
        borderWidth: 1, // Độ dày viền
        borderRadius: 30, // Bo tròn các góc
        paddingHorizontal: 20, // Khoảng cách bên trong theo chiều ngang
        marginVertical: 7, // Khoảng cách dọc giữa các trường nhập
        backgroundColor: '#FDFDFD', // Màu nền cho các trường nhập
        width: '100%', // Chiều rộng 100%
        maxWidth: 300, // Chiều rộng tối đa
    },
    // Nút đăng ký
    loginButton: {
        height: 55, // Chiều cao của nút
        backgroundColor: 'black', // Màu nền của nút
        borderRadius: 30, // Bo tròn các góc
        alignItems: 'center', // Căn giữa nội dung theo chiều ngang
        justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
        width: '100%', // Chiều rộng 100%
        maxWidth: 300, // Chiều rộng tối đa
        marginVertical: 7, // Khoảng cách dọc giữa các nút
    },
    // Văn bản trên nút đăng ký
    buttonText: {
        color: 'white', // Màu chữ
        fontSize: 16, // Kích thước chữ
        fontWeight: 'bold',
    },
    // Container cho phần tạo tài khoản
    signupContainer: {
        flexDirection: 'row', // Căn hàng ngang cho văn bản
        justifyContent: 'center', // Căn giữa theo chiều ngang
        marginTop: 80, // Khoảng cách trên
    },
    // Văn bản hỏi người dùng đã có tài khoản chưa
    createAccountText: {
        fontSize: 15, // Kích thước chữ
        color: 'black', // Màu chữ
        marginVertical: -7, // Khoảng cách dọc
        textDecorationLine: 'underline', // Gạch chân
    },
    // Liên kết đến trang đăng nhập
    signupLink: {
        fontSize: 15, // Kích thước chữ
        color: '#223579', // Màu chữ cho liên kết
        marginVertical: -7, // Khoảng cách dọc
        textDecorationLine: 'underline', // Gạch chân
    },
});

export default RegisterScreen;
