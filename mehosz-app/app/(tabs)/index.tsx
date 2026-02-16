import { Image as ExpoImage } from 'expo-image';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { api } from "../../services/api";

type Gazda = {
  id: number;
  nev: string;
  email: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [gazda, setGazda] = useState<Gazda | null>(null);
  const [foldSzam, setFoldSzam] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await AsyncStorage.removeItem("gazda_id");
    router.replace("/login");
  };

  useEffect(() => {
    const fetchGazda = async () => {
      try {
        const userId = await AsyncStorage.getItem("gazda_id");
        if (!userId) throw new Error("Nincs gazda_id");
        const foldRes = await api.get("/api/foldszam");
        setFoldSzam(foldRes.data[0]?.["COUNT(*)"] ?? 0);
        const res = await api.get(`/api/gazda/${userId}`);
        setGazda(res.data[0]); 
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchGazda();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2F8F4E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Kijelentkezés</Text>
        </TouchableOpacity>
        {gazda && (
          <View style={[styles.card, { marginBottom: 20 }]}>
            
            <Text style={styles.cardSubtitle}>Üdv, {gazda.nev}</Text>
            
          </View>
        )}
        

        <Text style={styles.title}>MEHOSZ</Text>

        <Text style={styles.title2}>
          Kezelje növényeit,{"\n"}
          maximalizálja nyereségét
        </Text>

        <Text style={styles.description}>
          A MEHOSZ segít kiszámítani a következő év nyereségét az összes
          birtokodban lévő földön, figyelembe véve a rá fordított költségeket.
          Segítséget nyújt a hazai gazdáknak a megfelelő terv létrehozásával.
          Minden, amire szüksége van az adatalapú döntésekhez.
        </Text>

        <View style={styles.statsContainer}>
          <View>
            <Text style={styles.statNumber}>{foldSzam}</Text>
            <Text style={styles.statLabel}>Termőföld</Text>
          </View>

          <View>
            <Text style={styles.statNumber}>25%+</Text>
            <Text style={styles.statLabel}>Átl. nyereségnövekedés</Text>
          </View>
        </View>

        <ExpoImage
          source={require('../../assets/images/logo.jpeg')}
          style={{ width: 350, height: 350, alignSelf: "center", marginBottom: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F1EC",
  },
  content: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: "#c0392b",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: 30
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1F1F1F",
    marginBottom: 16,
    marginTop: 25,
  },
  title2: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1F1F1F",
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E6B45",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#F3F5F4",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F8F4E",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#333",
    marginTop: 6,
    
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
