import { Button, Dimensions, Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import '../../styles/appStyles'
import { appStyles } from "../../styles/appStyles";
import logo from '../../assets/hcmut.png';
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from '@react-navigation/native';
import { styles } from "./styles";
import { LoginAPI } from "../../apis/LoginAPI";

const { screenWidth } = Dimensions.get("window").width;
const { screenHeight } = Dimensions.get("window").height;

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');
    const [trueAuthen, setTrueAuthen] = useState(true);
    const handleIconPassword = () => {
        if (rightIcon == 'eye-off') {
            setSecureTextEntry(false);
            setRightIcon('eye');
        } else if (rightIcon == 'eye') {
            setSecureTextEntry(true);
            setRightIcon('eye-off')
        }
    }
    const handleLogin = async () => {
        // check account
        let usernameParam = email;
        let passwordParam = password;
        return await LoginAPI.login({ "username": usernameParam, "password": passwordParam }).then(res => {
            if (!res) {
                console.log("cac")
                setTrueAuthen(false)
                return null;
            } else {
                if (res.data.user_detail.token && res.data.user_detail.role == 'supervisor') {
                    console.log("have token API: ", res.data.user_detail)
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
                    // sessionStorage.setItem('jwt', res.data.user_detail.token);
                    // const origin = location.state?.from?.pathname || '/dashboard';
                    // console.log("origin: ", origin)
                    // // window.location.replace(`http://localhost:${process.env.REACT_APP_PORT}/dashboard`)
                    // window.location.replace(`/dashboard`)
                } else {
                    setTrueAuthen(false)
                    return null;
                }
            }
        })

        // navigation.dispatch(state => {
        //     return CommonActions.reset({
        //         index: 0,
        //         routes: [{
        //             name: 'Welcome',
        //             // state: {
        //             //     routes: [{
        //             //         name: 'MainTabScreen',
        //             //         state: {
        //             //             routes: [{
        //             //                 name: 'Dashboard',
        //             //                 params: {}
        //             //             }]
        //             //         }
        //             //     }]
        //             // }

        //         }]
        //     })
        // })
        // navigation.navigate('Welcome')
    }

    return (
        <View style={appStyles.appContainer}>
            <View style={styles.loginContainer}>
                <Image source={logo} style={styles.logo} />

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Welcome back.</Text>
                </View>

                {
                    trueAuthen ?
                        ''
                        :
                        <View style={{
                            width: '80%',
                            height: 20,
                            marginBottom: 10
                        }}>
                            <Text style={{
                                color: 'red',
                                fontWeight: 'bold'
                            }}>
                                * Tài khoản hoặc mật khẩu không hợp lệ.
                            </Text>
                        </View>

                }

                <View style={styles.usernameContainer}>
                    <TextInput
                        style={styles.userNameInput}
                        placeholder="Tên tài khoản"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
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
                    {/* <Text style={styles.forgetPasswordText}>Quên mật khẩu?</Text> */}
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