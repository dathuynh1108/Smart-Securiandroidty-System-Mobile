import { Text, TouchableOpacity, View } from "react-native";
import '../../styles/appStyles';
import { styles } from "./styles";
import { CommonActions } from "@react-navigation/native";
import { useEffect } from "react";
import { PokemonAPI } from "../../apis/PokeAPI";

export default function Personal({ navigation }) {

    const handleLogout = () => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
                name: "Login"
            }]
        }));
    }


    useEffect(() => {
        // PokemonAPI.getPaginated({ limit: 20, offset: 0 }).then((pokemonList) => {
        //     console.log("test API pokemonList: ", pokemonList)
        // })
    }, [])


    return (
        <View style={styles.personalContainer}>
            {/* <Text>Personal</Text> */}

            <TouchableOpacity
                style={styles.buttonConfig}
                onPress={() => navigation.navigate('Configuration')}
            >
                <View style={styles.logoutView}>
                    <Text style={styles.logoutText}>Cấu hình</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonLogout}
                onPress={handleLogout}
            >
                <View style={styles.logoutView}>
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </View>
            </TouchableOpacity>


        </View>

    );
}