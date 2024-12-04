import React, { useState } from 'react';
import { View, StatusBar, Text, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';  // Thêm thư viện expo-local-authentication

const combos = [
  { id: 1, name: 'Bắp ngàn 2 vị', oldPrice: 199000, newPrice: 110000, quantity: 0, image: require('../image/Bắp 1.png') },
  { id: 2, name: 'Coca Cola', oldPrice: 30000, newPrice: 15000, quantity: 0, image: require('../image/coca 1.png') },
  { id: 3, name: 'Pepsi', oldPrice: 30000, newPrice: 15000, quantity: 0, image: require('../image/pepsi 1.png') },
  { id: 4, name: 'PREMIUM CGV COMBO', oldPrice: 219000, newPrice: 139000, quantity: 0, image: require('../image/combo_pre 1.png') },
  { id: 5, name: 'MY COMBO', oldPrice: 110000, newPrice: 89000, quantity: 0, image: require('../image/combo 89k 1.png') },
  { id: 6, name: 'CGV COMBO', oldPrice: 219000, newPrice: 119000, quantity: 0, image: require('../image/combo 119k 1.png') },
  { id: 7, name: 'COMBO STARTLIGHT', oldPrice: 265000, newPrice: 145000, quantity: 0, image: require('../image/combo 180k 1.png') },
];

const BuyPopcornScreen = ({ navigation }) => {
  const [data, setData] = useState(combos);

  const handleQuantityChange = (id, type) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
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
    return data.reduce((total, item) => total + item.quantity * item.newPrice, 0);
  };

  const handlePurchase = async () => {
    const selectedCombos = data.filter(item => item.quantity > 0);
    if (selectedCombos.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một sản phẩm.');
      return;
    }
  
    // Sử dụng LocalAuthentication để xác nhận vân tay
    const hasFingerprint = await LocalAuthentication.hasHardwareAsync();
    if (!hasFingerprint) {
      Alert.alert('Thông báo', 'Thiết bị của bạn không hỗ trợ xác thực vân tay.');
      return;
    }
  
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (supportedTypes.length === 0) {
      Alert.alert('Thông báo', 'Thiết bị của bạn không hỗ trợ xác thực vân tay.');
      return;
    }
  
    // Thực hiện xác thực vân tay
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Đặt vân tay để xác nhận mua hàng',
      fallbackLabel: 'Sử dụng mã PIN',
    });
  
    if (result.success) {
      const purchaseTime = new Date().toLocaleString();  // Lấy thời gian mua hàng
  
      try {
        // Lấy dữ liệu đã lưu trước đó
        const existingData = await AsyncStorage.getItem('purchasedCombos');
        const parsedData = existingData ? JSON.parse(existingData) : [];
  
        // Cập nhật dữ liệu, chỉ giữ lại đặt mua lần cuối
        const updatedData = [...selectedCombos, { purchaseTime }];  // Cập nhật với các combo đã chọn và thời gian mua
  
        // Lưu lại vào AsyncStorage, sẽ ghi đè nếu có dữ liệu cũ
        await AsyncStorage.setItem('purchasedCombos', JSON.stringify(updatedData));
  
        Alert.alert('Mua thành công!', `Các sản phẩm đã được lưu vào danh sách. Thời gian mua: ${purchaseTime}`);
      } catch (error) {
        console.error('Error saving combos to AsyncStorage:', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu sản phẩm.');
      }
    } else {
      Alert.alert('Lỗi xác thực', 'Không thể xác thực vân tay. Vui lòng thử lại.');
    }
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
        <StatusBar
        barStyle="light-content" // Thay đổi nội dung thành màu sáng (dành cho nền tối)
        backgroundColor="#000" // Màu nền cho Android
        hidden={false} // Đảm bảo thanh trạng thái luôn hiển thị
       />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../image/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mua Bắp Nước</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng cộng:</Text>
        <Text style={styles.totalAmount}>{calculateTotal().toLocaleString()}đ</Text>
      </View>

      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text style={styles.purchaseButtonText}>Mua ngay</Text>
      </TouchableOpacity>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  oldPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  newPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  purchaseButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default BuyPopcornScreen;
