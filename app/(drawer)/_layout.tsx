import { Drawer } from "expo-router/drawer"

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{
                headerShow: true
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: 'Painel',
                    title: 'Inicio'
                }}
            />
        </Drawer>
    )
}