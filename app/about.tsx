import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View style={styles.container}> 
        <Text style={styles.text}>Pagina sobre</Text>
        <Link href="/" style={styles.button}>
          Voltar para pagina inicial
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  }
});