import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="leaf" size={35} color="white" />
                    </View>
                </View>  
                <Text style={styles.title}>EcoField</Text>
                <Text style={styles.subtitle}>Acesse o sistema de monitoramento de campo</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="seu@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.passwordHeader}>
                        <Text style={styles.label}>Senha</Text>
                        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="********"
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons 
                                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                                size={20} 
                                color="#666" 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.rememberContainer}>
                    <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)} activeOpacity={0.7}>
                        <Ionicons 
                            name={rememberMe ? "checkbox" : "square-outline"} 
                            size={20} 
                            color={rememberMe ? "#000" : "#666"} 
                        />
                        <Text style={styles.rememberText}>Lembrar meu acesso</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.8}
                    onPress={() => router.replace('/(drawer)/(tabs)')}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 5 }} />
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Não tem uma conta? <Text style={styles.footerLink}>Solicite acesso</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f3f8ff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: "white",
        width: '100%',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoContainer: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 15,
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    forgotPassword: {
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        width: '100%',
        height: 50,
        backgroundColor: '#fafafa',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#333',
    },
    rememberContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#555',
    },
    button: {
        width: '100%',
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 13,
        color: '#666',
    },
    footerLink: {
        fontWeight: 'bold',
        color: '#000',
    },
});
