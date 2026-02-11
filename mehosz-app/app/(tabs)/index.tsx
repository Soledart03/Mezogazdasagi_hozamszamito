import { Image as ExpoImage } from 'expo-image';
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        
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
            <Text style={styles.statNumber}>10</Text>
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
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#D8EADF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: "#1E6B45",
    fontSize: 13,
    fontWeight: "500",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1F1F1F",
    marginBottom: 16,
    marginTop: 25
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
   image: {
    flex: 1,
    width: '100%'
    
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2F8F4E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  circleIcon: {
    fontSize: 50,
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
});
