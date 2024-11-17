import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 
import { Alert } from 'react-native';
const SeatCDHMScreen = ({route, navigation }) => {  
  // Kiểm tra an toàn khi lấy tham số từ route.params
  const { selectedDate, selectedDay, selectedTime, selectedCinema, selectedCombos } = route.params || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrices = { A: 120000, B: 120000, C: 120000, D: 250000, E: 250000, F: 250000, G: 250000, H: 250000, J: 400000 };
  const seatColors = { A: '#CAE1FF', B: '#CAE1FF', C: '#CAE1FF', D: '#CDCDB4', E: '#CDCDB4', F: '#CDCDB4', G: '#CDCDB4', H: '#CDCDB4', J: '#FF9E93' };
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
  const columns = Array.from({ length: 11 }, (_, i) => 12 - i);
  const seats = rows.map(row => columns.map(col => ({ id: `${row}${col}`, price: ticketPrices[row], color: seatColors[row] })));

  useEffect(() => { 
    StatusBar.setHidden(true); 
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
    
      navigation.navigate('ComboCDHMScreen', {
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('./image/back.png')} style={styles.backIconImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn ghế ngồi</Text>
      </View>

      {/* Màn hình rạp chiếu với hình ảnh, không có chữ "Màn hình" */}
      <View style={styles.screenContainer}>
        <Image source={require('./image/Group 46 (1).png')} style={styles.screenImage} />
      </View>

      {/* Bản đồ ghế ngồi */}
      <View style={styles.seatMap}>
        {seats.map(rowSeats => renderRow(rowSeats))}
      </View>

      {/* Thông tin phim */}
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>CÔ DÂU HÀO MÔN</Text>
        <Text style={styles.movieDetails}>
          {selectedDay}, {selectedDate} - {selectedCinema ? selectedCinema.name : 'Tên Rạp'}
        </Text>
        <Text style={styles.movieDetails}>Suất chiếu: {selectedTime}</Text>
      </View>

      {/* Ghế đã chọn */}
      <View style={styles.selectedSeats}>
        <Text style={styles.label}>Ghế đã chọn:</Text>
        <View style={styles.seatList}>
          {selectedSeats.map(seat => (
            <View key={seat} style={styles.selectedSeatBox}>
              <Text style={styles.selectedSeatText}>{seat}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tổng giá */}
      <View style={styles.summary}>
        <Text style={styles.totalText}>Tổng giá ghế:</Text>
        <Text style={styles.priceText}>{formatCurrency(totalPrice)}</Text>
      </View>

      {/* Nút Tiếp tục */}
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={handleContinue} // Gọi hàm xử lý tiếp tục
      >
        <Text style={styles.continueText}>Tiếp tục</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  backIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  screenContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  screenImage: {
    width: 274,
    height: 50,
    marginBottom: 10, // Tùy chỉnh khoảng cách nếu cần
  },
  seatMap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seat: {
    width: 20,
    height: 21,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  selectedSeat: {
    backgroundColor: '#f7b500',
  },
  seatText: {
    fontSize: 10,
    color: '#333',
  },
  movieInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDetails: {
    fontSize: 14,
    color: '#777',
  },
  selectedSeats: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seatList: {
    flexDirection: 'row',
  },
  selectedSeatBox: {
    backgroundColor: '#f7b500',
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  selectedSeatText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#f7b500',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SeatCDHMScreen;
