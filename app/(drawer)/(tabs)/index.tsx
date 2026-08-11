import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Hello() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>ola app!</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: "blue",
        fontSize: 25
    }
});
