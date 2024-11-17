import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CBCH = () => {
    const navigation = useNavigation();

    const openYouTube = () => {
        const url = 'https://www.youtube.com/watch?v=hCmAntZAK2I'; // Thay YOUR_VIDEO_ID bằng ID video thực tế
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
                <Text style={styles.headerTitle}>Chi tiết Phim</Text>
            </View>

            {/* Main content area with ScrollView */}
            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Image and Title */}
                <View style={styles.profileContainer}>
                    <Image source={require('./image/CBCH1.png')} style={styles.profileImage} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>CẬU BÉ CÁ HEO</Text>
                        <Text style={styles.movieRating}>⭐⭐⭐⭐⭐</Text>
                    </View>
                </View>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                    <Text style={[styles.tab, styles.activeTab]}>Thông tin</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectShowTimesCBCH')}>
                        <Text style={styles.tab}>Suất chiếu</Text>
                    </TouchableOpacity>
                </View>

                {/* Movie Thumbnail with link */}

                <TouchableOpacity onPress={openYouTube}>
                    <Image source={require('./image/CBCH2.png')} style={styles.thumbnailImage} />
                </TouchableOpacity>
                
                {/* Movie Information */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Đạo diễn:</Text>
                        <Text style={styles.infoText}>Mohammad Kheyrandish</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Diễn viên:</Text>
                        <Text style={styles.infoText}>Polina Avdeenko, Yuliya Rudina, Boris Khasanov</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thể loại:</Text>
                        <Text style={styles.infoText}>Gia đình, Hoạt Hình</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thời lượng:</Text>
                        <Text style={styles.infoText}>85 phút</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Khởi chiếu:</Text>
                        <Text style={styles.infoText}>27/09/2024</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mô tả phim:</Text>
                        <Text style={styles.infoText}>
                        Được giải cứu và nuôi dạy bởi đàn cá heo sau một vụ tai nạn máy bay trên biển, cậu bé Dolphin dần lớn lên với một cuộc sống vô tư dưới những con sóng biển êm đềm cho đến khi một con quái vật độc ác nắm quyền cai trị thế giới dưới nước. Bị đày trở lại đất liền, cậu bé được người thuyền trưởng tốt bụng nhận về nuôi. Với sự giúp đỡ của người bạn đồng hành mới, cậu bé dấn thân vào cuộc hành trình giải quyết bí ẩn về danh tính thực sự của mình.Với mỗi chiến thắng, họ tiến gần hơn đến việc làm sáng tỏ ý định độc ác của tên quái vật xấu xa và khôi phục lại sự cân bằng cho thế giới dưới nước
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.payButton}
                    onPress={() => navigation.navigate('SelectShowTimesCBCH')}
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

export default CBCH;
