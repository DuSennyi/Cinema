import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CheckInformationCam = ({ route }) => {
  const navigation = useNavigation();
  const {
    selectedDate,
    selectedDay,
    selectedTime,
    selectedCinema,
    selectedCombos,
    selectedSeats,
  } = route.params || {}; // Nếu route.params không tồn tại, gán mặc định

  // Kiểm tra nếu không có dữ liệu, bạn có thể hiển thị thông báo lỗi hoặc điều hướng về trang ComboScreen
  if (!selectedDate || !selectedDay || !selectedTime || !selectedCinema || !Array.isArray(selectedCombos) || !Array.isArray(selectedSeats)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Thông tin không hợp lệ, vui lòng thử lại.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Quay lại ComboScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const ticketPrices = {
    A: 120000, 
    B: 120000, 
    C: 120000, 
    D: 250000, 
    E: 250000, 
    F: 250000, 
    G: 250000, 
    H: 250000, 
    J: 400000
  };
  
  const calculateTotalSeatPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatRow = seat.charAt(0); // Lấy chữ cái đầu tiên (A, B, C, ...) để lấy giá trị
      const seatPrice = ticketPrices[seatRow] || 0;  // Lấy giá từ ticketPrices
      return total + seatPrice;
    }, 0);
  };
  
  const calculateTotalComboPrice = () => {
    return selectedCombos.reduce((total, combo) => {
      const price = combo.newPrice || 0;  // Lấy giá combo
      const quantity = combo.quantity || 0;  // Lấy số lượng combo
      return total + price * quantity;
    }, 0);
  };
  
  const calculateTotalPrice = () => {
    const totalSeatPrice = calculateTotalSeatPrice();
    const totalComboPrice = calculateTotalComboPrice();
    return totalSeatPrice + totalComboPrice;  // Tổng tiền ghế và combo
  };
  
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('./image/back.png')} style={styles.backIconImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin đặt vé</Text>
      </View>

      <View style={styles.mainContent}>
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContainer}>
          {/* Thông tin vé */}
          <View style={styles.ticketInfoContainer}>
            {/* Nửa trên */}
            <View style={styles.ticketUpper}>
              <Image source={require('./film/image/cam1.png')} style={styles.poster} />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>MAI</Text>

                <View style={styles.warningRow}>
                  <Image source={require('./image/18+.png')} style={styles.warningIcon} />
                  <Text style={styles.ageRestriction}>Phim dành cho người xem 18+</Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            {/* Nửa dưới */}
            <View style={styles.ticketLower}>
              <View>
                <Text>Ngày: {selectedDate}</Text>
                <Text>Ngày trong tuần: {selectedDay}</Text>
                <Text>Giờ: {selectedTime}</Text>
                <Text>Rạp: {selectedCinema.name}</Text>
              </View>
              <View style={styles.ticketRight}>
                <Text style={styles.label}>Thể loại:</Text>
                <Text style={styles.value}>Kinh dị</Text>
                <Text style={styles.label}>Số ghế:</Text>
                <Text style={styles.value}>{selectedSeats}</Text>
              </View>
            </View>
          </View>

          {/* Combo bắp nước */}
          <Text style={styles.sectionTitleBold}>Combo bắp nước</Text>
          <View style={styles.comboContainer}>
            {selectedCombos.map((combo) => (
              <View key={combo.id} style={styles.comboRow}>
                <Image source={combo.image} style={styles.comboImage} />
                <Text style={styles.comboText}>
                  {combo.name} - {combo.newPrice.toLocaleString()}đ
                </Text>
                <Text style={styles.comboQuantity}>x{combo.quantity}</Text>
              </View>
            ))}
          </View>

          {/* Thông tin người nhận */}
          <Text style={styles.sectionTitleBold}>Thông tin người nhận</Text>
          <TouchableOpacity style={styles.recipientInfoContainer}>
            <View style={styles.recipientInfoLeft}>
              <Text style={styles.recipientName}>Nguyễn Trung Du</Text>
              <Text style={styles.recipientDetails}>0387813695 - nguyentrungdubn@gmail.com</Text>
            </View>
            <Image source={require('./image/edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </ScrollView>
      </View> 

      {/* Thanh toán */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tạm tính</Text>
          <Text style={styles.totalPrice}>{calculateTotalPrice().toLocaleString()}đ</Text>
        </View>
        <TouchableOpacity
          style={styles.payButton}
  onPress={() => {
    // Truyền tổng tiền và các thông tin cần thiết khi điều hướng đến PaymentDetails
    navigation.navigate('PaymentDetailsCam', {
      totalPrice: calculateTotalPrice(),
      selectedDate,
      selectedDay,
      selectedTime,
      selectedCinema,
      selectedCombos,
      selectedSeats
    });
  }}
>
  <Text style={styles.payButtonText}>Thanh toán</Text>
</TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 15, // Thêm padding trên cho header để không đè lên status bar
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  backIconImage: {
    width: 26, // Kích thước chiều rộng của hình ảnh
    height: 26, // Kích thước chiều cao của hình ảnh
  }, 
   headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingBottom: 141, // Đảm bảo nội dung không bị ẩn dưới footer
  },
  content: {
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 10, // Thêm khoảng cách dưới cùng của ScrollView
  },
  ticketInfoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 25,
    width: '100%', // Điều chỉnh độ rộng
    borderWidth: 1, // Độ dày viền
    borderColor: '#D9D9D9', // Màu viền
  },

  ticketUpper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    width: 95,
    height: 128,
    borderRadius: 8,
  },
  movieDetails: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  theaterInfo: {
    fontSize: 16,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  warningIcon: {
    width: 24,
    height: 24, // Đảm bảo kích thước bằng nhau
    marginRight: 5,
  },
  ageRestriction: {
    color: '#f00',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#797676',
    marginVertical: 15,
  },
  ticketLower: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Thêm alignItems để căn giữa
  },
  ticketLeft: {},
  ticketRight: {},
  label: {
    fontWeight: 'regular',
    color: '#000',
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',

  },
  date: {
    color: '#f00',
    fontWeight: 'bold',

  },
  sectionTitleBold: {
    fontWeight: 'bold', // Đảm bảo in đậm
    fontSize: 14,
    color: '#656363',
    marginBottom: 5,
  },
  comboContainer: {
    width: '100%', // Đảm bảo độ rộng bằng nhau
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1, // Độ dày viền
    borderColor: '#D9D9D9', // Màu viền
      },
  comboRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa hàng
    marginBottom: 10,
  },
  comboImage: {
    width: 50,
    height: 50,
    marginRight: 20,
    marginTop: 15,
    justifyContent: 'center',
  },
  comboText: {
    flex: 1, // Đảm bảo text vừa đủ không gian
  },
  comboQuantity: {
    fontSize: 12,
    color: '#797676',
    marginLeft: 10,
  },

  recipientInfoContainer: {
    width: '100%', // Đảm bảo độ rộng bằng nhau
    height: 70,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1, // Độ dày viền
    borderColor: '#D9D9D9', // Màu viền
},
  recipientInfoLeft: {
    flex: 1,
  },
  recipientName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipientDetails: {
    color: '#797676',
    fontSize: 12,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 141,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 15,
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
    color: '#000', // Màu chữ đen theo yêu cầu
  },
});

export default CheckInformationCam;