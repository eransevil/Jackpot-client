import React from "react";
import { Button } from "react-native";

const ActionButton = ({ title, onPress, disabled = false }) => {
  return <Button title={title} onPress={onPress} disabled={disabled} />;
};

export default ActionButton;
