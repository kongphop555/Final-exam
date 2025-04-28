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

export default function CreateNoteScreen({ navigation }) {
  const { addNote } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  useEffect(() => {
    // Set up header right button
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSave}
          style={styles.headerButton}
        >
          <Ionicons name="save-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content]);

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }
    
    addNote({ title, content });
    navigation.goBack();
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
  headerButton: {
    marginRight: 16,
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