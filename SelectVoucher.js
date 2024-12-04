import { useNavigation, useRoute } from '@react-navigation/native'; 
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SelectVoucher = () => {
  const navigation = useNavigation(); // Hook điều hướng
  const route = useRoute(); // Nhận params từ màn hình trước
  
  // Đảm bảo rằng totalPrice được truyền qua trong route.params
  const { totalPrice = 0, selectedTime, selectedCinema, selectedSeats, selectedCombos } = route.params || {}; // Các tham số cần thiết
  
  const [selectedVoucher, setSelectedVoucher] = useState(null); // Trạng thái cho voucher đã chọn
  const [finalPrice, setFinalPrice] = useState(totalPrice); // Trạng thái cho tổng tiền sau khi giảm giá
  
  // Kiểm tra nếu totalPrice không được truyền
  useEffect(() => {
    if (totalPrice === undefined) {
      console.error("totalPrice is not provided!");
      return;
    }
  }, [totalPrice]);

  const handleSelectVoucher = (voucherId) => {
    setSelectedVoucher(voucherId); // Cập nhật trạng thái khi chọn voucher
  };

  // Dữ liệu mã giảm giá
  const vouchers = [
    { id: 1, title: 'Giảm 10k', condition: 'Đơn tối thiểu 100k', image: require('./image/voucher1.png'), discount: 10000 },
    { id: 2, title: 'Giảm 10%', condition: 'Đơn tối thiểu 100k', image: require('./image/voucher2.png'), discount: '10%' },
    { id: 3, title: 'Giảm 20k', condition: 'Thành viên mới', image: require('./image/voucher3.png'), discount: 20000 },
    { id: 4, title: 'Giảm 50k', condition: 'Đơn tối thiểu 300k', image: require('./image/voucher4.png'), discount: 50000 },
  ];

  useEffect(() => {
    if (selectedVoucher) {
      const voucher = vouchers.find(v => v.id === selectedVoucher);
      let discountAmount = 0;
      if (typeof voucher.discount === 'number') {
        discountAmount = voucher.discount; // Giảm theo số tiền
      } else if (typeof voucher.discount === 'string' && voucher.discount.includes('%')) {
        const percentage = parseInt(voucher.discount.replace('%', ''), 10);
        discountAmount = (totalPrice * percentage) / 100; // Giảm theo tỷ lệ phần trăm
      }
      setFinalPrice(totalPrice - discountAmount); // Cập nhật lại tổng tiền sau giảm giá
    }
  }, [selectedVoucher, totalPrice]);

  const handleDone = () => {
    if (!selectedVoucher) {
      console.error("Chưa chọn mã giảm giá!");
      return;
    }

    const selectedVoucherData = vouchers.find(voucher => voucher.id === selectedVoucher);
    
    // Điều hướng tới PaymentDetails
    navigation.navigate('PaymentDetails', { 
      selectedVoucher: selectedVoucherData, 
      totalPrice: finalPrice, 
      selectedTime, 
      selectedCinema, 
      selectedSeats, 
      selectedCombos 
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" hidden={false}/>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Thêm mã giảm giá</Text>

        {vouchers.map((voucher) => (
          <View style={styles.voucherItem} key={voucher.id}>
            <Image 
              source={voucher.image}
              style={styles.voucherImage}
            />
            <View style={styles.voucherInfo}>
              <Text style={styles.voucherTitle}>{voucher.title}</Text>
              <Text style={styles.voucherCondition}>{voucher.condition}</Text>
              <TouchableOpacity>
                <Text style={styles.conditionText}>Điều kiện</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={[styles.chooseButton, selectedVoucher === voucher.id && styles.chosenButton]} 
              onPress={() => handleSelectVoucher(voucher.id)}
            >
              <Text style={styles.chooseButtonText}>
                {selectedVoucher === voucher.id ? ' Chọn' : 'Chọn'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity>
          <Text style={styles.seeMoreText}>Xem thêm</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity 
        style={styles.doneButton} 
        onPress={handleDone} // Gọi hàm khi nhấn "Xong"
      >
        <Text style={styles.doneButtonText}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:10,
    marginBottom: 20,
  },
  voucherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  voucherImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  voucherInfo: {
    flex: 1,
    paddingLeft: 15,
  },
  voucherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  voucherCondition: {
    color: '#7A7A7A',
  },
  conditionText: {
    color: '#1E90FF',
    marginTop: 5,
  },
  chooseButton: {
    backgroundColor: '#ffc107',
    width: 70,
    padding: 10,
    borderRadius: 10,
  },
  chosenButton: {
    backgroundColor: '#ddd', // Màu xám khi đã chọn
  },
  chooseButtonText: {
    color: '#000', 
    textAlign: 'center',
    fontWeight: 'medium',
  },
  seeMoreText: {
    color: '#1E90FF',
    textAlign: 'center',
    marginTop: 10,
  },
  doneButton: {
    backgroundColor: '#f3c623',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 390, // Chiều dài cố định 390
    position: 'absolute',
    bottom: 40, // Cách cuối màn hình 20px
    alignSelf: 'center', // Căn giữa
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SelectVoucher;
