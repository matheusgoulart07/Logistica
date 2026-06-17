import * as Location from "expo-location";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function RastreamentoScreen() {
  const [loading, setLoading] = useState(false);
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const obterLocalizacao = async () => {
    try {
      setLoading(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "É necessário permitir o acesso à localização."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      const endereco = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (endereco.length > 0) {
        setCidade(endereco[0].city || "Não encontrado");
        setEstado(endereco[0].region || "Não encontrado");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter a localização.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📍 Rastreio de Veículo</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={obterLocalizacao}
      >
        <Text style={styles.botaoTexto}>
          Mostrar Localização
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#FD6402"
          style={{ marginTop: 20 }}
        />
      )}

      {latitude && longitude && (
        <View style={styles.resultado}>
          <Text style={styles.texto}>
            Cidade: {cidade}
          </Text>

          <Text style={styles.texto}>
            Estado: {estado}
          </Text>

          <Text style={styles.texto}>
            Latitude: {latitude.toFixed(6)}
          </Text>

          <Text style={styles.texto}>
            Longitude: {longitude.toFixed(6)}
          </Text>

          <Text style={styles.status}>
            🚚 Status: Veículo em rota
          </Text>
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
    marginBottom: 30,
  },
  botao: {
    backgroundColor: "#FD6402",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultado: {
    marginTop: 25,
    backgroundColor: "#3A3F45",
    padding: 15,
    borderRadius: 8,
  },
  texto: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 8,
  },
  status: {
    color: "#00FF7F",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});