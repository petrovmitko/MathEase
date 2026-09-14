import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/LanguageContext";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// @ts-ignore
import BulbImage from "../../assets/math-assets/bulb.png";

interface FailureModalProps {
  visible: boolean;
  onTryAgain: () => void;
  onSkip: () => void;
  userAnswer: string;
  num1: number;
  num2: number;
  operator: string;
}

export default function FailureModal({
  visible,
  onTryAgain,
  onSkip,
  userAnswer,
  num1,
  num2,
  operator,
}: FailureModalProps) {
  const { t } = useLanguage();
  const [showHint, setShowHint] = useState(false);

  // Simple hint logic
  const getHint = () => {
    if (operator === "+") {
      const n1_base = Math.floor(num1 / 10) * 10;
      const n1_rem = num1 % 10;
      const n2_base = Math.floor(num2 / 10) * 10;
      const n2_rem = num2 % 10;

      if (num1 < 10 && num2 < 10) return null;

      return `${t("breakItDown" as any)} ${n1_base} + ${n2_base} and ${n1_rem} + ${n2_rem}. ${t("putTogether" as any)}`;
    }
    return null;
  };

  const hint = getHint();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <Image
              source={BulbImage}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="contain"
            />
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{t("almostThere" as any)}</Text>
            <Text style={styles.icon}>🧐</Text>
          </View>

          <Text style={styles.subTitleText}>{t("soClose" as any)}</Text>

          <View style={styles.answerRow}>
            <Text style={styles.answerLabel}>
              {t("yourAnswerLabel" as any)}
            </Text>
            <View style={styles.answerChip}>
              <SymbolView
                name="square.and.pencil"
                size={14}
                tintColor={Colors.white}
              />
              <Text style={styles.answerValue}>{userAnswer}</Text>
            </View>
          </View>

          {showHint && hint && (
            <View style={styles.hintBox}>
              <Text style={styles.hintTitle}>
                ✨ {t("friendlyHelper" as any)}
              </Text>
              <Text style={styles.hintText}>{hint}</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => {
                setShowHint(false);
                onTryAgain();
              }}
            >
              <Text style={styles.tryAgainText}>{t("tryAgain" as any)}</Text>
            </TouchableOpacity>

            {!showHint && hint && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setShowHint(true)}
              >
                <Text style={styles.secondaryButtonText}>
                  {t("showHint" as any)}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setShowHint(false);
                onSkip();
              }}
            >
              <Text style={styles.secondaryButtonText}>
                {t("skipQuestion" as any)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>❤️ {t("mistakesHelp" as any)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(58, 32, 68, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 25,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    elevation: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors["purple-light"],
    borderRadius: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.purple,
  },
  icon: {
    fontSize: 24,
  },
  subTitleText: {
    fontSize: 16,
    color: Colors.teal,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e1f5fe", // Very light blue
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    width: "100%",
    marginBottom: 25,
  },
  answerLabel: {
    fontSize: 18,
    color: Colors.purple,
    fontWeight: "600",
  },
  answerChip: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  chipIcon: {
    fontSize: 14,
  },
  answerValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  hintBox: {
    backgroundColor: Colors["background-fade"],
    padding: 15,
    borderRadius: 16,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.yellow,
  },
  hintTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.gold,
    marginBottom: 5,
  },
  hintText: {
    fontSize: 14,
    color: Colors.brown,
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
    marginBottom: 20,
  },
  tryAgainButton: {
    backgroundColor: Colors.teal,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  tryAgainText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.purple,
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors["surface-dim"],
    paddingTop: 15,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: Colors.purple,
    fontStyle: "italic",
    fontWeight: "500",
  },
});
