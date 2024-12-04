import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, FlatList, Image, StyleSheet } from 'react-native';

const PaymentModal = ({ visible, onClose, onSelect, modalOption }) => {
  const paymentMethods = [
    { id: 1, name: 'Techcombank', holder: 'Nguyễn Trung Du', number: '6830092004', icon: require('../../image/techcombank.png') },
    { id: 2, name: 'MOMO', holder: 'Nguyễn Trung Du', number: '0387 813 695', icon: require('../../image/momo.png') },
    { id: 3, name: 'Tiền mặt', holder: '', note: 'Giữ ghế tới 12 giờ', icon: require('../../image/cash.png') },
  ];

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn phương thức thanh toán</Text>
          <FlatList
            data={paymentMethods}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.methodItem} onPress={() => onSelect(item)}>
                <Image source={item.icon} style={styles.methodIcon} />
                <Text style={styles.methodName}>{item.name}</Text>
                {modalOption && modalOption.id === item.id && (
                  <Text style={styles.selectedText}>Đã chọn</Text>
                )}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};




const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: 'white', width: '90%', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  methodItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  methodIcon: { width: 40, height: 40, marginRight: 10 },
  methodName: { fontSize: 16, fontWeight: 'bold' },
  methodHolder: { fontSize: 14 },
  methodNumber: { fontSize: 14, color: 'gray' },
  methodNote: { fontSize: 12, color: 'red' },
  closeButton: { marginTop: 10, alignItems: 'center', padding: 10, backgroundColor: '#ffc107', borderRadius: 5 },
  closeButtonText: { color: 'white', fontSize: 16 },
});

export default PaymentModal;