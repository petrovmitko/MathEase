import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/LanguageContext";
import { Image } from "expo-image";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// @ts-ignore
import StarImage from "../../assets/math-assets/success_star.png";

interface SuccessModalProps {
  visible: boolean;
  onNext: () => void;
  correctAnswer: string;
  problem: string;
}

export default function SuccessModal({
  visible,
  onNext,
  correctAnswer,
  problem,
}: SuccessModalProps) {
  const { t } = useLanguage();

  const successTitles = [
    t("awesomeJob" as any),
    t("wellDone" as any),
    t("fantastic" as any),
    t("keepItUp" as any),
  ];

  const title = successTitles[Math.floor(Math.random() * successTitles.length)];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.starContainer}>
            <Image
              source={StarImage}
              style={{ width: 140, height: 140 }}
              contentFit="contain"
            />
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.fireworksIcon}>🎉</Text>
          </View>

          <Text style={styles.messageText}>
            <Text style={styles.boldText}>{correctAnswer}</Text>{" "}
            {t("isCorrect" as any)}
          </Text>

          <Text style={styles.subMessageText}>
            {t("youSolved" as any)}{" "}
            <Text style={styles.boldText}>{problem}</Text>!
          </Text>

          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>
              {t("nextQuestion" as any)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(58, 32, 68, 0.6)", // Purple with alpha
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 30,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  starContainer: {
    width: 70,
    height: 70,
    backgroundColor: Colors["yellow-fade"],
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  starIcon: {
    fontSize: 40,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.purple,
    textAlign: "center",
  },
  fireworksIcon: {
    fontSize: 24,
  },
  messageText: {
    fontSize: 18,
    color: Colors.purple,
    textAlign: "center",
    marginBottom: 8,
  },
  subMessageText: {
    fontSize: 16,
    color: Colors.teal,
    textAlign: "center",
    marginBottom: 30,
  },
  boldText: {
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: Colors.teal,
    width: "100%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
