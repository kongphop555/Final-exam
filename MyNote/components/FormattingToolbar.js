import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FormattingToolbar({ onFormat }) {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity
        style={styles.toolbarButton}
        onPress={() => onFormat('bold')}
      >
        <Ionicons name="text" size={22} color="#333" />
        <Ionicons name="resize" size={10} color="#333" style={styles.boldIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.toolbarButton}
        onPress={() => onFormat('italic')}
      >
        <Ionicons name="italic" size={22} color="#333" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.toolbarButton}
        onPress={() => onFormat('list')}
      >
        <Ionicons name="list" size={22} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toolbarButton: {
    padding: 8,
    marginRight: 16,
    borderRadius: 4,
  },
  boldIcon: {
    position: 'absolute',
    bottom: 8,
    right: 0,
  },
});