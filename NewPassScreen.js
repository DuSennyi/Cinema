import React from 'react';
import { Image, StatusBar, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const NewPassScreen = ({ navigation }) => {
    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="light-content" backgroundColor="#000" hidden={false}/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header chứa nút quay lại và tiêu đề */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image 
                            source={require('./assets/back.png')} // Đường dẫn đến hình ảnh nút quay lại
                            style={styles.backButtonImage} // Kích thước hình ảnh
                        />
                    </TouchableOpacity>
                    <Text style={[styles.title]}>Tạo mật khẩu mới</Text>
                </View>
                
                <View style={styles.iconContainer}>
                    <Image 
                        source={require('./assets/forgotpass.png')} // Đường dẫn đến hình ảnh khóa
                        style={styles.lockIcon}
                    />
                </View>
                <Text style={[styles.instructionText, { fontWeight: 'bold' }]} >
                    Mật khẩu mới phải khác với mật khẩu trước đó
                </Text>

                {/* Nhập mật khẩu mới */}
                <TextInput
                    style={styles.newPasswordInput}
                    secureTextEntry // Ẩn mật khẩu khi nhập
                    placeholder="Nhập mật khẩu mới" // Placeholder cho trường nhập
                    placeholderTextColor="#B0B0B0" // Màu sắc placeholder
                />
                
                {/* Nhập lại mật khẩu */}
                <TextInput
                    style={styles.confirmPasswordInput}
                    secureTextEntry // Ẩn mật khẩu khi nhập
                    placeholder="Nhập lại mật khẩu" // Placeholder cho trường nhập
                    placeholderTextColor="#B0B0B0" // Màu sắc placeholder
                />

                {/* Thêm View chứa nút để căn giữa */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.submitButton} 
                        onPress={() => navigation.navigate('LoginRepair')} // Chuyển đến màn hình VerificationCodeScreen
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
        width: 24, // Kích thước hình ảnh nút quay lại
        height: 24,
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
        marginBottom: -10, // Giảm khoảng cách dưới văn bản
        color: 'black', // Màu chữ đen
        fontSize: 17, // Giảm kích thước font cho văn bản hướng dẫn
        paddingHorizontal: 30, // Giảm padding hai bên
    },
    newPasswordInput: {
        height: 100, // Chiều cao của input mới
        borderBottomColor: '#9C9999', // Màu cho đường kẻ dưới input
        borderBottomWidth: 1, // Độ dày cho đường kẻ dưới
        paddingVertical: 5, // Giảm padding dọc
        width: '100%', // Chiều rộng 100% của container
        maxWidth: 300, // Chiều rộng tối đa là 300px
        backgroundColor: 'transparent', // Đảm bảo nền input trong suốt
        fontSize: 16, // Kích thước chữ
        textAlignVertical: 'bottom', // Đưa văn bản về phía dưới của trường nhập
    },
    confirmPasswordInput: {
        height: 100, // Chiều cao của input xác nhận
        borderBottomColor: '#9C9999', // Màu cho đường kẻ dưới input
        borderBottomWidth: 1, // Độ dày cho đường kẻ dưới
        paddingVertical: 5, // Giảm padding dọc
        width: '100%', // Chiều rộng 100% của container
        maxWidth: 300, // Chiều rộng tối đa là 300px
        backgroundColor: 'transparent', // Đảm bảo nền input trong suốt
        fontSize: 16, // Kích thước chữ
        textAlignVertical: 'bottom', // Đưa văn bản về phía dưới của trường nhập
        marginTop: -19, // Thêm khoảng cách với nút phía trên
    },
    buttonContainer: {
        flex: 1, // Chiếm toàn bộ không gian
        alignItems: 'center', // Căn giữa nút
    },
    submitButton: {
        height: 32, // Chiều cao của nút gửi
        width: 100, // Chiều rộng
        backgroundColor: 'black', // Màu nền cho nút gửi
        borderRadius: 16, // Làm tròn các góc của nút
        alignItems: 'center', // Căn giữa các nội dung bên trong nút
        justifyContent: 'center', // Căn giữa theo chiều dọc bên trong nút
        marginVertical: 60, // Khoảng cách dọc giữa các nút
    },
    buttonText: {
        color: 'white', // Màu chữ cho văn bản nút
        fontSize: 14, // Kích thước font cho văn bản nút
    },
});

export default NewPassScreen;
