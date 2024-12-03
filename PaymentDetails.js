import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import PaymentModal from './PaymentModal';

const PaymentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { 
    selectedDate, 
    selectedDay, 
    selectedTime, 
    selectedCinema, 
    selectedCombos, 
    selectedSeats, 
    totalPrice, 
    recipient, 
    selectedVoucher,
    selectedPayment // Thêm tham số này 
  } = route.params || {};

  const [errorMessage, setErrorMessage] = useState(null);
  const [finalPrice, setFinalPrice] = useState(totalPrice || 0); 
  const [discount, setDiscount] = useState(0);  
  const [voucherList, setVoucherList] = useState([  
    { id: 1, title: 'Giảm 10k', condition: 'Đơn tối thiểu 100k', image: require('./image/voucher1.png'), discount: 10000, minAmount: 100000 },
    { id: 2, title: 'Giảm 10%', condition: 'Đơn tối thiểu 100k', image: require('./image/voucher2.png'), discount: '10%', minAmount: 100000 },
    { id: 3, title: 'Giảm 20k', condition: 'Thành viên mới', image: require('./image/voucher3.png'), discount: 20000, isNewMember: true },
    { id: 4, title: 'Giảm 50k', condition: 'Đơn tối thiểu 300k', image: require('./image/voucher4.png'), discount: 50000, minAmount: 300000 },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setModalVisible(false);
  };
  

  const [selectedVoucherState, setSelectedVoucherState] = useState(null);

  useEffect(() => {
    if (totalPrice === undefined || isNaN(totalPrice)) {
      setErrorMessage("Không có thông tin thanh toán.");
      return;
    }

    let discountAmount = 0;
    if (selectedVoucherState) {
      if (typeof selectedVoucherState.discount === 'number') {
        discountAmount = selectedVoucherState.discount; 
      } else if (typeof selectedVoucherState.discount === 'string' && selectedVoucherState.discount.includes('%')) {
        const percentage = parseInt(selectedVoucherState.discount.replace('%', ''), 10);
        discountAmount = (totalPrice * percentage) / 100; 
      }
    }
    setDiscount(discountAmount);
  }, [totalPrice, selectedVoucherState]);

  const calculateFinalPrice = () => {
    if (isNaN(discount)) {
      return totalPrice; 
    }
    const ticketPrice = 0; 
    const comboPrice = selectedCombos?.reduce((sum, combo) => sum + combo.price, 0) || 0; 
    return totalPrice - discount + ticketPrice + comboPrice;
  };

  const applyVoucher = (voucher) => {
    // Kiểm tra điều kiện của voucher
    if (voucher.minAmount && totalPrice < voucher.minAmount) {
      Alert.alert('Không đủ điều kiện', `Đơn hàng của bạn phải có giá trị tối thiểu ${voucher.minAmount.toLocaleString('vi-VN')}đ để áp dụng voucher "${voucher.title}".`);
      return;
    }

    if (selectedVoucherState && selectedVoucherState.id === voucher.id) {
      // Nếu voucher đã được chọn, bỏ chọn nó
      setSelectedVoucherState(null);
      setDiscount(0); // Bỏ giảm giá
    } else {
      // Chọn voucher mới
      setSelectedVoucherState(voucher);
    }
    setFinalPrice(calculateFinalPrice());
  };

  
  const handleConfirm = async () => {
    // Kiểm tra xem người dùng đã chọn phương thức thanh toán chưa
    if (!selectedPaymentMethod) {
      Alert.alert("Thông báo", "Vui lòng chọn phương thức thanh toán trước khi xác nhận.");
      return;
    }
  
    // Kiểm tra thiết bị có hỗ trợ xác thực không
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert("Thiết bị không hỗ trợ xác thực vân tay hoặc mật khẩu.");
      return;
    }
  
    // Kiểm tra thiết bị có dữ liệu vân tay/mật khẩu không
    const biometrics = await LocalAuthentication.isEnrolledAsync();
    if (!biometrics) {
      Alert.alert("Không tìm thấy dữ liệu vân tay hoặc mật khẩu.");
      return;
    }
  
    // Thực hiện xác thực
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Xác nhận thanh toán",
      cancelLabel: "Hủy",
      fallbackLabel: "Nhập mật khẩu",
    });
  
    if (result.success) {
      // Chuyển đến màn hình thành công nếu xác thực thành công
      navigation.navigate("SuccessScreen");
    } else {
      Alert.alert("Xác thực thất bại. Vui lòng thử lại.");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('./image/back.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Chi tiết thanh toán</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ flexGrow: 1 }}>
        <Text style={styles.transactionDetails}>Chi tiết giao dịch</Text>
        <View style={styles.formContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phim:</Text>
            <Text style={styles.value}>Mai</Text>
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
            <Text style={styles.value}>|1| - {selectedSeats?.join(", ") || 'Không có thông tin'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Giá vé:</Text>
            <Text style={styles.value}>{calculateFinalPrice().toLocaleString()}đ</Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Món ăn:</Text>
            <Text style={styles.value}>
              {selectedCombos?.map((combo, index) => (
                <Text key={index}>{combo.name} {combo.price}{index < selectedCombos.length - 1 ? ", " : ""}</Text>
              ))}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thông tin người nhận:</Text>
            <Text style={styles.value}>{recipient?.name || 'Nguyễn Trung Du'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>SĐT:</Text>
            <Text style={styles.value}>{recipient?.phone || '0387813695'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{recipient?.email || 'nguyentrungdubn@gmail.com'}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.paymentContainer}>
            <Image source={selectedPaymentMethod?.icon || require('./image/credit.png')} style={styles.bankImage} />
            <View style={styles.paymentInfo}>
              <Text style={styles.bankName}>{selectedPaymentMethod?.name || 'Chọn phương thức thanh toán'}</Text>
              <Text style={styles.accountHolder}>Nhấn để chọn phương thức</Text>
            </View>
          </View>
        </TouchableOpacity>

        <PaymentModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={handleSelectPaymentMethod}
          modalOption={selectedPaymentMethod || {}} // Ensure that modalOption is never undefined
        />


        {/* Danh sách mã giảm giá */}
        <Text style={styles.voucherText}>Mã giảm giá:</Text>
        <View style={styles.voucherList}>
          {voucherList.map((voucher) => (
            <TouchableOpacity 
              key={voucher.id} 
              onPress={() => applyVoucher(voucher)} 
              style={[styles.voucherItem, selectedVoucherState?.id === voucher.id && styles.selectedVoucher]}
            >
              <Image source={voucher.image} style={styles.voucherImage} />
              <View style={styles.voucherInfo}>
                <Text style={styles.voucherTitle}>{voucher.title}</Text>
                <Text style={styles.voucherCondition}>{voucher.condition}</Text>
              </View>
              <Text style={styles.voucherDiscount}>
                {typeof voucher.discount === 'number' 
                  ? `${voucher.discount.toLocaleString('vi-VN')}đ` 
                  : voucher.discount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng tiền:</Text>
            <Text style={styles.totalPrice}>{totalPrice.toLocaleString()}đ</Text>
          </View>

        <View style={styles.discountContainer}>
          <Text style={styles.discountLabel}>Tiền sau giảm giá:</Text>
          <Text style={styles.discountPrice}>{(totalPrice - discount).toLocaleString()}đ</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handleConfirm}>
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
  voucherList: {
    marginVertical: 10,
  },
  voucherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  selectedVoucher: {
    borderColor: '#FF5722',
    backgroundColor: '#FFEBEE',
  },
  voucherImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  voucherInfo: {
    flex: 1,
  },
  voucherTitle: {
    fontSize: 14, // Align with Phương thức thanh toán
    fontWeight: 'bold',
  },
  voucherCondition: {
    fontSize: 14, // Align with Phương thức thanh toán
    color: '#888',
  },
  voucherDiscount: {
    fontSize: 16, // Same size as Tổng tiền
    color: '#FF5722',
    fontWeight: 'bold',
  },
  discountPrice: {
    fontSize: 16, // Align with "Tiền khi giảm giá"
    fontWeight: 'bold',
    color: '#FF5722',
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
    flexDirection: 'row', // Align in a row
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  totalPrice: {
    fontSize: 16, // Align with "Tiền khi giảm giá"
    fontWeight: 'bold',
    color: '#FF5722',
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
  discountContainer: {
    flexDirection: 'row', // Align in a row
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  discountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  discountRow: {
    flexDirection: 'row', // Same row for Tiền khi giảm giá and price
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PaymentDetails;
