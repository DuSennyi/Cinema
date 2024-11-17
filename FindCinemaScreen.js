import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const NavButton = ({ icon, label, active, onPress }) => (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
        <FontAwesome name={icon} size={24} color={active ? '#FFD700' : '#666'} />
        <Text style={[styles.navLabel, active && { color: '#FFD700' }]}>{label}</Text>
    </TouchableOpacity>
);

const cinemas = [
    {
        id: '1',
        name: 'Beta Mỹ Đình',
        address: 'Tầng hầm B1, tòa nhà Golden Palace, Đường Mễ Trì, Phạm Hùng, Nam Từ Liêm',
        distance: '1.0 km',
        logo: require('./assets/Home/beta.png'),
    },
    {
        id: '2',
        name: 'Beta Thanh Xuân',
        address: 'Tầng hầm B1, tòa nhà Golden West, Lê Văn Lương, Thanh Xuân',
        distance: '2.1 km',
        logo: require('./assets/Home/beta.png'),
    },
    {
        id: '3',
        name: 'Beta Giải Phóng',
        address: 'Tầng 3, tòa IP2, chung cư Imperial, 360 Giải Phóng',
        distance: '2.5 km',
        logo: require('./assets/Home/beta.png'),
    },
    {
        id: '4',
        name: 'Beta Đan Phượng',
        address: 'Tầng 2 tòa HH4, khu đô thị XPHomes',
        distance: '3.0 km',
        logo: require('./assets/Home/beta.png'),
    },
    {
        id: '5',
        name: 'CGV Aeon Mall',
        address: 'Tầng 4, AEON Mall Hà Đông, Đường Phú Lãm, Hà Đông',
        distance: '5.0 km',
        logo: require('./assets/Home/cgv.png'),
    },
    {
        id: '6',
        name: 'CGV Vincom Mega Mall',
        address: 'Tầng 3, Vincom Mega Mall, 232 Đường Đỗ Xuân Hợp, Quận 9',
        distance: '8.5 km',
        logo: require('./assets/Home/cgv.png'),
    },
    {
        id: '7',
        name: 'NCC Cinemas',
        address: 'Tầng 2, tòa nhà T1, Khu đô thị Phú Lương, Hà Đông',
        distance: '4.5 km',
        logo: require('./assets/Home/ncc.png'),
    },
    {
        id: '8',
        name: 'Lotte Cinema',
        address: 'Tầng 3, Lotte Mart Hà Đông, Đường Nguyễn Khuyến, Hà Đông',
        distance: '6.0 km',
        logo: require('./assets/Home/lotte.png'),
    },
    {
        id: '9',
        name: 'BHD Star',
        address: 'Tầng 5, Vincom Center, 191 Bà Triệu, Hai Bà Trưng',
        distance: '7.0 km',
        logo: require('./assets/Home/bhd.png'),
    },
];

const recommendedCinemas = [
    {
        id: '5',
        logo: require('./assets/Home/cgv.png'),
    },
    {
        id: '6',
        logo: require('./assets/Home/beta.png'),
    },
    {
        id: '7',
        logo: require('./assets/Home/ncc.png'),
    },
    {
        id: '8',
        logo: require('./assets/Home/lotte.png'),
    },
    {
        id: '9',
        logo: require('./assets/Home/bhd.png'),
    },
];

const App = () => {
    const [currentCategory, setCurrentCategory] = useState('FindCinema');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // New state for search
    const slideAnim = useRef(new Animated.Value(300)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: modalVisible ? 0 : 300,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [modalVisible]);

    const handleNavigation = (category, route) => {
        setCurrentCategory(category);
        navigation.navigate(route);
    };

    const filteredCinemas = cinemas.filter(cinema => 
        cinema.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCinemaItem = ({ item }) => (
        <View style={styles.cinemaContainer}>
            <View style={styles.cinemaInfo}>
                <Image source={item.logo} style={styles.logo} />
                <View style={styles.textContainer}>
                    <Text style={styles.cinemaName}>{item.name}</Text>
                    <Text style={styles.cinemaAddress}>{item.address}</Text>
                </View>
            </View>
            <View style={styles.distanceContainer}>
                <Text style={styles.distanceText}>{item.distance}</Text>
                <TouchableOpacity>
                    <Text style={styles.favoriteText}>❤️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderRecommendedCinemaItem = ({ item }) => (
        <View style={[styles.recommendedItem, { marginHorizontal: 10 }]}>
            <Image source={item.logo} style={styles.recommendedLogo} />
            <Text style={styles.recommendedName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-avatar-dep-cho-con-gai-2.jpg' }}
                    style={styles.profileImage}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesome name="bars" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput 
                    placeholder="Tìm rạp phim" 
                    style={styles.searchInput} 
                    value={searchQuery} // Bind value to search query
                    onChangeText={text => setSearchQuery(text)} // Update state on change
                />
                <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
            </View>

            <View style={styles.recommendedContainer}>
                <Text style={styles.recommendedTitle}>Rạp gợi ý</Text>
                <FlatList
                    data={recommendedCinemas}
                    renderItem={renderRecommendedCinemaItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.recommendedList}
                />
            </View>

            <Text style={styles.foundCinemasText}>
                Đã tìm thấy {filteredCinemas.length} rạp
            </Text>

            <FlatList
                data={filteredCinemas} // Use the filtered list
                renderItem={renderCinemaItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />

            <View style={styles.navbar}>
                <NavButton
                    icon="home"
                    label="Trang chủ"
                    onPress={() => handleNavigation("Home", "Home")}
                />
                <NavButton
                    icon="film"
                    label="Chọn rạp"
                    active={currentCategory === "FindCinema"}
                    onPress={() => handleNavigation("FindCinema", "FindCinema")}
                />
                <NavButton
                    icon="cutlery"
                    label="Bắp nước"
                    onPress={() => handleNavigation("ComboScreen", "ComboScreen")}
                />
                <NavButton
                    icon="ticket"
                    label="Vé của tôi"
                    onPress={() => handleNavigation("MyTicket", "MyTicket")}
                />
            </View>

            {/* Hamburger Menu Modal */}
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)} />
                    <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}>
                        <Text style={styles.modalTitle}>Deeps</Text>
                        
                        {/* Nút đóng ở góc trên bên phải */}
                        <TouchableOpacity 
                            onPress={() => setModalVisible(false)} 
                            style={styles.closeButtonContainer} // Thêm style cho vị trí
                        >
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                        
                        {/* Spacer để đẩy nút đăng xuất xuống dưới cùng */}
                        <View style={styles.spacer} />
                        
                        {/* Nút Đăng xuất, chuyển đến trang Login */}
                        <TouchableOpacity 
                            style={styles.menuItem} 
                            onPress={() => {
                                setModalVisible(false); // Đóng modal trước khi chuyển hướng
                                navigation.navigate('Login'); // Chuyển hướng đến trang Login
                            }}
                        >
                            <Text style={styles.menuText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

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
        backgroundColor: '#f8f8f8',
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
    scrollContainer: {
        paddingBottom: 80,
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    cinemaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        
    },
    cinemaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: 62,
        height: 58,
        marginRight: 16,
    },
    textContainer: {
        maxWidth: '70%', // Limit the text width
    },
    cinemaName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    cinemaAddress: {
        color: '#666',
        fontSize: 14,
    },
    distanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 60,
    },
    distanceText: {
        fontWeight: 'bold',
    },
    favoriteText: {
        fontSize: 18,
        color: '#ff0000',
    },
    recommendedContainer: {
        marginTop: 10,
        paddingHorizontal: 16,
    },
    recommendedTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    recommendedList: {
        flexDirection: 'row',
    },
    recommendedCinemaContainer: {
        alignItems: 'center',
        width: 70,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    navButton: {
        alignItems: 'center',
        flex: 1,
    },
    navLabel: {
        marginTop: 5,
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

    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 16,
    },

    foundCinemasText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 15, // Thêm khoảng cách cho đẹp
        textAlign: 'left', // Canh giữa
        left: 16,
    },
});

export default App;
