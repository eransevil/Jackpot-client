import React from "react";
import { View, StyleSheet } from "react-native";
import Slot from "./Slot";

const SlotMachine = ({ slots }) => {
  return (
    <View style={styles.slotMachine}>
      {slots?.map((slot, index) => (
        <Slot key={index} symbol={slot} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  slotMachine: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

export default SlotMachine;
