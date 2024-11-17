import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
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
                    <Text style={[styles.title]}>Quên mật khẩu</Text>
                </View>
                
                <View style={styles.iconContainer}>
                    <Image 
                        source={require('./assets/forgotpass.png')} // Đường dẫn đến hình ảnh khóa
                        style={styles.lockIcon}
                    />
                </View>
                <Text style={[styles.instructionText, { fontWeight: 'bold' }]}>
                    Vui lòng nhập số điện thoại của bạn để nhận mã xác minh
                </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholderTextColor="#A8A8A8" // Màu sắc placeholder
                />
                {/* Thêm View chứa nút để căn giữa */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.submitButton} 
                        onPress={() => navigation.navigate('VerificationCode')} // Chuyển đến màn hình VerificationCodeScreen
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
        flex: 1, // Chiếm toàn bộ không gian
        backgroundColor: 'white', // Màu nền trắng
    },
    scrollContainer: {
        flexGrow: 1, // Cho phép ScrollView chiếm toàn bộ không gian
        padding: 50, // Khoảng cách bên trong
        justifyContent: 'center', // Căn giữa theo chiều dọc
    },
    // Header chứa nút quay lại và tiêu đề
    header: {
        width: '100%', // Chiếm toàn bộ chiều ngang
        flexDirection: 'row', // Sắp xếp theo hàng ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
        justifyContent: 'center', // Căn giữa tiêu đề
        paddingVertical: 10, // Khoảng cách dọc hợp lý cho header
        marginBottom: 20, // Khoảng cách dưới header
        position: 'relative', // Để sử dụng absolute cho nút quay lại
    },
    backButton: {
        position: 'absolute', // Đặt vị trí tuyệt đối
        left: -25, // Đẩy nút quay lại sát lề trái
    },
    backButtonImage: {
        width: 23, // Kích thước hình ảnh nút quay lại
        height: 23,
    },
    title: {
        fontSize: 30, // Kích thước font cho tiêu đề
        textAlign: 'center', // Căn giữa tiêu đề
    },
    iconContainer: {
        borderRadius: 100, // Tạo hình tròn cho container
        padding: 10, // Khoảng cách bên trong cho hình tròn
        marginBottom: 30, // Khoảng cách dưới hình tròn
        alignItems: 'center', // Căn giữa nội dung bên trong
    },
    lockIcon: {
        width: 250, // Đặt chiều rộng cho hình khóa
        height: 250, // Đặt chiều cao cho hình khóa
    },
    instructionText: {
        textAlign: 'center', // Căn giữa văn bản
        marginBottom: 20, // Khoảng cách dưới văn bản
        color: 'black', // Màu chữ đen
        fontSize: 17, // Kích thước font cho văn bản hướng dẫn
    },
    input: {
        height: 100, // Giữ nguyên chiều cao của input
        borderBottomColor: '#9C9999', // Màu cho đường kẻ dưới input
        borderBottomWidth: 1, // Độ dày cho đường kẻ dưới
        paddingVertical: 9, // Đặt padding dọc về 0 để sát mép
        paddingHorizontal: 5, // Khoảng cách ngang
        marginVertical: 10, // Khoảng cách dọc giữa các input
        width: '100%', // Chiều rộng 100% của container
        maxWidth: 300, // Chiều rộng tối đa là 300px
        backgroundColor: 'transparent', // Đảm bảo nền input trong suốt
        fontSize: 16, // Kích thước chữ để phù hợp với chiều cao
        textAlignVertical: 'bottom', // Đưa văn bản về phía dưới của trường nhập
    },
    
    buttonContainer: {
        flex: 1, // Chiếm toàn bộ không gian
        justifyContent: 'flex-end', // Đẩy nút xuống phía dưới
        alignItems: 'center', // Căn giữa nút
        marginBottom: 15, // Khoảng cách dưới cho nút
    },
    submitButton: {
        height: 32, // Chiều cao của nút gửi
        width: 100, // Chiều rộng
        backgroundColor: 'black', // Màu nền cho nút gửi
        borderRadius: 16, // Làm tròn các góc của nút, giảm bán kính để tương ứng với kích thước
        alignItems: 'center', // Căn giữa các nội dung bên trong nút
        justifyContent: 'center', // Căn giữa theo chiều dọc bên trong nút
        marginVertical: 50, // Khoảng cách dọc giữa các nút
    },
    buttonText: {
        color: 'white', // Màu chữ cho văn bản nút
        fontSize: 14, // Kích thước font cho văn bản nút
    },
});

export default ForgotPasswordScreen;
