import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import{api} from "../../services/api";
import { Redirect } from "expo-router";
type Fold = {
  id: number;
  helyrajzi_szam: string;
  terulet: number;
  muvelesi_ag: string;
  elozo_evi_hasznositas: string;
};

type Gazda = {
  id: number;
  nev: string;
  email: string;
};

export default function GazdaFoldPage() {
  const [gazda, setGazda] = useState<Gazda | null>(null);
  const [foldek, setFoldek] = useState<Fold[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("gazda_id");
        
        if (!userId) throw new Error("Nincs gazda_id");

        const gazdaRes = await api.get(`/api/gazda/${userId}`);
        setGazda(gazdaRes.data[0]); 

        
        const foldRes = await api.get(`/api/gfold/${userId}`);
        setFoldek(foldRes.data);

        setLoading(false);
        
      } catch (err) {
        console.log(err);
        setLoading(false);
      }

    };

    fetchData();
  }, []);
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2F8F4E" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.container}>
      

      {foldek.map((fold) => (
        <View key={fold.id} style={styles.card}>
          <Text style={styles.cardTitle}>Föld adatok</Text>
          <Text>Helyrajzi szám: {fold.helyrajzi_szam}</Text>
          <Text>Terület: {fold.terulet}</Text>
          <Text>Művelési ág: {fold.muvelesi_ag}</Text>
          <Text>Előző évi hasznosítás: {fold.elozo_evi_hasznositas}</Text>
        </View>
      ))}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
  flex: 1,
  backgroundColor: "#F4F8F2",
},
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#F4F8F2",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F8F2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2E5E2C",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2F6F3E",
  },
  row: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444",
  },
  highlight: {
    fontWeight: "bold",
    color: "#1B5E20",
  },
});
