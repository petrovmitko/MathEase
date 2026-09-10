import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const operations = [
    { id: "add", labelKey: "add", icon: "➕", color: Colors["blue"] },
    { id: "sub", labelKey: "sub", icon: "➖", color: Colors["orange"] },
    { id: "mul", labelKey: "mul", icon: "✖️", color: Colors["yellow"] },
    { id: "div", labelKey: "div", icon: "➗", color: Colors["purple-light"] },
  ];

  const handleSelectOperation = (opId: string, labelKey: string) => {
    router.push({
      pathname: "/levels",
      params: { operation: opId, labelKey },
    });
  };

  return (
    <View style={styles.container}>
      <Header title={t("appTitle")} />
      <View style={styles.content}>
        <Text style={styles.title}>{t("chooseAction")}</Text>
        <View style={styles.grid}>
          {operations.map((op) => (
            <TouchableOpacity
              key={op.id}
              style={[
                styles.card,
                {
                  borderWidth: 1,
                  borderColor: op.color,
                  backgroundColor: Colors["background-fade"],
                },
              ]}
              onPress={() => handleSelectOperation(op.id, op.labelKey)}
            >
              <Text
                style={[
                  styles.icon,
                  {
                    backgroundColor: op.color,
                  },
                ]}
              >
                {op.icon}
              </Text>
              <Text style={styles.label}>{t(op.labelKey as any)}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: Colors.purple,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  card: {
    width: "46%",
    height: 190,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    borderRadius: 50,
    fontSize: 30,
    marginBottom: 10,
    padding: 16,
    backgroundColor: Colors["surface-dim"],
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.purple,
    paddingTop: 16,
  },
});
