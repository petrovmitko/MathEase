import FailureModal from "@/components/FailureModal";
import Header from "@/components/Header";
import SuccessModal from "@/components/SuccessModal";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { operation, range, levelLabelKey, opLabelKey } =
    useLocalSearchParams();
  const maxRange = parseInt(range as string) || 10;

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [currentOp, setCurrentOp] = useState("+");
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const generateProblem = () => {
    setShowSuccess(false);
    setShowFailure(false);
    let opSymbol = "+";
    if (operation === "add") opSymbol = "+";
    else if (operation === "sub") opSymbol = "-";
    else if (operation === "mul") opSymbol = "×";
    else if (operation === "div") opSymbol = "÷";

    let n1 = 0;
    let n2 = 0;

    if (maxRange === 10) {
      n1 = Math.floor(Math.random() * 9) + 1;
      n2 = Math.floor(Math.random() * 9) + 1;
    } else if (maxRange === 100) {
      n1 = Math.floor(Math.random() * 90) + 10;
      n2 = Math.floor(Math.random() * 90) + 10;
    } else {
      n1 = Math.floor(Math.random() * 900) + 100;
      n2 = Math.floor(Math.random() * 900) + 100;
    }

    if (opSymbol === "÷") {
      if (maxRange === 10) {
        // Делител 1-9, Резултат 1-9, Делимо до 81
        n2 = Math.floor(Math.random() * 8) + 2;
        const result = Math.floor(Math.random() * 9) + 1;
        n1 = n2 * result;
      } else {
        // Делител 2-25, Резултат до 999 / делител
        n2 = Math.floor(Math.random() * 24) + 2;
        const maxResult = Math.floor(999 / n2);
        const result = Math.floor(Math.random() * (maxResult - 1)) + 1;
        n1 = n2 * result;
      }
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
      case "×":
        return num1 * num2;
      case "÷":
        return num1 / num2;
      default:
        return 0;
    }
  };

  const checkAnswer = () => {
    const numAnswer = parseInt(userAnswer);
    if (isNaN(numAnswer)) {
      Alert.alert(t("error"), t("enterNumber"));
      return;
    }

    if (numAnswer === getCorrectAnswer()) {
      setScore(score + 1);
      setShowSuccess(true);
    } else {
      setShowFailure(true);
    }
  };

  const handleKeyPress = (val: string) => {
    if (val === "C") {
      setUserAnswer("");
    } else if (val === "del") {
      setUserAnswer((prev) => prev.slice(0, -1));
    } else {
      if (userAnswer.length < 10) {
        setUserAnswer((prev) => prev + val);
      }
    }
  };

  const Keyboard = () => {
    const keys = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["C", "0", "del"],
    ];

    return (
      <View style={styles.keyboard}>
        {keys.map((row, i) => (
          <View key={i} style={styles.keyboardRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.key,
                  key === "C" && { backgroundColor: Colors.orange },
                  key === "del" && { backgroundColor: Colors.yellow },
                  ["1", "3", "5", "7", "9"].includes(key) && {
                    backgroundColor: Colors["blue-fade"],
                  },
                  ["2", "4", "6", "8", "0"].includes(key) && {
                    backgroundColor: Colors["yellow-fade"],
                  },
                ]}
                onPress={() => handleKeyPress(key)}
              >
                <Text
                  style={[
                    styles.keyText,
                    (key === "C" || key === "del") && { color: Colors.purple },
                  ]}
                >
                  {key === "del" ? "⌫" : key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const backButton = (
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <Text style={styles.navText}>←</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title={t(opLabelKey as any)}
        subtitle={t(levelLabelKey as any)}
        leftComponent={backButton}
      />

      <View style={styles.content}>
        <SuccessModal
          visible={showSuccess}
          onNext={generateProblem}
          correctAnswer={userAnswer}
          problem={`${num1} ${currentOp} ${num2}`}
        />
        <FailureModal
          visible={showFailure}
          onTryAgain={() => setShowFailure(false)}
          onSkip={generateProblem}
          userAnswer={userAnswer}
          num1={num1}
          num2={num2}
          operator={currentOp}
        />
        <View style={styles.gameCard}>
          <Text style={styles.problemText}>
            {num1} {currentOp} {num2} = ?
          </Text>
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{userAnswer}</Text>
          </View>
        </View>

        <Keyboard />

        <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
          <Text style={styles.submitButtonText}>{t("check")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["surface-dim"],
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5,
  },
  navText: {
    fontSize: 28,
    color: Colors.purple,
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  scoreLabel: {
    fontSize: 24,
    color: Colors.purple,
    fontWeight: "bold",
  },
  scoreValue: {
    fontSize: 32,
    color: Colors.teal,
    fontWeight: "bold",
  },
  gameCard: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 32,
    alignItems: "center",
    elevation: 4,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: Colors["purple-light"],
  },
  problemText: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.purple,
    marginBottom: 10,
  },
  answerContainer: {
    minWidth: 140,
    height: 70,
    backgroundColor: "#e0f7fa", // Light blue fade
    borderWidth: 2,
    borderColor: Colors.blue,
    borderStyle: "dashed",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  answerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.gold,
  },
  keyboard: {
    gap: 12,
  },
  keyboardRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  key: {
    flex: 1,
    aspectRatio: 1.5,
    backgroundColor: Colors.white,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  keyText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.purple,
  },
  submitButton: {
    backgroundColor: Colors.teal,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});
