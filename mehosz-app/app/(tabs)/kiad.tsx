import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Fold = {
  id: number;
  helyrajzi_szam: string;
  terulet: number;
  muvelesi_ag: string;
};

type Kiadas = {
  id: number;
  fold_id: number;
  datum: string;
  osszeg: number;
  tipus: string;
  leiras: string;
};

export default function Kiadasok() {
  const [foldek, setFoldek] = useState<Fold[]>([]);
  const [kiadasok, setKiadasok] = useState<Kiadas[]>([]);
  const [gazdaId, setGazdaId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const id = await AsyncStorage.getItem("gazda_id");
      if (!id) {
        setLoading(false);
        return;
      }

      setGazdaId(Number(id));

      // 1️⃣ Gazda földjei
      const foldRes = await api.get(`/api/gfold/${id}`);
      setFoldek(foldRes.data);

      // 2️⃣ Minden földhöz kiadás lekérése (mint terv.tsx)
      const kiadasPromises = foldRes.data.map((fold: Fold) =>
        api.get(`/api/kiad/${fold.id}`)
      );

      const kiadasResults = await Promise.all(kiadasPromises);

      const mergedKiadasok: Kiadas[] =
        kiadasResults.flatMap((res) => res.data);

      setKiadasok(mergedKiadasok);

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2F8F4E" />
      </View>
    );
  }

  if (!gazdaId) {
    return (
      <View style={styles.center}>
        <Text>Nincs bejelentkezve gazda.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {foldek.map((fold) => {
        const foldKiadasok = kiadasok.filter(
          (k) => k.fold_id === fold.id
        );

        if (foldKiadasok.length === 0) return null;

        return (
          <View key={fold.id} style={styles.card}>
            <Text style={styles.title}>
              Helyrajzi szám: {fold.helyrajzi_szam}
            </Text>

            <Text style={styles.row}>
              Terület: {fold.terulet} ha
            </Text>
            <Text style={styles.row}>
              Művelési ág: {fold.muvelesi_ag}
            </Text>

            <View style={styles.divider} />

            {foldKiadasok.map((k) => (
              <View key={k.id} style={{ marginBottom: 14 }}>
                <Text style={styles.subTitle}>
                  {k.tipus}
                </Text>

                <Text>
                  📅 {new Date(k.datum).toLocaleDateString("hu-HU")}
                </Text>

                <Text>{k.leiras}</Text>

                <Text style={styles.amount}>
                  {Number(k.osszeg).toFixed(2)} Ft
                </Text>
              </View>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F8F2",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F8F2",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 22,
    marginBottom: 20,
    borderLeftWidth: 6,
    borderLeftColor: "#388E3C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E5E2C",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#33691E",
  },
  row: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginTop: 4,
  },
});
