import Header from "@/components/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function GameScreen() {
  const router = useRouter();
  const { operation, range, levelDetail, opLabel } = useLocalSearchParams();
  const maxRange = parseInt(range as string) || 10;

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [currentOp, setCurrentOp] = useState("+");
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  const generateProblem = () => {
    let opSymbol = "+";
    if (operation === "add") opSymbol = "+";
    else if (operation === "sub") opSymbol = "-";
    else if (operation === "mul") opSymbol = "*";
    else if (operation === "div") opSymbol = "/";

    let n1 = 0;
    let n2 = 0;

    // Генериране на числа според обхвата
    if (maxRange === 10) {
      n1 = Math.floor(Math.random() * 10) + 1;
      n2 = Math.floor(Math.random() * 10) + 1;
    } else if (maxRange === 100) {
      n1 = Math.floor(Math.random() * 90) + 10;
      n2 = Math.floor(Math.random() * 90) + 10;
    } else {
      n1 = Math.floor(Math.random() * 900) + 100;
      n2 = Math.floor(Math.random() * 900) + 100;
    }

    if (opSymbol === "/") {
      n1 = n1 * n2;
    } else if (opSymbol === "-") {
      if (n1 < n2) [n1, n2] = [n2, n1];
    }

    setNum1(n1);
    setNum2(n2);
    setCurrentOp(opSymbol);
    setUserAnswer("");
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const getCorrectAnswer = () => {
    switch (currentOp) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return 0;
    }
  };

  const checkAnswer = () => {
    const numAnswer = parseFloat(userAnswer);
    if (isNaN(numAnswer)) {
      Alert.alert("Грешка", "Моля въведи число!");
      return;
    }

    if (numAnswer === getCorrectAnswer()) {
      setScore(score + 1);
      Alert.alert("Браво! 🎉", "Правилен отговор!", [
        { text: "Следваща", onPress: generateProblem },
      ]);
    } else {
      Alert.alert(
        "Опа! ❌",
        `Грешен отговор. Верният беше: ${getCorrectAnswer()}`,
        [{ text: "Опитай пак", onPress: generateProblem }],
      );
    }
  };

  const backButton = (
    <TouchableOpacity onPress={() => router.back()}>
      <Text style={styles.navText}>←</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title={`${opLabel} (${levelDetail})`}
        leftComponent={backButton}
      />

      <View style={styles.content}>
        <Text style={styles.scoreText}>Точки: {score}</Text>

        <View style={styles.card}>
          <Text style={styles.problemText}>
            {num1} {currentOp} {num2} = ?
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Твоят отговор"
            autoFocus
          />

          <TouchableOpacity style={styles.button} onPress={checkAnswer}>
            <Text style={styles.buttonText}>Провери</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  navText: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#e74c3c",
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
    width: "100%",
  },
  problemText: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34495e",
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#3498db",
    fontSize: 32,
    width: "100%",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#2ecc71",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});
