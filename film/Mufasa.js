import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Mufasa = () => {
    const navigation = useNavigation();

    const openYouTube = () => {
        const url = 'https://www.youtube.com/watch?v=c75XRkb2MpQ'; // Thay YOUR_VIDEO_ID bằng ID video thực tế
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
                    <Image source={require('./image/mufasa1.png')} style={styles.profileImage} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>MUFASA: VUA SƯ TỬ</Text>
                    </View>
                </View>


                {/* Movie Thumbnail with link */}

                <TouchableOpacity onPress={openYouTube}>
                    <Image source={require('./image/mufasa2.png')} style={styles.thumbnailImage} />
                </TouchableOpacity>
                
                {/* Movie Information */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Đạo diễn:</Text>
                        <Text style={styles.infoText}>Barry Jenkins</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Diễn viên:</Text>
                        <Text style={styles.infoText}></Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thể loại:</Text>
                        <Text style={styles.infoText}>Gia đình, Phiêu Lưu</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thời lượng:</Text>
                        <Text style={styles.infoText}>85 phút</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Khởi chiếu:</Text>
                        <Text style={styles.infoText}>20/12/2024</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mô tả phim:</Text>
                        <Text style={styles.infoText}>
                        Sau Simba thì tới lượt Mufusa cũng lên live action Mufasa: Vua Sư Tử - phần tiền truyện về Mufasa - cha của Simba trong bộ phim Vua Sư Tử huyền thoại, dự kiến khởi chiếu tháng 12.2024
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
            <TouchableOpacity style={styles.payButton}  onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Mufasa:_The_Lion_King')}>
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

export default Mufasa;
