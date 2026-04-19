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
import { MOCK_EVENT_MESSAGES } from "../constants/mockData";
import { UserAvatar } from "../components/SlipInUI";

export default function EventBoardScreen({ navigation }) {
  const [messages, setMessages] = useState(MOCK_EVENT_MESSAGES);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: `e${Date.now()}`,
      from: "me",
      name: "You",
      initials: "ME",
      color: COLORS.neon,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.msgRow, item.from === "me" && styles.msgRowMe]}>
      {item.from !== "me" && (
        <UserAvatar initials={item.initials} color={item.color} size={32} />
      )}
      <View style={styles.msgContent}>
        {item.from !== "me" && (
          <Text style={styles.msgName}>{item.name}</Text>
        )}
        <View style={[styles.msgBubble, item.from === "me" && styles.msgBubbleMe]}>
          <Text style={[styles.msgText, item.from === "me" && styles.msgTextMe]}>
            {item.text}
          </Text>
        </View>
        <Text style={[styles.msgTime, item.from === "me" && { textAlign: "right" }]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Event Board</Text>
          <Text style={styles.headerSubtitle}>Madison Square Garden · 24 people here</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Event banner */}
      <View style={styles.eventBanner}>
        <Text style={styles.eventIcon}>🎵</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.eventName}>Live Concert Night</Text>
          <Text style={styles.eventMeta}>Tonight · Doors open 7PM</Text>
        </View>
        <Text style={styles.eventCount}>24 👥</Text>
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.chatInput}
            placeholder="Say something to the crowd..."
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: { flex: 1 },
  headerTitle: { color: COLORS.text, fontSize: 22, fontWeight: "700" },
  headerSubtitle: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,45,120,0.15)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
    borderWidth: 1,
    borderColor: COLORS.pink + "55",
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.pink },
  liveText: { color: COLORS.pink, fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  eventBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  eventIcon: { fontSize: 28 },
  eventName: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  eventMeta: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  eventCount: { color: COLORS.neon, fontSize: 13, fontWeight: "600" },
  msgList: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  msgRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 12,
  },
  msgRowMe: { flexDirection: "row-reverse" },
  msgContent: { flex: 1 },
  msgName: { color: COLORS.muted, fontSize: 11, marginBottom: 4, marginLeft: 4 },
  msgBubble: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: "flex-start",
    maxWidth: "85%",
  },
  msgBubbleMe: {
    backgroundColor: COLORS.neon,
    borderColor: "transparent",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
  },
  msgText: { color: COLORS.text, fontSize: 14, lineHeight: 20 },
  msgTextMe: { color: COLORS.bg, fontWeight: "500" },
  msgTime: { color: COLORS.muted, fontSize: 10, marginTop: 4, opacity: 0.6 },
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
