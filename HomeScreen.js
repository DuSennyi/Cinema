import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Video } from 'expo-av';  // Import Video from expo-av
// Import các bộ phim tương ứng

const NavButton = ({ icon, label, active, onPress }) => (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
        <FontAwesome name={icon} size={24} color={active ? '#FFD700' : '#666'} />
        <Text style={[styles.navLabel, active && { color: '#FFD700' }]}>{label}</Text>
    </TouchableOpacity>
);

const { width: screenWidth } = Dimensions.get('window');
const removeVietnameseTones = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
};
const cinemaLogos = {
    CGV: require('./assets/Home/cgv_lg.png'),
    Beta: require('./assets/Home/beta_lg.png'),
    Lotte: require('./assets/Home/lotte_lg.png'),
};
const cinemaRatings = {
    CGV: 3,    // CGV có 4 sao
    Beta: 5,   // Beta có 3 sao
    Lotte: 4,  // Lotte có 5 sao
};

const videoSources = [
    require('./assets/video/Mai.mp4'),
    require('./assets/video/Captain_America.mp4'),
];

export default function App() {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCategory, setCurrentCategory] = useState("Phim HOT");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;
    const posterCount = 5;
    const navigation = useNavigation();
    const route = useRoute();
    const [currentTab, setCurrentTab] = useState("Home"); // Tab mặc định
    const videoRefs = useRef([]); // Mảng chứa tham chiếu tới các video

    const hotMovies = [
        { src: require('./image/mai1.png'), name: 'Mai', key: 'Mai' },
        { src: require('./image/CDHM1.png'), name: 'CDHM', key: 'Cô dâu hào môn' },
        { src: require('./image/joker1.png'), name: 'Joker', key: 'Joker' },
        { src: require('./image/cam1.png'), name: 'Cam', key: 'Cám' },
        { src: require('./image/CBCH1.png'), name: 'CBCH', key: 'Cậu bé cá heo' },
    ];

    const comingSoonMovies = [
        { src: require('./image/captain1.png'), name: 'Captain', key: 'Captain' },
        { src: require('./image/CTBL1.png'), name: 'CTBL', key: 'Công tử bạc liêu' },
        { src: require('./image/DiaDao1.png'), name: 'DiaDao', key: 'Địa đạo' },
        { src: require('./image/mufasa1.png'), name: 'Mufasa', key: 'Mufasa' },
        { src: require('./image/NhimSonic1.png'), name: 'NhimSonic', key: 'Nhím Sonic' },
    ];

    const posters = currentCategory === "Phim HOT" ? hotMovies : comingSoonMovies;

    const filteredPosters = posters.filter(movie =>
        removeVietnameseTones(movie.key.toLowerCase()).includes(removeVietnameseTones(searchQuery.toLowerCase()))
    );
    

    useEffect(() => {
        const interval = setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % posterCount;
                scrollRef.current.scrollTo({ x: nextIndex * 278, animated: true });
                return nextIndex;
            });
        }, 3000);

        return () => clearTimeout(interval);
    }, [currentIndex]);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: modalVisible ? 0 : screenWidth,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [modalVisible]);

    const handlePosterPress = (index) => {
        const targetScreen = filteredPosters[index].name;

        if (targetScreen) {
            navigation.navigate(targetScreen);
        } else {
            console.warn(`No screen defined for poster at index ${index}`);
        }
    };

    const handleLogout = () => {
        setModalVisible(false);
        navigation.navigate('LoginRepair'); // Điều hướng về màn hình đăng nhập
    };

    
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={require('../Film/image/avatar.png')} style={styles.profileImage} />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesome name="bars" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {/* Search */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Tìm kiếm"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
                </View>

                {/* Category Selection */}
                <View style={styles.categoryContainer}>
                    <TouchableOpacity onPress={() => setCurrentCategory("Phim HOT")}>
                        <Text style={[styles.categoryText, currentCategory === "Phim HOT" && styles.activeCategory]}>Phim HOT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentCategory("Sắp chiếu")}>
                        <Text style={[styles.categoryText, currentCategory === "Sắp chiếu" && styles.activeCategory]}>Sắp chiếu</Text>
                    </TouchableOpacity>
                </View>

                {/* Movie Posters */}
                <View style={styles.posterContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={278}
                        decelerationRate="fast"
                        ref={scrollRef}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: (Dimensions.get('window').width - 258) / 2,
                        }}
                    >
                        {filteredPosters.map((poster, index) => (
                            <TouchableOpacity key={index} onPress={() => handlePosterPress(index)}>
                                <Image
                                    source={poster.src}
                                    style={styles.posterImage}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Indicators */}
                    <View style={styles.indicatorContainer}>
                        {[...Array(Math.max(filteredPosters.length, 1))].map((_, index) => (
                            <View
                                key={index}
                                style={[styles.indicator,
                                    currentIndex === index && styles.activeIndicator
                                ]}
                            />
                        ))}
                    </View>
                </View>
                
                {/* Cinema Section */}
                <Text style={styles.sectionTitle}>Khám phá rạp</Text>
                <View style={styles.cinemaList}>
                        {Object.keys(cinemaLogos).map((cinema, index) => (
                        <View key={index} style={styles.cinemaItem}>
                            <Image source={cinemaLogos[cinema]} style={styles.cinemaLogo} />
                            <View style={styles.cinemaInfo}>
                                <Text style={styles.cinemaName}>{cinema}</Text>
                                <View style={styles.rating}>
                                    {[...Array(cinemaRatings[cinema])].map((_, i) => (
                                        <FontAwesome key={i} name="star" color="#FFD700" />
                                    ))}
                                    {[...Array(5 - cinemaRatings[cinema])].map((_, i) => (
                                        <FontAwesome key={i + cinemaRatings[cinema]} name="star" color="#ccc" />
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                {/* Video Section */}
                <Text style={styles.sectionTitle}>Trailer</Text>
                <View style={styles.videoContainer}>
                    {videoSources.map((videoSource, index) => (
                        <View key={index} style={styles.videoItem}>
                            <Video
                                source={videoSource}
                                style={styles.video}
                                useNativeControls
                                resizeMode="contain"
                                isLooping
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.navbar}>
                <NavButton
                    icon="home"
                    label="Trang chủ"
                    active={route.name === "Home"}
                    onPress={() => navigation.navigate("Home")}
                />
                <NavButton
                    icon="film"
                    label="Chọn rạp"
                    onPress={() => navigation.navigate("FindCinema")}
                />
                <NavButton
                    icon="cutlery"
                    label="Bắp nước"
                    onPress={() => navigation.navigate("ComboScreen")}
                />
                <NavButton
                    icon="ticket"
                    label="Vé của tôi"
                    onPress={() => navigation.navigate("MyTicket")}
                />
            </View>

            <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)} />
                    <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}>
                        <Text style={styles.modalTitle}>Deeps</Text>
                        <TouchableOpacity onPress={handleLogout} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Đăng xuất</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.modalOptionText}>Thông tin cá nhân</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#ccc',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        paddingLeft: 40,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    searchIcon: {
        position: 'absolute',
        left: 30,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16,
        paddingHorizontal: 16, // Thêm khoảng cách bên trái và phải
    },
    categoryText: {
        color: '#666',
        marginRight: 16, // Thêm khoảng cách giữa các chữ
    },
    activeCategory: {
        color: '#FFD700',
        borderBottomWidth: 2,
        borderBottomColor: '#FFD700',
        paddingBottom: 2,
    },
    posterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    posterImage: {
        width: 258,
        height: 337,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: '#FFD700',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    cinemaList: {
        paddingHorizontal: 16,
    },
    cinemaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cinemaLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 16,
        backgroundColor: '#ccc',
        resizeMode: 'contain', // Đảm bảo logo không bị cắt
    },
    cinemaInfo: {
        flex: 1,
    },
    cinemaName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
    },
    navIcon: {
        width: 24, // Đặt kích thước phù hợp
        height: 24,
        resizeMode: 'contain', // Điều chỉnh nếu cần để icon không bị cắt
    },
    navbar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navButton: {
        alignItems: 'center',
    },

    navLabel: {
        fontSize: 12,
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: '100%',
        width: '80%',
        maxWidth: 300,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 20,
        alignItems: 'flex-start',
        position: 'absolute',
        right: 0,
        top: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    menuItem: {
        fontSize: 18,
        marginVertical: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
        width: '100%',
    },
    menuText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    closeButtonContainer: {
        position: 'absolute', // Đặt ở vị trí tuyệt đối
        right: 20, // Đặt cách bên phải 20
        top: 20, // Đặt cách trên cùng 20
        zIndex: 1, // Đặt zIndex cao hơn để không bị chèn
    },
    closeButton: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 5,
    },
    spacer: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
    },
    videoContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
        borderRadius: 10, // Bo góc cho container
        overflow: 'hidden', // Đảm bảo video không vượt quá bo góc
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    
    videoItem: {
        marginBottom: 15,
        borderRadius: 10, // Bo góc cho item
        overflow: 'hidden', // Đảm bảo video không vượt quá bo góc
    },
    
    video: {
        width: '100%',
        height: 200,
        backgroundColor: '#000',
        borderRadius: 10, // Bo góc cho video
    }
});
