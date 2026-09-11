import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/LanguageContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LevelsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { operation, labelKey } = useLocalSearchParams();

  const operations = [
    { id: "add", labelKey: "add", icon: "➕", color: Colors["blue"] },
    { id: "sub", labelKey: "sub", icon: "➖", color: Colors["orange"] },
    { id: "mul", labelKey: "mul", icon: "✖️", color: Colors["yellow"] },
    { id: "div", labelKey: "div", icon: "➗", color: Colors["purple-light"] },
  ];

  const currentOp = operations.find((o) => o.id === operation);

  const getLevels = () => {
    const examples: any = {
      add: ["4 + 5", "25 + 14", "245 + 132"],
      sub: ["9 - 3", "85 - 22", "945 - 312"],
      mul: ["3 * 4", "12 * 10", "131 * 18"],
      div: ["8 / 2", "90 / 9", "800 / 25"],
    };

    const currentExamples = examples[operation as string] || ["?", "?", "?"];

    if (operation === "div") {
      return [
        {
          id: "1",
          range: 10,
          textKey: "singleDigitDiv",
          subtextKey: "easyStart",
          levelKey: "beginner",
          levelIcon: "🍃",
          levelColor: Colors.yellow,
          example: `${currentExamples[0]} = ?`,
          type: "Single",
          detail: "1-9",
          textColor: Colors["purple"],
        },
        {
          id: "2",
          range: 100,
          textKey: "doubleDigitDiv",
          subtextKey: "gettingHarder",
          levelKey: "intermediate",
          levelIcon: "⚡",
          levelColor: Colors.blue,
          example: `${currentExamples[1]} = ?`,
          type: "Double",
          detail: "10-25",
          textColor: Colors.brown,
        },
      ];
    }

    return [
      {
        id: "1",
        range: 10,
        textKey: "singleDigit",
        subtextKey: "easyStart",
        levelKey: "beginner",
        levelIcon: "🍃",
        levelColor: Colors.yellow,
        example: `${currentExamples[0]} = ?`,
        type: "Single",
        detail: "1-9",
        textColor: Colors["purple"],
      },
      {
        id: "2",
        range: 100,
        textKey: "doubleDigit",
        subtextKey: "gettingHarder",
        levelKey: "intermediate",
        levelIcon: "⚡",
        levelColor: Colors.blue,
        example: `${currentExamples[1]} = ?`,
        type: "Double",
        detail: "10-99",
        textColor: Colors.brown,
      },
      {
        id: "3",
        range: 1000,
        textKey: "tripleDigit",
        subtextKey: "mathMaster",
        levelKey: "expert",
        levelIcon: "🔥",
        levelColor: Colors.purple,
        example: `${currentExamples[2]} = ?`,
        type: "Master",
        detail: "100-999",
        textColor: Colors["purple"],
      },
    ];
  };

  const handleSelectLevel = (level: any) => {
    router.push({
      pathname: "/game",
      params: {
        operation,
        range: level.range,
        levelLabelKey: level.textKey,
        levelDetail: level.detail,
        opLabelKey: labelKey,
      },
    });
  };

  const backButton = (
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <Text style={styles.navText}>←</Text>
    </TouchableOpacity>
  );

  const headerTitle = (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerText}>{t(labelKey as any)}</Text>
      <Text
        style={[
          styles.headerIcon,
          {
            borderWidth: 2,
            borderColor: currentOp?.color,
            borderRadius: 5,
            paddingHorizontal: 2,
            paddingVertical: 2,
          },
        ]}
      >
        {currentOp?.icon}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={headerTitle as any}
        leftComponent={backButton}
        centerTitle={true}
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>{t("chooseDifficulty")}</Text>
        <Text style={styles.subtext}>{t("chooseDifficultySubtext")}</Text>

        <View style={styles.list}>
          {getLevels().map((level) => (
            <TouchableOpacity
              key={level.id}
              style={styles.levelCard}
              onPress={() => handleSelectLevel(level)}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardTopLeft}>
                  <Text style={[styles.cardTitle, { color: level.textColor }]}>
                    {t(level.textKey as any)}
                  </Text>
                  <Text style={[styles.cardSubtext, { color: "#868c8f" }]}>
                    {t(level.subtextKey as any)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.levelChip,
                    { backgroundColor: level.levelColor },
                  ]}
                >
                  <Text style={styles.levelChipIcon}>{level.levelIcon}</Text>
                  <Text
                    style={[
                      styles.levelChipText,
                      {
                        color:
                          level.levelKey === "expert"
                            ? Colors.white
                            : Colors.purple,
                      },
                    ]}
                  >
                    {t(level.levelKey as any)}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBottom}>
                <View
                  style={[
                    styles.cardBottomLeft,
                    {
                      backgroundColor:
                        level.levelKey === "intermediate"
                          ? Colors["yellow-fade"]
                          : Colors["purple-light"],
                    },
                  ]}
                >
                  <Text
                    style={[styles.exampleText, { color: level.textColor }]}
                  >
                    {level.example}
                  </Text>
                  <View style={styles.typeTag}>
                    <Text
                      style={[styles.typeTagText, { color: level.textColor }]}
                    >
                      {level.type}
                    </Text>
                  </View>
                </View>
                <View style={styles.chevronBox}>
                  <Text
                    style={[styles.chevronText, { color: level.textColor }]}
                  >
                    ›
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    alignItems: "center",
  },
  backButton: {
    padding: 5,
  },
  navText: {
    fontSize: 28,
    color: Colors.purple,
    fontWeight: "bold",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 5,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.purple,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.purple,
    paddingTop: 36,
    marginBottom: 8,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    color: Colors.teal,
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  list: {
    width: "100%",
    gap: 16,
  },
  levelCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    elevation: 8,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors["purple-light"],
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  cardTopLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.purple,
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    fontWeight: "bold",
  },
  levelChip: {
    backgroundColor: Colors["purple-light"],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  levelChipIcon: {
    fontSize: 12,
  },
  levelChipText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.purple,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardBottomLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors["yellow-fade"],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  exampleText: {
    fontSize: 18,
    color: Colors.gold,
    fontWeight: "600",
  },
  typeTag: {
    backgroundColor: Colors["surface-dim"],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors["purple-light"],
  },
  typeTagText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  chevronBox: {
    width: 36,
    height: 36,
    backgroundColor: Colors["surface-dim"],
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors["purple-light"],
  },
  chevronText: {
    fontSize: 24,
    color: Colors.purple,
    lineHeight: 28,
  },
});
