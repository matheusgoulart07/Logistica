import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sobre o Aplicativo</Text>

        <Text style={styles.text}>
          Aplicativo desenvolvido para otimizar a gestão
          de entregas e rotas logísticas.
        </Text>

        <Text style={styles.text}>
          Com ele, é possível calcular distâncias e organizar entregas de forma prática e eficiente.
        </Text>

        <Link href="/" style={styles.button}>
          Voltar à Página Inicial
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2F33",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#3A3F45",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FD6402",
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#E0E0E0",
    textAlign: "justify",
    marginBottom: 10,
    lineHeight: 22,
  },
  footer: {
    fontSize: 14,
    color: "#AAAAAA",
    textAlign: "center",
    marginVertical: 15,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#FD6402",
    color: "#FFFFFF",
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
});