import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Slot = ({ symbol }) => {
  return (
    <View style={styles.slot}>
      <Text style={styles.symbol}>{symbol}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slot: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  symbol: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default Slot;
