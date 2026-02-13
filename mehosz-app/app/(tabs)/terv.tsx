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

      // Földek betöltése
      const foldRes = await api.get(`/api/gfold/${id}`);
      setFoldek(foldRes.data);

      // Növények betöltése
      const novRes = await api.get("/api/novinp");
      setNovinp(novRes.data);

      // Tervek betöltése minden földhöz
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
        // Csak az adott földhöz tartozó tervsorok
        const foldTervek = tervek.filter((t) => t.fold_id === fold.id);

        if (foldTervek.length === 0) {
          // Ha nincs terv, ne jelenítsen meg semmit a növényekből
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
  // Növény név keresése novenyt_id alapján
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
    padding: 16,
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
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  row: {
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});
