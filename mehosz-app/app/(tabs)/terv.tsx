import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Fold = {
  id: number;
  helyrajzi_szam: string;
  terulet: number;
  muvelesi_ag: string;
};

type NovInp = {
  id: number;
  nnev: string;
  tpk: number;
  iad: number;
  inev: string;
  ar: number;
  fajta: string;
};

type Terv = {
  id: number;
  fold_id: number;
  noveny_id: number;
  kiv_vetoid: number;
  kiv_mutrid: number;
  vetes_idopont: string;
  tomeg: number;
  osszeg: number;
};

export default function Tervek() {
  const [foldek, setFoldek] = useState<Fold[]>([]);
  const [novinp, setNovinp] = useState<NovInp[]>([]);
  const [tervek, setTervek] = useState<Terv[]>([]);
  const [gazdaId, setGazdaId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const id = await AsyncStorage.getItem("gazda_id");
      if (!id) return;

      setGazdaId(Number(id));

      const foldRes = await api.get(`/api/gfold/${id}`);
      setFoldek(foldRes.data);

      const novRes = await api.get("/api/novinp");
      setNovinp(novRes.data);

      const tervPromises = foldRes.data.map((fold: Fold) =>
        api.get(`/api/terv/${fold.id}`)
      );
      const tervResults = await Promise.all(tervPromises);
      const mergedTervek: Terv[] = tervResults.flatMap((res) => res.data);
      setTervek(mergedTervek);
      console.log("Földek:", foldRes.data);
console.log("Növények:", novRes.data);
console.log("Tervek:", mergedTervek);

    };

    loadData();
  }, []);

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
        const foldTervek = tervek.filter((t) => t.fold_id === fold.id);

        if (foldTervek.length === 0) {
          return null;
        }

        return (
          <View key={fold.id} style={styles.card}>
            <Text style={styles.title}>
              Helyrajzi szám: {fold.helyrajzi_szam}
            </Text>
            <Text style={styles.row}>Terület: {fold.terulet} ha</Text>
            <Text style={styles.row}>Művelési ág: {fold.muvelesi_ag}</Text>

            <View style={styles.divider} />

            {foldTervek.map((t) => {
  const nov = novinp.find(n => Number(n.id) === Number(t.noveny_id));

  return (
    <View key={t.id} style={{ marginBottom: 10 }}>
      <Text style={styles.subTitle}>
        Növény: {nov ? nov.nnev : "Név nem elérhető"}
      </Text>
      {nov && (
        <>
          <Text>Input anyag: {nov.inev}</Text>
          <Text>Fajta: {nov.fajta}</Text>
          <Text>Ár: {nov.ar} Ft</Text>
          <Text>Termés/kg: {nov.tpk}</Text>
        </>
      )}
      
      <Text>Vetés időpont: {new Date(t.vetes_idopont).toLocaleDateString()}</Text>
      
      <Text>Tömeg: {t.tomeg}</Text>
      <Text>Összeg: {t.osszeg} Ft</Text>
    </View>
  );
})}

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
    marginTop: 12,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
    marginTop: 4,
  },
});
