import { useNavigation, useRoute } from '@react-navigation/native'; // Điều hướng giữa các màn hình
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PaymentDetailsCam = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { 
    selectedDate, 
    selectedDay, 
    selectedTime, 
    selectedCinema, 
    selectedCombos, 
    selectedSeats, 
    totalPrice, // Dữ liệu tổng tiền từ params
    recipient, // Thông tin người nhận
    selectedVoucher, // Mã giảm giá
  } = route.params || {}; // Lấy dữ liệu từ params
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [finalPrice, setFinalPrice] = useState(totalPrice || 0); // Tổng tiền sau giảm giá
  const [discount, setDiscount] = useState(0);  // Trạng thái lưu giá trị mã giảm giá

  // Tính toán giá trị mã giảm giá và cập nhật lại tổng tiền
  useEffect(() => {
    if (totalPrice === undefined || isNaN(totalPrice)) {
      setErrorMessage("Không có thông tin thanh toán.");
      return;
    }

    let discountAmount = 0;
    if (selectedVoucher) {
      if (typeof selectedVoucher.discount === 'number') {
        discountAmount = selectedVoucher.discount; // Giảm theo số tiền
      } else if (typeof selectedVoucher.discount === 'string' && selectedVoucher.discount.includes('%')) {
        const percentage = parseInt(selectedVoucher.discount.replace('%', ''), 10);
        discountAmount = (totalPrice * percentage) / 100; // Giảm theo tỷ lệ phần trăm
      }
    }
    setDiscount(discountAmount);
  }, [totalPrice, selectedVoucher]); // Khi totalPrice hoặc selectedVoucher thay đổi, tính toán lại giá trị giảm giá
  
  const calculateFinalPrice = () => {
    if (isNaN(discount)) {
      return totalPrice;  // Trả lại tổng tiền gốc nếu không có giảm giá hợp lệ
    }
    // Cộng thêm giá vé vào tổng tiền sau khi trừ giảm giá
    const ticketPrice = 249000; // Thêm giá vé vào, có thể lấy từ params nếu cần
    return totalPrice - discount + ticketPrice;  // Tính lại tổng tiền sau khi trừ giảm giá và cộng giá vé
  };

  return (
    <View style={styles.container}>

      {/* Phần tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('./image/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Chi tiết thanh toán</Text>
      </View>

      {/* Cuộn thông tin */}
      <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ flexGrow: 1 }}>
        {/* Thông tin giao dịch */}
        <Text style={styles.transactionDetails}>Chi tiết giao dịch</Text>
        <View style={styles.formContainer}>
          {/* Hiển thị thông tin phim, suất chiếu, ghế, và thông tin người nhận */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phim:</Text>
            <Text style={styles.value}>CÔ DÂU HÀO MÔN</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Suất chiếu:</Text>
            <Text style={styles.value}>{selectedTime || 'Không có thông tin'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Rạp:</Text>
            <Text style={styles.value}>{selectedCinema?.name || 'Không có thông tin'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phòng chiếu:</Text>
            <Text style={styles.value}>{selectedSeats?.join(", ") || 'Không có thông tin'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Giá vé:</Text>
            <Text style={styles.value}>249.000đ</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Món ăn:</Text>
            <Text style={styles.value}>
              {selectedCombos?.map((combo, index) => (
                <Text key={index}>{combo.name} - {combo.price}đ{index < selectedCombos.length - 1 ? ", " : ""}</Text>
              ))}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thông tin người nhận:</Text>
            <Text style={styles.value}>{recipient?.name || 'Không có thông tin'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>SĐT:</Text>
            <Text style={styles.value}>{recipient?.phone || 'Không có thông tin'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{recipient?.email || 'Không có thông tin'}</Text>
          </View>
        </View>

        {/* Phương thức thanh toán */}
        <Text style={styles.paymentMethodTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PaymentCDHMScreen')}>
          <View style={styles.paymentContainer}>
            <Image source={require('./image/credit.png')} style={styles.bankImage} />
            <View style={styles.paymentInfo}>
              <Text style={styles.bankName}>Thẻ tín dụng</Text>
              <Text style={styles.accountHolder}>Nhấn để chọn phương thức</Text>
            </View>
            <Image  
              source={require('./image/edit.png')} // Biểu tượng chỉnh sửa
              style={styles.editIcon} 
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer với tổng tiền */}
      <View style={styles.footer}>
        <View style={styles.voucherContainer}>
          <Image 
            source={require('./image/voucher.png')}
            style={styles.voucherImage}
          />
          <Text style={styles.voucherText}>Thêm mã giảm giá</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('SelectVoucher')}
          >
            <Image 
              source={require('./image/add.png')}
              style={styles.addButtonImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalPrice}>{calculateFinalPrice().toLocaleString()}đ</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('SuccessScreen')}>
          <Text style={styles.payButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  backImage: {
    width: 26,
    height: 26,
  }, 
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 180,
  },
  transactionDetails: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    marginLeft: 5, // Căn trái
    marginTop: 20, //
    color: '#797676',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'medium',
    fontSize: 14,
    color: '#7B7979'
  },
  value: {
    fontWeight: 'bold',

  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 5,
  },
  emptyPaymentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#797676',
    fontSize: 16,
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#797676',
    marginLeft: 10, // Căn lề trái cho tiêu đề
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  bankImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  paymentInfo: {
    flex: 1,
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


  editIcon: {
    width: 25,
    height: 25, // Biểu tượng edit
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  voucherImage: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  voucherText: {
    flex: 1,
  },
  addButtonImage: {
    width: 24,
    height: 24,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default PaymentDetailsCam;
