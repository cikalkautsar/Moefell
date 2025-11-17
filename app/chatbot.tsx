import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { askGemini } from '../utils/gemini';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text: string;
}

const chatbot = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', from: 'bot', text: 'Assalamualaikum! Saya MoeChat. Ada yang bisa saya bantu?' }
  ]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    saveMessages();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = { id: Date.now().toString(), from: 'user', text: input };
    setMessages(msgs => [...msgs, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askGemini(input);
      const botMessage: Message = { id: (Date.now() + 1).toString(), from: 'bot', text: response };
      setMessages(msgs => [...msgs, botMessage]);
    } catch (error) {
      const errorMsg: Message = { id: (Date.now() + 1).toString(), from: 'bot', text: 'Maaf, terjadi kesalahan.' };
      setMessages(msgs => [...msgs, errorMsg]);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };


  const clearChat = async () => {
    const initialMessage: Message[] = [
      { id: '1', from: 'bot', text: 'Assalamualaikum! Saya Moechat. Ada yang bisa saya bantu?' }
    ];
    setMessages(initialMessage);
    await AsyncStorage.setItem('chatMessages', JSON.stringify(initialMessage));
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.from === 'user' ? styles.userBubble : styles.botBubble
    ]}>
      <Text style={[
        styles.messageText,
        item.from === 'user' ? styles.userText : styles.botText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#5F6F5C" />
        </TouchableOpacity>
        <Image 
          source={require('../assets/images/chatbot.png')} 
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>Moechat</Text>

        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={20} color="#5F6F5C" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Tanyakan Sesuatu..."
          placeholderTextColor="#9EA0A3"
          style={styles.input}
          multiline
          maxLength={500}
          onFocus={() => {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 300);
          }}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={loading || !input.trim()}
        >
          <Text style={styles.sendButtonText}>
            {loading ? '...' : 'Kirim'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EBE4',
  },
  backButton: {
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'PoppinsSemiBold',
    fontSize: 18,
    color: '#5F6F5C',
  },
  clearButton: {
    padding: 8,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginVertical: 6,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#F4C19B',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#C8DBC0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#3F3F3F',
  },
  botText: {
    color: '#3F3F3F',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EBE4',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    color: '#3F3F3F',
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#8FA885',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 14,
    color: '#FFF',
  },
});

export default chatbot;
