import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const VerificationCodeRepairScreen = ({ navigation, route }) => {
    const [code, setCode] = useState(['', '', '', '']); // Mảng chứa mã OTP
    const { otp } = route.params || {}; // Nhận mã OTP từ màn hình trước

    // Cập nhật mã OTP khi màn hình được tải
    useEffect(() => {
        if (otp) {
            const otpArray = otp.split(''); // Chuyển OTP thành mảng ký tự
            setCode(otpArray); // Điền OTP vào các ô nhập
        }
    }, [otp]);

    const handleInputChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text; // Cập nhật ký tự tại vị trí index
        setCode(newCode);

        // Tự động chuyển sang ô tiếp theo nếu ô hiện tại được điền
        if (text && index < 3) {
            const nextInput = index + 1;
            const nextInputRef = refs[nextInput];
            if (nextInputRef) nextInputRef.focus();
        }

        // Tự động chuyển về ô trước nếu ô hiện tại bị xóa
        if (!text && index > 0) {
            const previousInput = index - 1;
            const previousInputRef = refs[previousInput];
            if (previousInputRef) previousInputRef.focus();
        }
    };

    // Tạo tham chiếu cho từng ô nhập
    const refs = [];

    const handleSubmit = () => {
        const enteredOTP = code.join(''); // Kết hợp các ô nhập thành một chuỗi OTP
        if (enteredOTP === otp) {
            navigation.navigate('NewPass'); // Chuyển đến màn hình đặt mật khẩu mới
        } else {
            alert('Mã OTP không đúng. Vui lòng thử lại!');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header chứa nút quay lại và tiêu đề */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image
                            source={require('./assets/back.png')} // Đường dẫn đến hình ảnh nút quay lại
                            style={styles.backButtonImage} // Kích thước hình ảnh
                        />
                    </TouchableOpacity>
                    <Text style={[styles.title]}>Nhập mã xác minh</Text>
                </View>

                <View style={styles.iconContainer}>
                    <Image
                        source={require('./assets/OTP.png')} // Đường dẫn đến hình ảnh khóa
                        style={styles.lockIcon}
                    />
                </View>
                <Text style={[styles.instructionText, { fontWeight: 'bold' }]}>
                    Vui lòng nhập mã xác minh được gửi về số điện thoại của bạn
                </Text>

                {/* Các ô nhập mã OTP */}
                <View style={styles.otpContainer}>
                    {code.map((item, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (refs[index] = ref)} // Gán tham chiếu cho từng ô nhập
                            style={styles.input}
                            keyboardType="phone-pad"
                            maxLength={1}
                            value={item}
                            onChangeText={(text) => handleInputChange(text, index)} // Cập nhật mã khi nhập
                        />
                    ))}
                </View>

                {/* Chữ "gửi lại mã" dưới ô nhập OTP */}
                <TouchableOpacity
                    onPress={() => console.log('Gửi lại mã')}
                    style={styles.resendCodeContainer}
                >
                    <Text style={styles.resendCodeText}>Gửi lại mã</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit} // Gửi mã để xác minh
                    >
                        <Text style={styles.buttonText}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Chiếm toàn bộ không gian có sẵn
        backgroundColor: 'white', // Màu nền của toàn bộ màn hình
    },
    scrollContainer: {
        flexGrow: 1, // Cho phép cuộn thêm nếu nội dung lớn hơn không gian có sẵn
        padding: 50, // Khoảng cách bên trong (padding) cho toàn bộ nội dung
        justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
    },
    header: {
        width: '100%', // Chiều rộng 100% của phần đầu
        flexDirection: 'row', // Đặt các phần tử con theo hàng
        alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
        justifyContent: 'center', // Căn giữa các phần tử theo chiều ngang
        paddingVertical: 10, // Khoảng cách bên trên và dưới của phần đầu
        marginBottom: 20, // Khoảng cách bên dưới của phần đầu
        position: 'relative', // Để có thể đặt các phần tử con ở vị trí tuyệt đối nếu cần
    },
    backButton: {
        position: 'absolute', // Đặt vị trí tuyệt đối để có thể đặt nút quay lại bên trái
        left: -25, // Đẩy nút sang trái
    },
    backButtonImage: {
        width: 24, // Chiều rộng của hình ảnh nút quay lại
        height: 24, // Chiều cao của hình ảnh nút quay lại
    },
    title: {
        fontSize: 30, // Kích thước chữ cho tiêu đề
        textAlign: 'center', // Căn giữa tiêu đề
    },
    iconContainer: {
        borderRadius: 100, // Làm tròn góc hình chứa biểu tượng
        padding: 10, // Khoảng cách bên trong cho hình chứa biểu tượng
        marginBottom: 30, // Khoảng cách bên dưới của hình chứa biểu tượng
        alignItems: 'center', // Căn giữa các phần tử bên trong hình chứa
    },
    lockIcon: {
        width: 250, // Chiều rộng của biểu tượng khóa
        height: 250, // Chiều cao của biểu tượng khóa
    },
    instructionText: {
        textAlign: 'center', // Căn giữa văn bản hướng dẫn
        marginBottom: 40, // Khoảng cách bên dưới văn bản hướng dẫn
        color: 'black', // Màu chữ cho văn bản hướng dẫn
        fontSize: 17, // Kích thước chữ cho văn bản hướng dẫn
    },
    otpContainer: {
        flexDirection: 'row', // Đặt các ô nhập theo hàng
        justifyContent: 'space-between', // Khoảng cách đều giữa các ô nhập
        marginBottom: 20, // Khoảng cách bên dưới các ô nhập
    },
    input: {
        height: 55, // Chiều cao của ô nhập
        width: 55, // Chiều rộng của ô nhập
        borderColor: '#FFB900', // Màu viền của ô nhập (màu vàng)
        borderWidth: 2, // Độ dày của viền ô nhập
        backgroundColor: '#FFFBEB', // Màu nền của ô nhập (màu vàng nhạt)
        borderRadius: 10, // Làm tròn góc cho ô nhập
        fontSize: 24, // Kích thước chữ bên trong ô nhập
        textAlign: 'center', // Căn giữa chữ bên trong ô nhập
        padding: 5, // Khoảng cách bên trong ô nhập
        marginHorizontal: 5, // Khoảng cách bên trái và phải giữa các ô nhập
    },
    resendCodeContainer: {
        marginBottom: 20, // Khoảng cách bên dưới chữ "gửi lại mã"
        alignItems: 'center', // Căn giữa chữ
    },
    resendCodeText: {
        color: '#FE6004', // Màu chữ cho chữ "gửi lại mã"
        textDecorationLine: 'underline', // Gạch chân chữ
        fontSize: 14, // Kích thước chữ cho chữ "gửi lại mã"
    },
    buttonContainer: {
        flex: 1, // Chiếm không gian còn lại
        justifyContent: 'flex-end', // Căn dưới cùng của màn hình
        alignItems: 'center', // Căn giữa các phần tử bên trong
        marginBottom: 15, // Khoảng cách bên dưới của phần chứa nút
    },
    submitButton: {
        height: 32, // Chiều cao của nút gửi
        width: 100, // Chiều rộng của nút gửi
        backgroundColor: 'black', // Màu nền của nút gửi
        borderRadius: 16, // Làm tròn góc cho nút gửi
        alignItems: 'center', // Căn giữa các phần tử bên trong nút
        justifyContent: 'center', // Căn giữa nội dung bên trong nút
        marginVertical: 10, // Khoảng cách dọc giữa các nút
    },
    buttonText: {
        color: 'white', // Màu chữ cho nút gửi
        fontSize: 14, // Kích thước chữ cho nút gửi
    },
});

export default VerificationCodeRepairScreen;
