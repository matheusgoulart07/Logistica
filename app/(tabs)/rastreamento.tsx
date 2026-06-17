import * as Location from "expo-location";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function RastreamentoScreen() {
  const [loading, setLoading] = useState(false);
  const [cidadeAtual, setCidadeAtual] = useState("");
  const [estadoAtual, setEstadoAtual] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [distancia, setDistancia] = useState<string | null>(null);

  // Novos estados para a cidade que o usuário vai digitar
  const [cidadeDestino, setCidadeDestino] = useState("");
  const [cidadeConfirmada, setCidadeConfirmada] = useState("");

  // --- FUNÇÃO MATEMÁTICA DE HAVERSINE ---
  const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distância em km

    if (d < 1) {
      return `${(d * 1000).toFixed(0)} metros`;
    }
    return `${d.toFixed(2)} km`;
  };

  const processarRastreio = async () => {
    if (!cidadeDestino.trim()) {
      Alert.alert("Aviso", "Por favor, digite o nome de uma cidade de destino.");
      return;
    }

    try {
      setLoading(true);

      // 1. Pedir permissão de localização do celular
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "É necessário permitir o acesso à localização.");
        return;
      }

      // 2. Pegar localização GPS atual do usuário
      const location = await Location.getCurrentPositionAsync({});
      const latAtual = location.coords.latitude;
      const lonAtual = location.coords.longitude;

      setLatitude(latAtual);
      setLongitude(lonAtual);

      // 3. Buscar coordenadas da CIDADE DIGITADA via Nominatim Geocoding
      const urlGeocode = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cidadeDestino)}&limit=1`;
      const respostaGeocode = await fetch(urlGeocode, {
        headers: { "User-Agent": "MeuAppRastreioDinamico/1.0 (contato@seuemail.com)" }
      });
      const dadosGeocode = await respostaGeocode.json();

      if (!dadosGeocode || dadosGeocode.length === 0) {
        Alert.alert("Erro", "Não encontramos a cidade digitada. Verifique a ortografia.");
        return;
      }

      // Coordenadas da cidade que o usuário digitou
      const latDestino = parseFloat(dadosGeocode[0].lat);
      const lonDestino = parseFloat(dadosGeocode[0].lon);
      setCidadeConfirmada(dadosGeocode[0].display_name.split(',')[0]); // Pega o nome limpo da cidade

      // 4. Calcular a distância entre a posição atual e a cidade digitada
      const distCalculada = calcularDistancia(latAtual, lonAtual, latDestino, lonDestino);
      setDistancia(distCalculada);

      // 5. Descobrir o nome da cidade ATUAL do usuário (onde ele está pisando agora)
      const urlReverse = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latAtual}&lon=${lonAtual}`;
      const respostaReverse = await fetch(urlReverse, {
        headers: { "User-Agent": "MeuAppRastreioDinamico/1.0 (contato@seuemail.com)" }
      });
      const dadosReverse = await respostaReverse.json();

      if (dadosReverse && dadosReverse.address) {
        const nomeCidade = dadosReverse.address.city || dadosReverse.address.town || dadosReverse.address.village || "Não encontrado";
        const nomeEstado = dadosReverse.address.state || "Não encontrado";
        setCidadeAtual(nomeCidade);
        setEstadoAtual(nomeEstado);
      }

    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao processar a localização.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📍 Calcular Distância para Cidade</Text>

      {/* CAMPO DE TEXTO PARA O USUÁRIO DIGITAR */}
      <Text style={styles.label}>Digite a cidade de destino:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Rio de Janeiro, Bauru, Paris..."
        placeholderTextColor="#888"
        value={cidadeDestino}
        onChangeText={setCidadeDestino}
      />

      <TouchableOpacity style={styles.botao} onPress={processarRastreio}>
        <Text style={styles.botaoTexto}>Calcular Distância</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#FD6402" style={{ marginTop: 20 }} />
      )}

      {latitude && longitude && (
        <View style={styles.resultado}>
          <Text style={styles.textoTituloSeccao}>Onde você está agora:</Text>
          <Text style={styles.texto}>Cidade: {cidadeAtual}</Text>
          <Text style={styles.texto}>Estado: {estadoAtual}</Text>
          
          <View style={styles.divisor} />

          <Text style={styles.textoTituloSeccao}>Destino escolhido:</Text>
          <Text style={styles.textoDestaque}>Cidade: {cidadeConfirmada}</Text>
          <Text style={styles.textoDestaque}>Distância até lá: {distancia}</Text>

          <View style={styles.divisor} />

          <Text style={styles.textoCoordenada}>Sua Lat: {latitude.toFixed(6)}</Text>
          <Text style={styles.textoCoordenada}>Sua Lon: {longitude.toFixed(6)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2C2F33",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FD6402",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#3A3F45",
    color: "#FFF",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#555",
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
  textoTituloSeccao: {
    color: "#AAA",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "uppercase"
  },
  texto: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 4,
  },
  textoDestaque: {
    color: "#FD6402",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  textoCoordenada: {
    color: "#888",
    fontSize: 13,
    marginBottom: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: "#555",
    marginVertical: 12,
  },
});