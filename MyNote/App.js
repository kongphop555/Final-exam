import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';
import CreateNoteScreen from './screens/CreateNoteScreen';

// Create a context for notes
export const NotesContext = createContext();

const Stack = createStackNavigator();

const initialNotes = [
  {
    id: '1',
    title: 'How to make your personal brand stand out online',
    content: '',
    date: 'May 21, 2020',
    color: '#FFB6B3',
  },
  {
    id: '2',
    title: 'Beautiful weather app UI concepts we wish existed',
    content: '',
    date: 'Mar 18, 2020',
    color: '#FFD59E',
  },
  {
    id: '3',
    title: '10 excellent font pairing tools for designers',
    content: '',
    date: 'Feb 01, 2020',
    color: '#E9F59A',
  },
  {
    id: '4',
    title: "Spotify's Reema Bhagat on product design, music, and the key to a happy career",
    content: '',
    date: 'Feb 01, 2020',
    color: '#B6F0F7',
  },
  {
    id: '5',
    title: '12 eye-catching mobile wallpaper',
    content: '',
    date: 'Feb 01, 2020',
    color: '#D1B3FF',
  },
  {
    id: '6',
    title: 'Design For Good: Join The Face Mask Challenge',
    content: '',
    date: 'Feb 01, 2020',
    color: '#FFB6B3',
  },
];

export default function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes from storage on app start
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Save notes to storage whenever they change
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
      } catch (error) {
        console.error('Failed to save notes:', error);
      }
    };

    if (!isLoading) {
      saveNotes();
    }
  }, [notes, isLoading]);

  // Note operations
  const addNote = (note) => {
    const newNote = {
      id: Date.now().toString(),
      title: note.title,
      content: note.content,
      date: new Date().toLocaleDateString(),
      color: note.color || '#FFD59E',
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: updatedNote.title,
              content: updatedNote.content,
              date: new Date().toLocaleDateString(),
            }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#181818', // Black header
            },
            headerTintColor: '#fff',      // White text/icons
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Notes' }}
          />
          <Stack.Screen
            name="NoteDetail"
            component={NoteDetailScreen}
            options={{ title: 'Note' }}
          />
          <Stack.Screen
            name="CreateNote"
            component={CreateNoteScreen}
            options={{ title: 'Create Note' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesContext.Provider>
  );
}