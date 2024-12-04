import React from 'react';
import { View, StatusBar, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" hidden={false}/>
            {/* Header với nút back */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })}
                >
                    <Image source={require('../image/back.png')} style={styles.backIconImage} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
            </View>

            {/* Avatar và thông tin người dùng */}
            <View style={styles.profileContainer}>
                <Image source={require('../image/avatar.png')} style={styles.avatar} />
                <Text style={styles.name}>Nguyễn Trung Du</Text>
                <Text style={styles.info}>Số điện thoại: 0387813695</Text>
                <Text style={styles.info}>Email: Nguyentrungdubn@gmail.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4', // Màu nền nhẹ cho toàn bộ màn hình
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8', // Giữ màu nền cũ cho header
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // Đường viền nhẹ dưới header
    },
    backButton: {
        padding: 5,
    },
    backIconImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#fff', // Nền trắng cho phần thông tin cá nhân
        padding: 20,
        borderRadius: 10, // Bo góc nhẹ cho các phần tử
        marginHorizontal: 15, // Cách lề để tránh bị chật
        shadowColor: '#000', // Thêm bóng đổ nhẹ cho phần thông tin cá nhân
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Tạo hiệu ứng bóng đổ trên Android
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 4,
        borderColor: '#6200EE', // Đường viền cho avatar
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333', // Màu chữ đậm hơn
    },
    info: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
});
