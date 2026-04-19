import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../constants/theme";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "../constants/mockData";
import { UserAvatar } from "../components/SlipInUI";

// ── Conversations List ────────────────────────────────────────────────────────
export function ConversationsScreen({ navigation }) {
  const renderConvo = ({ item }) => (
    <TouchableOpacity
      style={styles.convoCard}
      onPress={() => navigation.navigate("Chat", { userId: item.id, userName: item.name })}
      activeOpacity={0.8}
    >
      <UserAvatar initials={item.initials} color={item.color} size={50} online={item.online} />
      <View style={styles.convoInfo}>
        <View style={styles.convoTopRow}>
          <Text style={styles.convoName}>{item.name}</Text>
          <Text style={styles.convoTime}>{item.time}</Text>
        </View>
        <Text style={styles.convoLast} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>{MOCK_CONVERSATIONS.length} conversations</Text>
      </View>
      <FlatList
        data={MOCK_CONVERSATIONS}
        renderItem={renderConvo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ── Individual Chat ───────────────────────────────────────────────────────────
export default function ChatScreen({ route, navigation }) {
  const { userId, userName } = route.params || { userId: "1", userName: "Alex" };
  const [messages, setMessages] = useState(MOCK_MESSAGES[userId] || []);
  const [inputText, setInputText] = useState("");

  const user = MOCK_CONVERSATIONS.find((c) => c.id === userId) || {
    initials: userName?.[0] || "?",
    color: COLORS.neon,
    online: true,
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      from: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate reply after 1.5s
    setTimeout(() => {
      const replies = [
        "That sounds fun! 😊",
        "Where are you right now?",
        "Come find me 😏",
        "I'm near the main stage!",
        "Let's meet up!",
      ];
      const reply = {
        id: `m${Date.now() + 1}`,
        from: "them",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.msgRow, item.from === "me" && styles.msgRowMe]}>
      {item.from === "them" && (
        <UserAvatar initials={user.initials} color={user.color} size={28} />
      )}
      <View
        style={[
          styles.msgBubble,
          item.from === "me" ? styles.msgBubbleMe : styles.msgBubbleThem,
        ]}
      >
        <Text style={[styles.msgText, item.from === "me" && styles.msgTextMe]}>
          {item.text}
        </Text>
        <Text style={styles.msgTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <UserAvatar initials={user.initials} color={user.color} size={36} online={user.online} />
        <View style={styles.chatHeaderInfo}>
          <Text style={styles.chatHeaderName}>{userName}</Text>
          <Text style={styles.chatHeaderStatus}>
            {user.online ? "● Online now" : "● Offline"}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.msgList}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.chatInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.muted}
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
          >
            <Text style={styles.sendBtnText}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { color: COLORS.text, fontSize: 24, fontWeight: "700" },
  headerSubtitle: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  listContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20 },
  convoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  convoInfo: { flex: 1 },
  convoTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  convoName: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  convoTime: { color: COLORS.muted, fontSize: 12 },
  convoLast: { color: COLORS.muted, fontSize: 13 },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.neon,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: { color: COLORS.bg, fontSize: 11, fontWeight: "700" },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  backBtn: { paddingRight: 4 },
  backText: { color: COLORS.neon, fontSize: 22, fontWeight: "700" },
  chatHeaderInfo: { flex: 1 },
  chatHeaderName: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  chatHeaderStatus: { color: COLORS.neon, fontSize: 12, marginTop: 2 },
  msgList: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  msgRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 8,
  },
  msgRowMe: { flexDirection: "row-reverse" },
  msgBubble: {
    maxWidth: "72%",
    borderRadius: 16,
    padding: 12,
  },
  msgBubbleMe: {
    backgroundColor: COLORS.neon,
    borderBottomRightRadius: 4,
  },
  msgBubbleThem: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  msgText: { color: COLORS.muted, fontSize: 14, lineHeight: 20 },
  msgTextMe: { color: COLORS.bg, fontWeight: "500" },
  msgTime: { color: COLORS.muted, fontSize: 10, marginTop: 4, opacity: 0.7 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
    gap: 10,
  },
  chatInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.neon,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: { backgroundColor: COLORS.border },
  sendBtnText: { color: COLORS.bg, fontSize: 18, fontWeight: "700" },
});
