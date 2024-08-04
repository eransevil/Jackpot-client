import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import SlotMachine from "./components/SlotMachine";
import ControlPanel from "./components/ControlPanel";

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [credits, setCredits] = useState(0);
  const [slots, setSlots] = useState(["X", "X", "X"]);
  const [isSpinning, setIsSpinning] = useState(false);

  const LOCAL_HOST = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

  const initializeSession = async () => {
    try {
      const response = await fetch(`http://${LOCAL_HOST}:3000/game/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCredits(data.credits);
      setSessionId(data.sessionId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSpin = async () => {
    try {
      setIsSpinning(true);
      const response = await fetch(`http://${LOCAL_HOST}:3000/game/spinSlot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        setIsSpinning(false);
      }
      const { credits, spinResult } = data;

      setSlots(["X", "X", "X"]); // reset slots to spinning state
      setSlotsWithDealy(spinResult, credits);
      setCredits(credits);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCashOut = async () => {
    try {
      const response = await fetch(`http://${LOCAL_HOST}:3000/game/cashOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      setSessionId(null);
      alert(`You cashed out with ${data.credits} credits`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setSlotsWithDealy = (spinResult) => {
    spinResult?.forEach((symbol, index) => {
      setTimeout(() => {
        setSlots((prevSlots) => {
          const newSlots = [...prevSlots];
          newSlots[index] = symbol;
          return newSlots;
        });
        if (index === spinResult?.length - 1) {
          setIsSpinning(false);
        }
      }, (index + 1) * 1000);
    });
  };

  useEffect(() => {
    if (!sessionId) {
      initializeSession();
    }
  }, [sessionId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Casino Jackpot</Text>
      <SlotMachine slots={slots} />
      <ControlPanel
        handleSpin={handleSpin}
        isSpinning={isSpinning}
        handleCashOut={handleCashOut}
      />
      <Text>credits: {credits}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
  },
});
