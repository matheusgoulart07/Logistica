import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout(){
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#8B0000',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, focused }) => (
                       <Ionicons name={focused ? "car-sport" : "car-sport-outline" } color={color} size={24} />   
                    ),
                }}
                />
                <Tabs.Screen
                    name="about"
                    options={{
                        title: 'Sobre',
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesome name={focused ? "vcard" : "vcard-o" } color={color} size={24} />
                    ),
                }}
            />
        </Tabs>
    );
}