import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SelectShowTimesMaiScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("15/04");
  const [selectedDay, setSelectedDay] = useState('T2'); // State to hold the selected day (T2, T3...)
  const [selectedTime, setSelectedTime] = useState("Tất cả");
  const [availableTimes, setAvailableTimes] = useState([]); // Store times available for the selected day
  const [selectedCinema, setSelectedCinema] = useState(null); // Store selected cinema
  const [selectedTab, setSelectedTab] = useState('Suất chiếu');

  const dates = [
    { day: 'CN', date: '14/04' },
    { day: 'T2', date: '15/04' },
    { day: 'T3', date: '16/04' },
    { day: 'T4', date: '17/04' },
    { day: 'T5', date: '18/04' },
    { day: 'T6', date: '19/04' },
    { day: 'T7', date: '20/04' },
    { day: 'CN', date: '21/04' },
  ];

  const times = ['Tất cả', '9:00 - 10:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00'];

  const cinemas = [
    {
        id: '1',
        name: 'Beta Mỹ Đình',
        address: 'Tầng hầm B1, tòa nhà Golden Palace, Đường Mễ Trì, Phạm Hùng, Nam Từ Liêm',
        distance: '1.0 km',
        logo: require('../../assets/Home/beta.png'),
        showtimes: {
            'T2': ['9:00 - 10:00', '11:00 - 13:00', '14:00 - 16:00'],
            'T3': ['9:30 - 11:30', '13:30 - 15:30'],
            'T4': ['10:00 - 12:00', '13:30 - 16:00', '17:00 - 19:00'],
            'T5': ['9:00 - 10:30', '12:00 - 14:00'],
            'T6': ['11:00 - 13:00', '15:00 - 17:00'],
            'T7': ['10:00 - 12:00', '14:00 - 16:00'],
            'CN': ['11:00 - 13:00', '15:00 - 17:00'],
        }
    },
    {
        id: '2',
        name: 'Beta Thanh Xuân',
        address: 'Tầng hầm B1, tòa nhà Golden West, Lê Văn Lương, Thanh Xuân',
        distance: '2.1 km',
        logo: require('../../assets/Home/beta.png'),
        showtimes: {
            'T2': ['9:30 - 11:30', '13:30 - 15:30'],
            'T3': ['10:00 - 12:00', '14:00 - 16:00'],
            'T4': ['9:00 - 10:00', '13:00 - 15:00'],
            'T5': ['11:00 - 13:00', '16:00 - 18:00'],
            'T6': ['9:30 - 11:30', '14:30 - 16:30'],
            'T7': ['10:00 - 12:00', '13:30 - 15:30'],
            'CN': ['12:00 - 14:00', '16:00 - 18:00'],
        }
    },
    {
        id: '3',
        name: 'Beta Giải Phóng',
        address: 'Tầng 3, tòa IP2, chung cư Imperial, 360 Giải Phóng',
        distance: '2.5 km',
        logo: require('../../assets/Home/beta.png'),
        showtimes: {
            'T2': ['9:00 - 11:00', '13:00 - 15:00'],
            'T3': ['10:00 - 12:00', '14:00 - 16:00'],
            'T4': ['9:00 - 11:00', '12:00 - 14:00', '16:00 - 18:00'],
            'T5': ['11:30 - 13:30', '14:30 - 16:30'],
            'T6': ['9:00 - 11:00', '15:00 - 17:00'],
            'T7': ['12:00 - 14:00', '16:00 - 18:00'],
            'CN': ['10:00 - 12:00', '14:00 - 16:00'],
        }
    },
    {
        id: '4',
        name: 'Beta Đan Phượng',
        address: 'Tầng 2 tòa HH4, khu đô thị XPHomes',
        distance: '3.0 km',
        logo: require('../../assets/Home/beta.png'),
        showtimes: {
            'T2': ['10:00 - 12:00', '14:00 - 16:00'],
            'T3': ['9:00 - 11:00', '13:30 - 15:30'],
            'T4': ['11:00 - 13:00', '15:00 - 17:00'],
            'T5': ['10:30 - 12:30', '14:00 - 16:00'],
            'T6': ['9:00 - 11:00', '13:00 - 15:00'],
            'T7': ['10:00 - 12:00', '13:30 - 15:30'],
            'CN': ['12:00 - 14:00', '16:00 - 18:00'],
        }
    },
    {
        id: '5',
        name: 'CGV Aeon Mall',
        address: 'Tầng 4, AEON Mall Hà Đông, Đường Phú Lãm, Hà Đông',
        distance: '5.0 km',
        logo: require('../../assets/Home/cgv.png'),
        showtimes: {
            'T2': ['9:30 - 11:30', '14:00 - 16:00'],
            'T3': ['10:00 - 12:00', '13:00 - 15:00'],
            'T4': ['11:00 - 13:00', '15:00 - 17:00'],
            'T5': ['9:00 - 11:00', '14:00 - 16:00'],
            'T6': ['10:30 - 12:30', '16:00 - 18:00'],
            'T7': ['9:00 - 11:00', '13:30 - 15:30'],
            'CN': ['11:00 - 13:00', '15:00 - 17:00'],
        }
    },
    {
        id: '6',
        name: 'CGV Vincom Mega Mall',
        address: 'Tầng 3, Vincom Mega Mall, 232 Đường Đỗ Xuân Hợp, Quận 9',
        distance: '8.5 km',
        logo: require('../../assets/Home/cgv.png'),
        showtimes: {
            'T2': ['12:00 - 14:00', '16:00 - 18:00'],
            'T3': ['10:00 - 12:00', '14:30 - 16:30'],
            'T4': ['9:30 - 11:30', '13:00 - 15:00'],
            'T5': ['11:00 - 13:00', '15:00 - 17:00'],
            'T6': ['10:30 - 12:30', '14:00 - 16:00'],
            'T7': ['9:00 - 11:00', '12:00 - 14:00'],
            'CN': ['10:30 - 12:30', '14:00 - 16:00'],
        }
    },
    {
        id: '7',
        name: 'NCC Cinemas',
        address: 'Tầng 2, tòa nhà T1, Khu đô thị Phú Lương, Hà Đông',
        distance: '4.5 km',
        logo: require('../../assets/Home/ncc.png'),
        showtimes: {
            'T2': ['9:00 - 10:00', '12:00 - 14:00'],
            'T3': ['10:00 - 12:00', '14:00 - 16:00'],
            'T4': ['9:00 - 11:00', '13:00 - 15:00'],
            'T5': ['10:30 - 12:30', '15:00 - 17:00'],
            'T6': ['9:00 - 11:00', '14:00 - 16:00'],
            'T7': ['10:00 - 12:00', '13:30 - 15:30'],
            'CN': ['12:00 - 14:00', '16:00 - 18:00'],
        }
    },
    {
        id: '8',
        name: 'Lotte Cinema',
        address: 'Tầng 3, Lotte Mart Hà Đông, Đường Nguyễn Khuyến, Hà Đông',
        distance: '6.0 km',
        logo: require('../../assets/Home/lotte.png'),
        showtimes: {
            'T2': ['10:00 - 12:00', '14:00 - 16:00'],
            'T3': ['9:00 - 11:00', '13:00 - 15:00'],
            'T4': ['10:30 - 12:30', '14:00 - 16:00'],
            'T5': ['9:00 - 11:00', '15:00 - 17:00'],
            'T6': ['11:00 - 13:00', '16:00 - 18:00'],
            'T7': ['10:00 - 12:00', '13:30 - 15:30'],
            'CN': ['11:00 - 13:00', '15:00 - 17:00'],
        }
    },
    {
        id: '9',
        name: 'BHD Star',
        address: 'Tầng 5, Vincom Center, 191 Bà Triệu, Hai Bà Trưng',
        distance: '7.0 km',
        logo: require('../../assets/Home/bhd.png'),
        showtimes: {
            'T2': ['9:30 - 11:30', '13:30 - 15:30'],
            'T3': ['10:00 - 12:00', '14:30 - 16:30'],
            'T4': ['11:00 - 13:00', '15:00 - 17:00'],
            'T5': ['9:00 - 11:00', '14:00 - 16:00'],
            'T6': ['10:30 - 12:30', '15:00 - 17:00'],
            'T7': ['9:00 - 11:00', '13:30 - 15:30'],
            'CN': ['12:00 - 14:00', '16:00 - 18:00'],
        }
    },
];


  // Filter available times based on selected day
  useEffect(() => {
    const availableTimesForDay = [];
    cinemas.forEach(cinema => {
      const showtimesForDay = cinema.showtimes[selectedDay];
      if (showtimesForDay) {
        showtimesForDay.forEach(time => {
          if (!availableTimesForDay.includes(time)) {
            availableTimesForDay.push(time);
          }
        });
      }
    });
    setAvailableTimes(availableTimesForDay);
    setSelectedTime("Tất cả"); // Reset selected time when day changes
    setSelectedCinema(null);  // Reset selected cinema when day changes
  }, [selectedDay]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === 'Thông tin') {
      navigation.navigate('Mai', {
        selectedDate,
        selectedDay,
        selectedTime,
        selectedCinema
      });
    }
  };

  const filteredCinemas = cinemas.filter(cinema => {
    const availableShowtimes = cinema.showtimes[selectedDay] || [];
    return selectedTime === 'Tất cả' || availableShowtimes.includes(selectedTime);
  });
  const canProceed = selectedDate && selectedTime !== 'Tất cả' && selectedCinema;
  const handleContinue = () => {
    navigation.navigate('SeatScreen', {
      selectedDate,
      selectedDay,
      selectedTime,
      selectedCinema
    });
  };
  
  
  return (
    <ScrollView style={styles.container}>
      {/* Hiển thị StatusBar */}
      <StatusBar
        barStyle="light-content" // Thay đổi nội dung thành màu sáng (dành cho nền tối)
        backgroundColor="#000" // Màu nền cho Android
        hidden={false} // Đảm bảo thanh trạng thái luôn hiển thị
      />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Mai')}>
          <Image source={require('../../image/back.png')} style={styles.backIconImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn Suất chiếu</Text>

      </View>

      <View style={styles.movieInfo}>
        <Image source={require('../../image/mai1.png')} style={styles.movieImage} />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>Mai</Text>
          <Text style={styles.movieRating}>⭐⭐⭐⭐</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={selectedTab === 'Thông tin' ? styles.tabActive : styles.tabInactive}
          onPress={() => handleTabChange('Thông tin')}
        >
          <Text style={styles.tabText}>Thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'Suất chiếu' ? styles.tabActive : styles.tabInactive}
          onPress={() => setSelectedTab('Suất chiếu')}
        >
          <Text style={styles.tabText}>Suất chiếu</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Ngày xem:</Text>
      <ScrollView horizontal style={styles.dateContainer}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date.date}
            style={[styles.dateButton, selectedDate === date.date && styles.dateButtonActive]}
            onPress={() => {
              setSelectedDate(date.date);
              setSelectedDay(date.day);
            }}
          >
            <Text style={styles.dateDay}>{date.day}</Text>
            <Text style={styles.dateText}>{date.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Giờ xem:</Text>
      <ScrollView horizontal style={styles.timeContainer}>
        {availableTimes.length > 0 ? (
          availableTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeButton, selectedTime === time && styles.timeButtonActive]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTimes}>Không có suất chiếu cho ngày này.</Text>
        )}
      </ScrollView>

      <Text style={styles.sectionTitle}>Rạp:</Text>
      <View style={styles.cinemaContainer}>
  {filteredCinemas.length === 0 ? (
    <Text style={styles.noResults}>Không có suất chiếu cho giờ này.</Text>
  ) : (
    filteredCinemas.map((cinema, index) => {
      const availableShowtimes = cinema.showtimes[selectedDay] || [];
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.cinemaCard,
            selectedCinema?.id === cinema.id && styles.cinemaCardActive, // Áp dụng viền vàng khi rạp được chọn
          ]}
          onPress={() => setSelectedCinema(cinema)}
        >
          <View style={styles.cinemaHeader}>
            <Image source={cinema.logo} style={styles.cinemaLogo} />
            <View style={styles.cinemaDetails}>
              <Text style={styles.cinemaName}>{cinema.name}</Text>
              <Text style={styles.cinemaDistance}>{cinema.distance}</Text>
              <Text style={styles.cinemaAddress}>{cinema.address}</Text>
            </View>
          </View>

          <View style={styles.showTimesContainer}>
            {availableShowtimes.map((showTime, i) => (
              <TouchableOpacity key={i} style={styles.showTimeButton}>
                <Text style={styles.showTimeText}>{showTime}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      );
    })
  )}
      </View>
      <View style={styles.footer}>
        {canProceed && (
          <TouchableOpacity 
              style={styles.payButton}
              onPress={handleContinue}  // Hoặc bạn có thể thay thế bằng navigation.navigate nếu cần
          >
              <Text style={styles.payButtonText}>Đặt vé</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 100, // Ensures space for the button at the bottom
  },
    continueButton: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: '#f1c40f',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {
    right: 10,
    top: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  movieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  movieImage: {
    width: 51,
    height: 50,
    borderRadius: 5,
  },
  movieDetails: {
    marginLeft: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  movieRating: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: '#f1c40f',
    paddingBottom: 5,
    marginRight: 10,
    paddingHorizontal: 50,
  },
  tabInactive: {
    paddingBottom: 5,
    marginRight: 10,
    paddingHorizontal: 50,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dateButton: {
    alignItems: 'center',
    padding: 8,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  dateButtonActive: {
    backgroundColor: '#f1c40f',
  },
  dateDay: {
    fontSize: 12,
    color: '#666',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 10,
  },
  timeButton: {
    padding: 8,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
  },
  timeButtonActive: {
    backgroundColor: '#f1c40f',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noTimes: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  cinemaContainer: {
    marginTop: 10,
  },
  cinemaCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'column', // Stack elements vertically (logo, name, address, distance, showtimes)
    position: 'relative', // Required for absolute positioning of the distance
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  cinemaHeader: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically align the logo and text
    marginBottom: 5,
  },
  cinemaName: {
    fontSize: 16,
    fontWeight: '600',
  },
  cinemaLogo: {
    width: 55,
    height: 52,
    marginRight: 10, // Space between the logo and text
  },
  cinemaDistance: {
    fontSize: 14,
    color: '#888',
  },
  cinemaDetails: {
    flex: 1, // Allow the details to take up the remaining space
  },
  cinemaAddress: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  cinemaCardActive: {
    borderColor: '#f1c40f', // Viền vàng khi rạp được chọn
    borderWidth: 2,
  },
  showTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  showTimeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  showTimeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noResults: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    padding: 5,
  },
  backIconImage: {
    width: 24,
    height: 24,
  },
  footer: {
    height: 105,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 15,
    bottom: 0,
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

export default SelectShowTimesMaiScreen;
