import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // állítsd az animáció hosszára

    return () => clearTimeout(timer);
  }, [onFinish]);
  
  return (
    <View style={styles.container}>
      <LottieView
        source={{ uri: "https://lottie.host/53f14dda-b503-4e78-a158-4b908bec6f97/mxuYEcEKFf.lottie" }}
        autoPlay
        loop={false}
        style={{ width: 512, height: 512 }}
        />
    </View>
  );
  
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
});
