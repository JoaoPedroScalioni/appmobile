import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Container } from '../../../src/factories/Container';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [uri, setUri] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePicture() {
        if (cameraRef.current) {
            const capturedPhoto = await cameraRef.current.takePictureAsync();
            console.log('Foto tirada:', capturedPhoto?.uri);
            if (capturedPhoto?.uri) {
                setUri(capturedPhoto.uri);
            }
        }
    }

    if (uri) {
        return <MostraFoto uri={uri} setUri={setUri} />;
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing}>
                    <MaterialIcons name="flip-camera-ios" size={32} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                    <Entypo name="circle" size={64} color="white" />
                </TouchableOpacity>

                <View style={styles.sideButton} />
            </View>
        </View>
    );
}

function MostraFoto({ uri, setUri }: { uri: string; setUri: (uri: string | null) => void }) {
    
    async function saveFoto() {
        // Passando (true) para solicitar apenas permissão de gravação (writeOnly) e evitar o erro de áudio
        let { status } = await MediaLibrary.getPermissionsAsync(true);
        
        if (status !== 'granted') {
            const permission = await MediaLibrary.requestPermissionsAsync(true);
            status = permission.status;
        }
        
        if (status === 'granted') {
            try {
                await MediaLibrary.saveToLibraryAsync(uri);
                
                // Pedimos permissão de localização
                let locationPermission = await Location.requestForegroundPermissionsAsync();
                let latitude = 0;
                let longitude = 0;

                // Se permitido, pegamos a coordenada real do GPS
                if (locationPermission.status === 'granted') {
                    const currentLocation = await Location.getCurrentPositionAsync({});
                    latitude = currentLocation.coords.latitude;
                    longitude = currentLocation.coords.longitude;
                }
                
                // Salvando no nosso repositório via caso de uso!
                const container = Container.getInstance();
                await container.registerObservation.execute({
                    latitude: latitude, 
                    longitude: longitude,
                    photo: uri
                });
                
                // Apenas para vermos no terminal se salvou:
                const todasAsObservacoes = await container.listObservations.execute();
                console.log("Observações em Memória:", todasAsObservacoes);

                Alert.alert("Sucesso!", "Foto e observação salvas!");
            } catch (error) {
                console.log("Erro ao salvar foto", error);
                Alert.alert("Erro", "Não foi possível salvar a foto.");
            }
        } else {
            Alert.alert("Permissão negada", "Precisamos de permissão para salvar a foto na galeria.");
        }
        setUri(null); // Volta pra câmera após salvar
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: uri }} style={styles.preview} />
            <View style={styles.previewButtonsContainer}>
                <TouchableOpacity
                    style={styles.previewButton}
                    onPress={() => setUri(null)}
                >
                    <Ionicons name="arrow-back" size={30} color="white" />
                    <Text style={styles.previewButtonText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.previewButton}
                    onPress={saveFoto}
                >
                    <Ionicons name="checkmark-circle" size={30} color="white" />
                    <Text style={styles.previewButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: 'white',
    },
    camera: {
        flex: 1,
    },
    preview: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    sideButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 30,
    },
    captureButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 40,
    },
    previewButtonsContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    previewButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 15,
        borderRadius: 15,
        minWidth: 100,
    },
    previewButtonText: {
        color: 'white',
        marginTop: 5,
        fontWeight: 'bold',
    },
});
