import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CDHM = () => {
    const navigation = useNavigation();

    // Hàm mở liên kết YouTube
    const openYouTube = () => {
        const url = 'https://www.youtube.com/watch?v=ZIz8QQBYcx0'; // Thay YOUR_VIDEO_ID bằng ID video thực tế
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={require('./image/back.png')} style={styles.backIconImage}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chi tiết Phim</Text>
            </View>

            {/* Main content area with ScrollView */}
            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Image and Title */}
                <View style={styles.profileContainer}>
                    <Image source={require('./image/CDHM1.png')} style={styles.profileImage} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>CÔ DÂU HÀO MÔN</Text>
                        <Text style={styles.movieRating}>⭐⭐⭐</Text>
                    </View>
                </View>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                    <Text style={[styles.tab, styles.activeTab]}>Thông tin</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectShowTimesCDHM')}>
                        <Text style={styles.tab}>Suất chiếu</Text>
                    </TouchableOpacity>
                </View>

                {/* Movie Thumbnail with link */}
                <TouchableOpacity onPress={openYouTube}>
                    <Image source={require('./image/CDHM1.png')} style={styles.thumbnailImage} />
                </TouchableOpacity>
                
                {/* Movie Information */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Đạo diễn:</Text>
                        <Text style={styles.infoText}>Vũ Ngọc Đãng</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Diễn viên:</Text>
                        <Text style={styles.infoText}>Hồng Vân, Thu Trang, Uyển Ân, Lê Giang, Kiều Minh Tuấn</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thể loại:</Text>
                        <Text style={styles.infoText}>Drama</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thời lượng:</Text>
                        <Text style={styles.infoText}>114 phút</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Khởi chiếu:</Text>
                        <Text style={styles.infoText}>18/10/2024</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mô tả phim:</Text>
                        <Text style={styles.infoText}>
                        Bộ phim xoay quanh câu chuyện làm dâu nhà hào môn dưới góc nhìn hài hước và châm biếm, hé lộ những câu chuyện kén dâu chọn rể trong giới thượng lưu. Phối hợp cùng Uyển Ân ở các phân đoạn tình cảm trong bộ phim lần này là diễn viên Samuel An. Anh được đạo diễn Vũ Ngọc Đãng “đo ni đóng giày” cho vai cậu thiếu gia Bảo Hoàng với ngoại hình điển trai, phong cách lịch lãm và gia thế khủng.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.payButton}
                    onPress={() => navigation.navigate('SelectShowTimesCDHM')}
                >
                    <Text style={styles.payButtonText}>Đặt vé</Text>
                </TouchableOpacity>      
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        marginRight: 10,
    },
    backIconImage: {
        width: 26,
        height: 26,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    movieInfo: {
        marginLeft: 15,
    },
    movieTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    movieRating: {
        fontSize: 14,
        color: '#FFD700',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        borderBottomColor: '#ddd',
        marginVertical: 10,
    },
    tab: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 53,
        marginBottom: 8,
        color: '#666',
        borderBottomWidth: 2,
        borderBottomColor: '#666',
    },
    activeTab: {
        color: '#FFC107',
        borderBottomWidth: 2,
        borderBottomColor: '#FFC107',
        marginBottom: 8,
    },
    thumbnailImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
      },
    infoContainer: {
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoLabel: {
        width: '30%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        width: '70%',
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    footer: {
        height: 105,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 15,
    },
    payButton: {
        backgroundColor: '#ffc107',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    payButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default CDHM;
