import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 
import { Alert } from 'react-native';
const SeatCBCHScreen = ({route, navigation }) => {  
  // Kiểm tra an toàn khi lấy tham số từ route.params
  const { selectedDate, selectedDay, selectedTime, selectedCinema, selectedCombos } = route.params || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrices = { A: 120000, B: 120000, C: 120000, D: 250000, E: 250000, F: 250000, G: 250000, H: 250000, J: 400000 };
  const seatColors = { A: '#rgba(255, 105, 46, 0.4)', B: '#rgba(255, 105, 46, 0.4)', C: '#rgba(255, 105, 46, 0.4)', D: '#rgba(166, 161, 3, 0.15)', E: '#rgba(166, 161, 3, 0.15)', F: '#rgba(166, 161, 3, 0.15)', G: '#rgba(166, 161, 3, 0.15)', H: '#rgba(166, 161, 3, 0.15)', J: '#rgba(255, 158, 147, 0.4)' };
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
  const columns = Array.from({ length: 11 }, (_, i) => 12 - i);
  const seats = rows.map(row => columns.map(col => ({ id: `${row}${col}`, price: ticketPrices[row], color: seatColors[row] })));

  useEffect(() => { 
    StatusBar.setHidden(false); 
    return () => StatusBar.setHidden(false); 
  }, []);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]);
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => total + ticketPrices[seatId.charAt(0)], 0);

  const renderSeat = (seat) => (
    <TouchableOpacity
      key={seat.id}
      style={[
        styles.seat,
        { backgroundColor: seat.color },
        selectedSeats.includes(seat.id) ? styles.selectedSeat : null,
      ]}
      onPress={() => toggleSeatSelection(seat.id)}
    >
      <Text style={styles.seatText}>{seat.id}</Text>
    </TouchableOpacity>
  );

  const renderRow = (rowSeats) => (
    <View key={rowSeats[0].id.charAt(0)} style={styles.row}>
      {rowSeats.map(seat => renderSeat(seat))}
    </View>
  );
  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn ít nhất một ghế trước khi tiếp tục.",
        [{ text: "OK" }]
      );
    } else {
      // Kiểm tra trước khi chuyển tiếp
      console.log('Selected Seats:', selectedSeats);
      console.log('Selected Combos:', selectedCombos);  // Xem giá trị của selectedCombos
    
      navigation.navigate('ComboCBCHScreen', {
        selectedSeats: selectedSeats,
        totalPrice: totalPrice,  // Tổng tiền ghế
        selectedDate: selectedDate,
        selectedDay: selectedDay,
        selectedTime: selectedTime,
        selectedCinema: selectedCinema,
        selectedCombos: selectedCombos,  // Đảm bảo truyền qua selectedCombos
      });
    }
  };
  
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <StatusBar
        barStyle="light-content" // Thay đổi nội dung thành màu sáng (dành cho nền tối)
        backgroundColor="#000" // Màu nền cho Android
        hidden={false} // Đảm bảo thanh trạng thái luôn hiển thị
      />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../image/back.png')} style={styles.backIconImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn ghế ngồi</Text>
      </View>

      <View style={styles.screenContainer}>
        <Image source={require('../../image/Group 46 (1).png')} style={styles.screenImage} />
      </View>

      <View style={styles.seatMap}>
        {seats.map(rowSeats => renderRow(rowSeats))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendTop}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#A9A9A9' }]} />
            <Text style={styles.legendText}>Đã đặt</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#f7b500' }]} />
            <Text style={styles.legendText}>Ghế bạn chọn</Text>
          </View>
        </View>

        <View style={styles.legendBottom}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#rgba(255, 105, 46, 0.4)' }]} />
            <Text style={styles.legendText}>Ghế thường</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#rgba(255, 105, 46, 0.4)' }]} />
            <Text style={styles.legendText}>Ghế VIP</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#rgba(255, 158, 147, 0.4)' }]} />
            <Text style={styles.legendText}>Ghế Sweetbox</Text>
          </View>
        </View>
      </View>
        <View style={styles.separator} />

      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>Cậu Bé Cá Heo</Text>
        <Text style={styles.movieDetails}>
          {selectedDay}, {selectedDate} - {selectedCinema ? selectedCinema.name : 'Tên Rạp'}
        </Text>
      </View>

      <View style={styles.selectedSeats}>
        <Text style={styles.label}>Suất chiếu:</Text>

        <View style={styles.showTimeBox}>
          <Text style={styles.showTimeText}>{selectedTime}</Text>
        </View>
        <Text style={styles.label}>Ghế:</Text>
        
        <View style={styles.seatGrid}>
          {selectedSeats.map((seat, index) => (
            <View key={index} style={styles.seatItemBox}>
              <Text style={styles.selectedSeatText}>{seat}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>

    <View style={styles.summary}>
            <Text style={styles.totalText}>Tạm tính:</Text>
            <Text style={styles.priceText}>{formatCurrency(totalPrice)}</Text>
          </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue} // Gọi hàm xử lý tiếp tục
        >
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Các kiểu chung cho container và bố cục
container: {
  padding: 10, // Khoảng cách xung quanh container
  backgroundColor: '#fff', // Màu nền trắng
  flexGrow: 1, // Cho phép container phát triển để chiếm không gian còn lại
},
header: {
  flexDirection: 'row', // Xếp theo chiều ngang
  alignItems: 'center', // Căn giữa các phần tử trong header
  marginBottom: 20, // Khoảng cách dưới header
},
topBar: {
  flexDirection: 'row', // Xếp theo chiều ngang
  alignItems: 'center', // Căn giữa các phần tử trong top bar
  justifyContent: 'center', // Căn giữa nội dung
  marginBottom: 16, // Khoảng cách dưới top bar
},
backButton: {
  position: 'absolute', // Đặt vị trí của nút quay lại ở vị trí tuyệt đối
  left: 0, // Đặt nút ở phía trái
  padding: 5, // Khoảng cách bên trong nút
},
backIconImage: {
  width: 24, // Kích thước của biểu tượng quay lại
  height: 24, // Kích thước của biểu tượng quay lại
  resizeMode: 'contain', // Điều chỉnh kích thước phù hợp với container
},
headerTitle: {
  flex: 1, // Cho phép tiêu đề chiếm không gian còn lại
  textAlign: 'center', // Căn giữa tiêu đề
  fontSize: 20, // Kích thước chữ tiêu đề
  fontWeight: 'bold', // Chữ đậm
},
title: {
  fontSize: 22, // Kích thước chữ tiêu đề lớn
  fontWeight: 'bold', // Chữ đậm
  marginBottom: 20, // Khoảng cách dưới tiêu đề
  textAlign: 'center', // Căn giữa tiêu đề
},
screenContainer: {
  alignItems: 'center', // Căn giữa các phần tử trong container
  marginBottom: 20, // Khoảng cách dưới container
},
screenImage: {
  width: 274, // Kích thước của hình ảnh
  height: 50, // Kích thước của hình ảnh
  marginBottom: 10, // Khoảng cách dưới hình ảnh
},
showTimeBox: {
  backgroundColor: '#D9D9D9', // Màu nền xám cho hộp giờ chiếu
  padding: 10,
  borderRadius: 10,
  marginBottom: 15,  // Khoảng cách dưới hộp giờ chiếu
  alignItems: 'center', // Căn giữa nội dung trong hộp
  width: 140,         // Chiều rộng của hộp
  height: 40,         // Chiều cao của hộp
},
showTimeText: {
  fontSize: 14,  // Kích thước chữ cho giờ chiếu
  color: '#777',
},
// Bố cục ghế ngồi
seatMap: {
  justifyContent: 'center', // Căn giữa bản đồ ghế ngồi
  alignItems: 'center', // Căn giữa các phần tử trong bản đồ
},
row: {
  flexDirection: 'row', // Xếp các ghế ngồi theo chiều ngang
  justifyContent: 'center', // Căn giữa các ghế ngồi
},
seat: {
  width: 20, // Kích thước ghế
  height: 21, // Kích thước ghế
  margin: 4, // Khoảng cách giữa các ghế
  alignItems: 'center', // Căn giữa các phần tử trong ghế
  justifyContent: 'center', // Căn giữa các phần tử trong ghế
  borderRadius: 4, // Bo góc ghế
},
selectedSeats: {
  marginTop: 20,
},
seatGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',      // Cho phép ghế được chia ra nhiều dòng
  justifyContent: 'center',  // Căn giữa các ô
  marginTop: 10,
},
seatItemBox: {
  backgroundColor: '#D9D9D9', // Màu nền cho từng ghế
  padding: 10,
  margin: 5,
  borderRadius: 10,  // Bo góc mỗi ô
  width: 80,         // Kích thước của từng ô (ghế)
  height: 40,        // Chiều cao của từng ô (ghế)
  justifyContent: 'center',
  alignItems: 'center',
},
selectedSeat: {
  backgroundColor: '#f7b500', // Màu nền cho ghế đã chọn
},
seatText: {
  fontSize: 10, // Kích thước chữ trong ghế
  color: '#333', // Màu chữ trong ghế
},
// Thông tin về phim
movieInfo: {
  alignItems: 'flex-start', // Căn trái các phần tử trong thông tin phim
},
movieTitle: {
  fontSize: 30, // Kích thước chữ tiêu đề phim
  fontWeight: 'bold', // Chữ đậm
  textAlign: 'left', // Căn trái tiêu đề phim
},
movieDetails: {
  fontSize: 14, // Kích thước chữ chi tiết phim
  color: '#777', // Màu chữ chi tiết phim
  textAlign: 'left', // Căn trái chi tiết phim
},


// Các ghế đã chọn
selectedSeats: {
  marginTop: 20, // Khoảng cách trên danh sách ghế đã chọn
},
label: {
  fontSize: 14, // Kích thước chữ của nhãn
  marginBottom: 10, // Khoảng cách dưới nhãn
},
seatList: {
  flexDirection: 'row', // Xếp các ghế trong danh sách theo chiều ngang
},
selectedSeatBox: {
  backgroundColor: '#f7b500', // Màu nền cho hộp ghế đã chọn
  padding: 5, // Khoảng cách bên trong hộp
  marginRight: 5, // Khoảng cách bên phải hộp
  borderRadius: 5, // Bo góc hộp
},
selectedSeatText: {
  color: '#777', // Màu chữ trong hộp ghế đã chọn
},
// Tóm tắt giá tiền
summary: {
  flexDirection: 'row', // Xếp các phần tử tóm tắt theo chiều ngang
  justifyContent: 'space-between', // Căn đều các phần tử tóm tắt
  marginBottom: 10, // Khoảng cách dưới tóm tắt
},
totalText: {
  fontSize: 15, // Kích thước chữ tổng giá
},
priceText: {
  fontSize: 18, // Kích thước chữ giá tiền
},
// Nút Tiếp tục
continueButton: {
  backgroundColor: '#ffc107', // Màu nền vàng cho nút
  paddingVertical: 15, // Khoảng cách theo chiều dọc
  borderRadius: 10, // Bo góc nút
  alignItems: 'center', // Căn giữa nội dung trong nút
},
continueButtonText: {
  fontSize: 16, // Kích thước chữ trong nút
  fontWeight: 'bold', // Chữ đậm
  color: '#000', // Màu chữ đen
},
// Footer
footer: {
  height: 105, // Chiều cao của footer
  backgroundColor: '#fff', // Màu nền trắng cho footer
  borderTopWidth: 2, // Đường viền trên footer
  borderTopColor: '#ddd', // Màu đường viền xám nhạt
  justifyContent: 'flex-end', // Căn các phần tử trong footer về phía dưới cùng
  paddingBottom: 15,
},
// Các mục Legend (Chú thích)
legend: {
  flexDirection: 'column', // Xếp các mục theo chiều dọc
  marginVertical: 20, // Khoảng cách trên và dưới
},
legendTop: {
  flexDirection: 'row', // Xếp các mục nằm ngang
  justifyContent: 'flex-start', // Các mục nằm sát trái
  marginBottom: 10, // Khoảng cách dưới các mục trên
  gap: 80, // Khoảng cách giữa các mục
},
legendBottom: {
  flexDirection: 'row', // Xếp các mục nằm ngang
  justifyContent: 'space-between', // Căn đều các mục trong phần dưới
},
legendItem: {
  flexDirection: 'row', // Xếp các phần tử trong legend theo chiều ngang
  alignItems: 'center', // Căn giữa các phần tử
},
legendColor: {
  width: 20, // Kích thước hình vuông màu
  height: 20, // Kích thước hình vuông màu
  marginRight: 5, // Khoảng cách bên phải
  borderRadius: 4, // Bo góc màu
},
legendText: {
  fontSize: 12, // Kích thước chữ chú thích
  color: '#333', // Màu chữ chú thích
},
// Đường phân cách
separator: {
  borderBottomWidth: 2, // Độ dày của đường phân cách
  borderBottomColor: '#ddd', // Màu sắc của đường phân cách
  marginVertical: 20, // Khoảng cách trên và dưới đường phân cách
  marginTop: 1, // Khoảng cách phía trên đường phân cách
},

});

export default SeatCBCHScreen;
