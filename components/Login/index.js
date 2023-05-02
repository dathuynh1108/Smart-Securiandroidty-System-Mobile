import { Button, Dimensions, Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import '../../styles/appStyles'
import { appStyles } from "../../styles/appStyles";
import logo from '../../assets/hcmut.png';
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from '@react-navigation/native';
import { styles } from "./styles";

const { screenWidth } = Dimensions.get("window").width;
const { screenHeight } = Dimensions.get("window").height;

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');
    const handleIconPassword = () => {
        if (rightIcon == 'eye-off') {
            setSecureTextEntry(false);
            setRightIcon('eye');
        } else if (rightIcon == 'eye') {
            setSecureTextEntry(true);
            setRightIcon('eye-off')
        }
    }
    const handleLogin = () => {
        navigation.dispatch(state => {
            return CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'Welcome',
                    // state: {
                    //     routes: [{
                    //         name: 'MainTabScreen',
                    //         state: {
                    //             routes: [{
                    //                 name: 'Dashboard',
                    //                 params: {}
                    //             }]
                    //         }
                    //     }]
                    // }

                }]
            })
        })
        // navigation.navigate('Welcome')
    }

    return (
        <View style={appStyles.appContainer}>
            <View style={styles.loginContainer}>
                <Image source={logo} style={styles.logo} />

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Welcome back.</Text>
                </View>

                <View style={styles.usernameContainer}>
                    <TextInput
                        style={styles.userNameInput}
                        placeholder="Tên tài khoản"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setPassword(email)}
                    />


                </View>


                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordText}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={secureTextEntry}
                        onChangeText={(password) => setPassword(password)}
                    />

                    <MaterialCommunityIcons style={styles.displayPasswordIcon} name={rightIcon} size={22}
                        color="#232323"
                        onPress={handleIconPassword}
                    />
                </View>

                <TouchableOpacity style={styles.forgetPasswordContainer}
                    onPress={() => {
                        navigation.navigate('LoginForgetPassword')
                    }}
                >
                    <Text style={styles.forgetPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton}
                    onPress={handleLogin}
                >

                    <View style={styles.loginView}>
                        <Text style={styles.loginText}>
                            Đăng nhập
                        </Text>
                    </View>

                </TouchableOpacity>


            </View>
        </View>
    );
}