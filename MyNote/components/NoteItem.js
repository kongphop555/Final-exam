import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function NoteItem({ note, onPress }) {
  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get a preview of the content (first 80 characters)
  const getContentPreview = (content) => {
    if (!content) return '';
    
    // Remove markdown formatting for preview
    let preview = content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1');    // Remove italic
      
    return preview.length > 80
      ? preview.substring(0, 80) + '...'
      : preview;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.date}>
          {formatDate(note.updatedAt)}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {getContentPreview(note.content)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});