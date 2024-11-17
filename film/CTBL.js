import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CTBL = () => {
    const navigation = useNavigation();

    const openYouTube = () => {
        const url = 'https://www.youtube.com/watch?v=q-wr0JDcvVk'; // Thay YOUR_VIDEO_ID bằng ID video thực tế
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Image
                        source={require('./image/back.png')}
                        style={styles.backIconImage}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thông tin Phim</Text>
            </View>

            {/* Main content area with ScrollView */}
            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Image and Title */}
                <View style={styles.profileContainer}>
                    <Image source={require('./image/CTBL1.png')} style={styles.profileImage} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>CÔNG TỬ BẠC LIÊU</Text>
                    </View>
                </View>
                {/* Movie Thumbnail with link */}

                <TouchableOpacity onPress={openYouTube}>
                    <Image source={require('./image/CTBL2.png')} style={styles.thumbnailImage} />
                </TouchableOpacity>
                
                {/* Movie Information */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Đạo diễn:</Text>
                        <Text style={styles.infoText}>Lý Minh Thắng</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Diễn viên: </Text>
                        <Text style={styles.infoText}>NSUT Thành Lộc, Song Luân, Công Dương, Đoàn Thiên Ân,…</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thể loại:</Text>
                        <Text style={styles.infoText}>Hài, Tâm Lý, Tiểu Sử</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thời lượng:</Text>
                        <Text style={styles.infoText}></Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Khởi chiếu:</Text>
                        <Text style={styles.infoText}>06/12/2024</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mô tả phim:</Text>
                        <Text style={styles.infoText}>
                        Lấy cảm hứng từ giai thoại nổi tiếng của nhân vật được mệnh danh là thiên hạ đệ nhất chơi ngông, Công Tử Bạc Liêu là bộ phim tâm lý hài hước, lấy bối cảnh Nam Kỳ Lục Tỉnh xưa của Việt Nam. BA HƠN - Con trai được thương yêu hết mực của ông Hội đồng Lịnh vốn là chủ ngân hàng đầu tiên tại Việt Nam, sau khi du học Pháp về đã sử dụng cả gia sản của mình vào những tò vui tiêu khiển, ăn chơi trác tán – nên được người dân gọi bằng cái tên Công Tử Bạc Liêu.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
            <TouchableOpacity style={styles.payButton}  onPress={() => Linking.openURL('https://www.anninhthudo.vn/phim-cong-tu-bac-lieu-he-lo-dien-vien-chinh-va-boi-canh-an-tuong-post588070.antd')}>
                <Text style={styles.payButtonText}>Thông tin chi tiết</Text>
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
        borderBottomColor: '#dddd',
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
        paddingBottom: 110,
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
        color: '#FFD700', // Màu vàng cho ngôi sao
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
        marginTop: 20,
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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

export default CTBL;
