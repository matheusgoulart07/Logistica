import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout(){
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'black',
                headerStyle: {
                    backgroundColor: '#3A3F45',
                },
                headerShadowVisible: false,
                headerTintColor: '#fd6402',
                tabBarStyle: {
                    backgroundColor: '#3A3F45' 
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, focused }) => (
                       <Ionicons name={focused ? "car-sport" : "car-sport-outline" } color={'#fd6402'} size={24} />   
                    ),
                }}
                />
                <Tabs.Screen
                    name="about"
                    options={{
                        title: 'Sobre',
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesome name={focused ? "vcard" : "vcard-o" } color={'#fd6402'} size={24} />
                    ),
                }}
            />
                <Tabs.Screen
                    name="toDoList"
                    options={{
                        title: 'A Fazer',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "newspaper" : "newspaper-outline" } color={'#fd6402'} size={24} />
                    ),
                }}
            />
        </Tabs>
    );
}