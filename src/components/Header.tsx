import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  centerTitle?: boolean;
}

export default function Header({
  title,
  subtitle,
  leftComponent,
  rightComponent,
  centerTitle = true,
}: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const insets = useSafeAreaInsets();

  const toggleLanguage = () => {
    setLanguage(language === "bg" ? "en" : "bg");
  };

  const defaultRight = (
    <TouchableOpacity onPress={toggleLanguage} style={styles.langButton}>
      <Text style={styles.langText}>{language === "bg" ? "🇬🇧" : "🇧🇬"}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.safeArea,
        {
          paddingTop: insets.top,
          backgroundColor: Colors.white,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.leftSlot}>{leftComponent}</View>

        <View style={[styles.centerSlot, !centerTitle && styles.alignLeft]}>
          {typeof title === "string" ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : (
            title
          )}
          {subtitle ? (
            <Text
              style={styles.subtitleText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.rightSlot}>{rightComponent || defaultRight}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  leftSlot: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerSlot: {
    flex: 2,
    alignItems: "center",
  },
  rightSlot: {
    flex: 1,
    alignItems: "flex-end",
  },
  alignLeft: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.purple,
  },
  subtitleText: {
    fontSize: 12,
    color: Colors.teal,
    fontWeight: "bold",
  },
  langButton: {
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  langText: {
    fontSize: 20,
  },
});
