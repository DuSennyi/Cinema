import React, { useState } from 'react';
import { View, StatusBar, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const combos = [
  { id: 1, name: 'Bắp ngàn 2 vị', oldPrice: 199000, newPrice: 110000, quantity: 0, image: require('../../image/Bắp 1.png') },
  { id: 2, name: 'Coca Cola', oldPrice: 30000, newPrice: 15000, quantity: 0, image: require('../../image/coca 1.png') },
  { id: 3, name: 'Pepsi', oldPrice: 30000, newPrice: 15000, quantity: 0, image: require('../../image/pepsi 1.png') },
  { id: 4, name: 'PREMIUM CGV COMBO', oldPrice: 219000, newPrice: 139000, quantity: 0, image: require('../../image/combo_pre 1.png') },
  { id: 5, name: 'MY COMBO', oldPrice: 110000, newPrice: 89000, quantity: 0, image: require('../../image/combo 89k 1.png') },
  { id: 6, name: 'CGV COMBO', oldPrice: 219000, newPrice: 119000, quantity: 0, image: require('../../image/combo 119k 1.png') },
  { id: 7, name: 'COMBO STARTLIGHT', oldPrice: 265000, newPrice: 145000, quantity: 0, image: require('../../image/combo 180k 1.png') },
];

const ComboJokerScreen = () => {
  const [data, setData] = useState(combos);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate, selectedDay, selectedTime, selectedCinema, selectedCombos = [] } = route.params || {};

  // Kiểm tra nếu selectedCombos không phải là mảng hợp lệ
  if (!selectedCombos || !Array.isArray(selectedCombos)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Thông tin không hợp lệ, vui lòng thử lại.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  const handleQuantityChange = (id, type) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        // Tạo một bản sao mới của item để tránh thay đổi trực tiếp
        const updatedItem = { ...item };
        if (type === 'increase') {
          updatedItem.quantity += 1;
        } else if (type === 'decrease' && updatedItem.quantity > 0) {
          updatedItem.quantity -= 1;
        }
        return updatedItem;
      }
      return item;
    });
    setData(updatedData);
  };
  
  const calculateTotal = () => {
    return data.reduce((total, item) => {
      return total + (item.quantity * item.newPrice); // Tổng tiền combo đã chọn
    }, 0);
  };
  
  
  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>{item.oldPrice.toLocaleString()}đ</Text>
          <Text style={styles.newPrice}>{item.newPrice.toLocaleString()}đ</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrease')}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increase')}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" hidden={false}/>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../image/back.png')} style={styles.backIconImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Combo - Bắp Nước</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng cộng</Text>
        <Text style={styles.totalAmount}>{calculateTotal().toLocaleString()}đ</Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={() => {
      const selectedCombosToSend = data.filter(item => item.quantity > 0); // Lọc các combo có số lượng lớn hơn 0
      if (selectedCombosToSend.length === 0) {
        alert('Vui lòng chọn ít nhất một combo!');
        return;
      }

      // Truyền cả selectedCombos và selectedSeats khi chuyển sang trang CheckInformationJoker
      navigation.navigate('CheckInformationJoker', {
        selectedDate,
        selectedDay,
        selectedTime,
        selectedCinema,
        selectedCombos: selectedCombosToSend,  // Combo đã chọn
        selectedSeats: route.params.selectedSeats,  // Ghế đã chọn từ SeatScreen
      });
    }}>
    <Text style={styles.continueButtonText}>Tiếp tục</Text>
  </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 169,
    height: 27,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  oldPrice: {
    fontSize: 14,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  newPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    fontSize: 20,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  continueButton: {
    backgroundColor: '#FFCC00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ComboJokerScreen;
