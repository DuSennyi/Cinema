import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your custom back button image
const backButtonImage = require('../image/back.png');
// Avatar image for ticket
const avatarImage = require('../image/avatar.png');

const MyTicketScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [ticket, setTicket] = useState(null);
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  const [purchasedCombos, setPurchasedCombos] = useState([]);

  const toggleExpand = (id) => {
    setExpandedTicketId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    // Fetch ticket data from AsyncStorage
    const fetchTicket = async () => {
      const ticketData = await AsyncStorage.getItem('upcomingTicket');
      if (ticketData) {
        setTicket(JSON.parse(ticketData));
      }
    };
    fetchTicket();
  }, []);

  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi tab "Bắp nước đã mua" được chọn
    const fetchPurchasedCombos = async () => {
      try {
        const data = await AsyncStorage.getItem('purchasedCombos');
        if (data) {
          setPurchasedCombos(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching purchased combos:', error);
      }
    };

    if (activeTab === 'watched') {
      fetchPurchasedCombos();  // Lấy dữ liệu bắp nước đã mua
    }
  }, [activeTab]);
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" hidden={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={backButtonImage} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vé của tôi</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Phim sắp xem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'watched' && styles.activeTab]}
          onPress={() => setActiveTab('watched')}
        >
          <Text style={[styles.tabText, activeTab === 'watched' && styles.activeTabText]}>Bắp nước đã mua</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'upcoming' && ticket ? (
          <View style={styles.ticketCard}>
            <Image source={avatarImage} style={styles.avatar} />

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Họ tên:</Text>
              <Text style={styles.ticketDetail}>{ticket.name}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>SĐT:</Text>
              <Text style={styles.ticketDetail}>{ticket.phone}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Email:</Text>
              <Text style={styles.ticketDetail}>{ticket.email}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Tên phim:</Text>
              <Text style={styles.ticketDetail}>{ticket.movieName || 'Chưa có thông tin phim'}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Phòng chiếu:</Text>
              <Text style={styles.ticketDetail}>{ticket.cinemaRoom || 'Chưa có thông tin phòng'}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Món ăn:</Text>
              <Text style={styles.ticketDetail}>{ticket.foodItems || 'Chưa có thông tin món ăn'}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Mã ghế:</Text>
              <Text style={styles.ticketDetail}>{ticket.seat || 'Chưa có thông tin ghế'}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Giờ đặt:</Text>
              <Text style={styles.ticketDetail}>{ticket.time}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Phương thức thanh toán:</Text>
              <Text style={styles.ticketDetail}>{ticket.paymentMethod}</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Giá tiền:</Text>
              <Text style={styles.ticketDetail}>{ticket.totalPrice.toLocaleString()}đ</Text>
            </View>
            <View style={styles.separator}></View>

            <View style={styles.ticketRow}>
              <Text style={styles.ticketLabel}>Giờ xác nhận:</Text>
              <Text style={styles.ticketDetail}>{ticket.bookingTime}</Text>
            </View>
          </View>
        ) : activeTab === 'watched' ? (
          purchasedCombos.length > 0 ? (
            <ScrollView contentContainerStyle={styles.comboList}>
              <View style={styles.comboRow}>
                {purchasedCombos.map((item, index) => (
                  <View key={index} style={styles.comboCard}>
                    <View style={styles.comboHeader}>
                      <Image source={item.image} style={styles.comboAvatar} />
                      <Text style={styles.comboTitle}>{item.name}</Text>
                    </View>
                    <Text style={styles.comboDetail}>Số lượng: {item.quantity}</Text>
                    <Text style={styles.comboDetail}>
                      Giá: {(item.newPrice * item.quantity).toLocaleString()}đ
                    </Text>
                    <Text style={styles.comboDetail}>Thời gian đặt: {item.purchaseTime}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text style={styles.noTicketText}>Chưa có bắp nước nào được mua.</Text>
          )
        ) : (
          <Text style={styles.noTicketText}>Chưa có vé nào sắp xem.</Text>
        )}
      </View>
    </View>
  );
};

// Placeholder Screens for Bottom Tab Navigation
const HomeScreen = () => (
  <View style={styles.content}><Text>Home Screen</Text></View>
);
const FindCinemaScreen = () => (
  <View style={styles.content}><Text>Find Cinema Screen</Text></View>
);
const BuyPopcornScreen = () => (
  <View style={styles.content}><Text>Buy Popcorn Screen</Text></View>
);

const BottomTab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Trang chủ') iconName = 'home-outline';
            else if (route.name === 'Chọn rạp') iconName = 'film-outline';
            else if (route.name === 'Bắp nước') iconName = 'fast-food-outline';
            else if (route.name === 'Vé của tôi') iconName = 'ticket-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f5a623',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <BottomTab.Screen name="Trang chủ" component={HomeScreen} />
        <BottomTab.Screen name="Chọn rạp" component={FindCinemaScreen} />
        <BottomTab.Screen name="Bắp nước" component={BuyPopcornScreen} />
        <BottomTab.Screen name="Vé của tôi" component={MyTicketScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    fontFamily: 'Roboto-Bold', // Customize the font family
  },
  backButton: {
    width: 26,
    height: 26,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#f5a623',
  },
  tabText: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Roboto-Regular', // Customize the font family
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingTop: 20,
  },
  ticketCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '90%',
    borderWidth: 1,
    borderColor: '#f5a623',
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#f5a623',
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ticketLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    fontFamily: 'Roboto-Regular',
  },
  ticketDetail: {
    fontSize: 16,
    color: '#555',
    flex: 2,
    textAlign: 'right',
    fontFamily: 'Roboto-Regular',
  },
  noTicketText: {
    fontSize: 16,
    color: '#777',
  },
  comboList: {
    paddingBottom: 40,
  },
  comboRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  comboCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
  },
  comboHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  comboAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  comboTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  comboDetail: {
    fontSize: 12,
    color: '#777',
  },
});

export default MyTicketScreen;
