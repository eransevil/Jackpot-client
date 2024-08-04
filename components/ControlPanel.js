import React from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";

const ControlPanel = ({ isSpinning, handleSpin, handleCashOut }) => {
  return (
    <View style={styles.controlPanel}>
      <ActionButton title="Spin" onPress={handleSpin} disabled={isSpinning} />
      <ActionButton title="Cash Out" onPress={handleCashOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  controlPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default ControlPanel;
