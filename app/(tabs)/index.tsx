import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Logística</Text>
        <Text style={styles.subtitle}>
          Gerencie entregas, calcule rotas e acompanhe suas operações com eficiência.
        </Text>

        <Link href="/routes" style={styles.button}>
          Calcular Rotas
        </Link>

        <Link href="/toDoList" style={styles.secondaryButton}>
          Lista de Entregas
        </Link>

        <Link href="/about" style={styles.link}>
          Sobre o Aplicativo
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FD6402",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#FD6402",
    color: "#FFFFFF",
    width: "100%",
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#5865F2",
    color: "#FFFFFF",
    width: "100%",
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: "#FD6402",
    fontSize: 14,
    fontWeight: "bold",
  },
});