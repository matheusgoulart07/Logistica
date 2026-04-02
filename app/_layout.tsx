import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <>
    <StatusBar style="light" />

    <Stack
      screenOptions={{
        headerStyle:{ backgroundColor: '#25292e',},
        headerShadowVisible: false,
        headerTintColor: '#fff',
        }}
      >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{}} />
    </Stack>
    </>
  ); 
}
