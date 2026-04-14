import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjE1N2E0Y2IxZGUzOTQ2MjliZjUxOGVhY2MzODg4Nzc3IiwiaCI6Im11cm11cjY0In0=";

export default function RoutesScreen() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [distancia, setDistancia] = useState<string | null>(null);
  const [duracao, setDuracao] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const geocodificar = async (cidade: string) => {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${cidade}`,
    );
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      throw new Error("Local não encontrado");
    }

    return data.features[0].geometry.coordinates;
  };

  const calcularRota = async () => {
    if (!origem || !destino) {
      Alert.alert("Erro", "Preencha origem e destino.");
      return;
    }

    try {
      setLoading(true);

      const coordOrigem = await geocodificar(origem);
      const coordDestino = await geocodificar(destino);

      const response = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: API_KEY,
          },
          body: JSON.stringify({
            coordinates: [coordOrigem, coordDestino],
          }),
        },
      );

      const data = await response.json();

      const resumo = data.routes[0].summary;
      const distanciaKm = (resumo.distance / 1000).toFixed(2);
      const duracaoMin = (resumo.duration / 60).toFixed(0);

      setDistancia(`${distanciaKm} km`);
      setDuracao(`${duracaoMin} minutos`);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível calcular a rota.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Simulador de Rotas</Text>

      <TextInput
        style={styles.input}
        placeholder="Cidade de Origem"
        placeholderTextColor="#aaa"
        value={origem}
        onChangeText={setOrigem}
      />

      <TextInput
        style={styles.input}
        placeholder="Cidade de Destino"
        placeholderTextColor="#aaa"
        value={destino}
        onChangeText={setDestino}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularRota}>
        <Text style={styles.botaoTexto}>Calcular Rota</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#FD6402" />}

      {distancia && duracao && (
        <View style={styles.resultado}>
          <Text style={styles.texto}>Distância: {distancia}</Text>
          <Text style={styles.texto}>Tempo Estimado: {duracao}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2F33",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FD6402",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#3A3F45",
    color: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#FD6402",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultado: {
    marginTop: 20,
    backgroundColor: "#3A3F45",
    padding: 15,
    borderRadius: 8,
  },
  texto: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 5,
  },
});
