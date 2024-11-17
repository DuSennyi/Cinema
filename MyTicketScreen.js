import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import your custom back button image
const backButtonImage = require('./image/back.png');

const MyTicketScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back button with custom image */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={backButtonImage} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vé của tôi</Text>
      </View>
      
      {/* Tab Selection */}
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
          <Text style={[styles.tabText, activeTab === 'watched' && styles.activeTabText]}>Phim đã xem</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'upcoming' ? (
          <Text>No upcoming movies</Text>
        ) : (
          <Text>No watched movies</Text>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
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
    borderBottomWidth: 2,
    borderBottomColor: '#f5a623',
  },
  tabText: {
    color: 'gray',
    fontSize: 16,
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
});

export default MyTicketScreen;
