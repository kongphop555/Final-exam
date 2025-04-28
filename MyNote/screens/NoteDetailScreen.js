import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../App';
import FormattingToolbar from '../components/FormattingToolbar';

export default function NoteDetailScreen({ route, navigation }) {
  const { noteId } = route.params;
  const { notes, updateNote, deleteNote } = useContext(NotesContext);
  
  const note = notes.find((n) => n.id === noteId);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    // Set up header right button
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.headerButton}
          >
            <Ionicons name="save-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={confirmDelete}
            style={styles.headerButton}
          >
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, content]);

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }
    
    updateNote(noteId, { title, content });
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteNote(noteId);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleFormatting = (formatType) => {
    if (selection.start === selection.end) {
      // No text selected
      return;
    }

    const selectedText = content.substring(selection.start, selection.end);
    let newText = '';

    switch (formatType) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'list':
        newText = selectedText
          .split('\n')
          .map(line => `• ${line}`)
          .join('\n');
        break;
      default:
        newText = selectedText;
    }

    const newContent = 
      content.substring(0, selection.start) + 
      newText + 
      content.substring(selection.end);
    
    setContent(newContent);
  };

  if (!note) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Note Title"
          placeholderTextColor="#999"
          selectionColor="#007AFF"
        />
        
        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="Start typing..."
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          selectionColor="#007AFF"
          onSelectionChange={(event) => 
            setSelection(event.nativeEvent.selection)
          }
        />
      </ScrollView>
      
      <FormattingToolbar onFormat={handleFormatting} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 8,
  },
  headerButton: {
    marginHorizontal: 8,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    paddingTop: 8,
    minHeight: 300,
  },
});