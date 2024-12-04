import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SuccessCBCHScreen = () => {
    const navigation = useNavigation();
    const handleHomePress = () => {
        // Logic để điều hướng về trang chủ
        console.log('Trở về trang chủ');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" hidden={false}/>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    <Image
                        source={require('./image/done.png')}
                        style={styles.checkmarkImage}
                    />
                    <Text style={styles.successText}>Tuyệt vời!</Text>
                    <Text style={styles.message}>
                        Bạn đã đặt thành công vé xem phim "CẬU BÉ CÁ HEO", chúc bạn sẽ có những phút xem phim tuyệt vời.
                    </Text>
                </View>

                <Text style={styles.hotMoviesTitle}>Phim HOT sắp tới</Text>
                <TouchableOpacity style={styles.moviePoster} onPress={() => navigation.navigate('Captain')}>
                    <Image source={require('./film/image/captain2.png')} style={styles.moviePoster}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.moviePoster} onPress={() => navigation.navigate('DiaDao')}>
                    <Image source={require('./film/image/DiaDao2.png')} style={styles.moviePoster}/>
                </TouchableOpacity>

            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Trở về trang chủ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        padding: 16,
        alignItems: 'center',
        paddingBottom: 100,
    },
    content: {
        alignItems: 'center',
        marginBottom: 24,
    },
    checkmarkImage: {
        width: 115,
        height: 135,
        marginTop: 30,
    },
    successText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
    },
    hotMoviesTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 16,
        textAlign: 'left', // Điều chỉnh dòng chữ nằm sát bên trái
        width: '100%', // Đảm bảo dòng chữ chiếm toàn bộ chiều rộng
    },
    moviePoster: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#ffc107',
        paddingVertical: 15,
        paddingHorizontal: 120,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});

export default SuccessCBCHScreen;
