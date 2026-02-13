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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
