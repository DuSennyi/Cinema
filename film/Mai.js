import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Mai = () => {
    const navigation = useNavigation();

    const openYouTube = () => {
        const url = 'https://www.youtube.com/watch?v=EX6clvId19s'; // Thay YOUR_VIDEO_ID bằng ID video thực tế
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
                    <Image source={require('./image/mai1.png')} style={styles.profileImage} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>MAI</Text>
                        <Text style={styles.movieRating}>⭐⭐⭐⭐</Text>
                    </View>
                </View>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                    <Text style={[styles.tab, styles.activeTab]}>Thông tin</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectShowTimesMai')}>
                        <Text style={styles.tab}>Suất chiếu</Text>
                    </TouchableOpacity>
                </View>

                {/* Movie Thumbnail with link */}
                <TouchableOpacity onPress={openYouTube}>
                    <Image source={require('./image/mai2.png')} style={styles.thumbnailImage} />
                </TouchableOpacity>
                
                {/* Movie Information */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Đạo diễn:</Text>
                        <Text style={styles.infoText}>Trấn Thành</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Diễn viên:</Text>
                        <Text style={styles.infoText}>Phương Anh Đào, Tuấn Trần, Trấn Thành...</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thể loại:</Text>
                        <Text style={styles.infoText}>Hài, lãng mạn, chính kịch</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thời lượng:</Text>
                        <Text style={styles.infoText}>2 giờ 11 phút</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Khởi chiếu:</Text>
                        <Text style={styles.infoText}>04/10/2024</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mô tả phim:</Text>
                        <Text style={styles.infoText}>
                        Mai là một cô gái sinh ra trong một gia đình bất hạnh, cô đã từng trải qua một bi kịch không thể kinh khủng hơn. Khi đang ở độ tuổi đẹp nhất của một người con gái, Mai phải làm đủ mọi việc để kiếm tiền hòng tồn tại giữa thành phố hoa lệ. Từ đây, số phận đưa đẩy khiến cô trở thành một cô gái mát-xa. Tất nhiên, khác với những người đồng nghiệp, Mai chỉ "bán nghệ chứ không bán thân". Tuy nhiên, công việc này vẫn khiến cô chịu nhiều điều tiếng khi bị xem như gái bán hoa. Cuộc đời Mai bất ngờ rẽ sang hướng khác khi cô gặp Trùng Dương – gã hàng xóm có biệt danh là Sâu sống đối diện căn phòng trọ của cô. Trái ngược với Mai, Dương lại là chàng công tử sinh ra ở vạch đích, chuyển ra ngoài sống chỉ để tìm kiếm cảm hứng sáng tác theo đam mê của mình. Anh sống cuộc đời phóng túng, là tay "sát gái" và quyết tâm chiếm lấy Mai sau một lời thách đố với tay bạn thân.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.payButton}
                    onPress={() => navigation.navigate('SelectShowTimesMai')}
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

export default Mai;
