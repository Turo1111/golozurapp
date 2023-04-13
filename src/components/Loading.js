import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Easing , Text} from "react-native";

export default function Loading({text = ''}) {
    const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]} />
      {
        text === '' ? '' : 
        <Text
          style={{
            color: '#9E9E9E',
            fontSize: 16,
            paddingVertical: 5,
            paddingHorizontal: 15,
            marginTop: 70
          }}
        >{text}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#3764A0",
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      position: "absolute",
    },
  });
