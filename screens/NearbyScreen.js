import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../constants/theme";
import { MOCK_USERS } from "../constants/mockData";

export default function NearbyScreen({ navigation, route }) {
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);

  useEffect(() => {
    if (route.params?.appliedFilters) {
      const { minAge, maxAge, selectedInterests, selectedGender, isReset } = route.params.appliedFilters;

      // Agar Reset dabaya hai toh original data wapis le aao
      if (isReset) {
        setFilteredUsers(MOCK_USERS);
        return;
      }

      // Filter Logic
      const result = MOCK_USERS.filter((user) => {
        const ageMatch = user.age >= minAge && user.age <= maxAge;
        const interestMatch = selectedInterests.length === 0 || 
          user.tags.some(tag => selectedInterests.includes(tag));
        const genderMatch = selectedGender === "Other" || user.gender === selectedGender;

        return ageMatch && interestMatch && genderMatch;
      });

      setFilteredUsers(result);
    }
  }, [route.params?.appliedFilters]);

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <TouchableOpacity
        style={styles.userContent}
        onPress={() => navigation.navigate("Chat", { userId: item.id, userName: item.name })}
      >
        <View style={styles.avatarWrapper}>
          <View style={[styles.avatarCircle, { backgroundColor: item.color || '#8E54E9' }]}>
            <Text style={styles.avatarInitial}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.onlineDot} />
        </View>

        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{item.name}, {item.age}</Text>
            <View style={styles.distanceWrapper}>
                <Text style={styles.distanceText}>{item.distance}</Text>
                <Text style={styles.timeText}>Just now</Text>
            </View>
          </View>
          <Text style={styles.userGender}>{item.gender || 'Woman'}</Text>
          <Text style={styles.userBio} numberOfLines={2}>{item.bio}</Text>
          <View style={styles.tagsRow}>
            {item.tags.map((tag, index) => (
              <View key={index} style={[styles.tagPill, { backgroundColor: tag === "Slip Away" ? "rgba(62, 255, 210, 0.2)" : "rgba(255, 62, 255, 0.2)" }]}>
                <Text style={[styles.tagPillText, { color: tag === "Slip Away" ? "#3EFFD2" : "#FF3EFF" }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.messageIcon}>💬</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.headerTitle}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterHeaderBtn} onPress={() => navigation.navigate("FilterModal")}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.countText}>{filteredUsers.length} people in your area</Text>
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#04051B" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backArrow: { color: "#FFFFFF", fontSize: 24, marginRight: 15 },
  headerTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold" },
  filterHeaderBtn: { borderWidth: 1.5, borderColor: "#3EFFD2", paddingHorizontal: 18, paddingVertical: 6, borderRadius: 20 },
  filterText: { color: "#3EFFD2", fontWeight: "bold" },
  countText: { color: "#8A90AF", paddingHorizontal: 20, marginBottom: 15, fontSize: 14 },
  listContent: { paddingBottom: 20 },
  userContainer: { paddingHorizontal: 20 },
  userContent: { flexDirection: "row", paddingVertical: 15, position: "relative" },
  avatarWrapper: { position: "relative" },
  avatarCircle: { width: 65, height: 65, borderRadius: 32.5, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.1)" },
  avatarInitial: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  onlineDot: { position: "absolute", bottom: 5, right: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: "#3EFFD2", borderWidth: 2, borderColor: "#04051B" },
  userInfo: { flex: 1, marginLeft: 15 },
  nameRow: { flexDirection: "row", justifyContent: "space-between" },
  userName: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  distanceWrapper: { alignItems: "flex-end" },
  distanceText: { color: "#3EFFD2", fontSize: 13, fontWeight: "600" },
  timeText: { color: "#4E5471", fontSize: 11 },
  userGender: { color: "#8A90AF", fontSize: 13 },
  userBio: { color: "#FFFFFF", fontSize: 14, opacity: 0.8 },
  tagsRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  tagPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  tagPillText: { fontSize: 11, fontWeight: "bold" },
  messageBtn: { position: "absolute", right: 0, bottom: 20 },
  messageIcon: { fontSize: 22 },
  separator: { height: 1, backgroundColor: "rgba(255,255,255,0.05)", width: "100%" },
});