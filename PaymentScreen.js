import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    { id: 1, name: 'ACB', holder: 'NGUYEN PHUONG THAO', number: '899 922 365', icon: require('./image/acb.png') },
    { id: 2, name: 'MOMO', holder: 'NGUYEN PHUONG THAO', number: '0395 638 3**', icon: require('./image/momo.png') },
    { id: 3, name: 'Tiền mặt', holder: '', note: 'Giữ ghế tới 12 giờ', icon: require('./image/cash.png') },
  ];

  const handleSelectPayment = (method) => {
    setSelectedPayment(method);
    navigation.navigate('PaymentDetails', { selectedPayment: method }); // Gửi phương thức thanh toán đã chọn
  };

  return (
    <View style={styles.container}>
      {paymentMethods.map((method) => (
        <View key={method.id} style={styles.paymentMethod}>
          <Image source={method.icon} style={styles.icon} />
          <View style={styles.info}>
            <Text style={styles.bankName}>{method.name}</Text>
            <Text style={styles.accountHolder}>{method.holder || method.note}</Text>
            <Text style={styles.accountHolder}>{method.number}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.selectButton,
              selectedPayment?.id === method.id , // Đổi màu nút khi được chọn
            ]}
            onPress={() => handleSelectPayment(method)}
          >
            <Text style={styles.buttonText}>Chọn</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 ,
    backgroundColor:'#fff',
    paddingHorizontal: 15,
  },
  paymentMethod: {
    backgroundColor:'#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  icon: { 
    width: 70, 
    height: 70, 
    marginRight: 10 
  },
  info: { flex: 1 },
  selectButton: {
    backgroundColor: '#ffc107',
    width: 70,
    padding: 10,
    borderRadius: 10,
  },

  buttonText: { 
    color: '#000', 
    textAlign: 'center',
    fontWeight: 'medium',
  },
  bankName: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  accountHolder: {
    fontWeight: 'normal',
    marginLeft: 10,
    color: '#797676',
  },

});

export default PaymentScreen;
