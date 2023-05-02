import {Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import '../../styles/appStyles'
import {appStyles} from "../../styles/appStyles";
import {styles} from "./styles"
import logo from "../../assets/hcmut.png";

export default function LoginForgetPassword({navigation}) {

    return (
        <View style={appStyles.appContainer}>
            <View style={styles.forgetPasswordContainer}>
                <Image source={logo} style={styles.logo}/>

                <View style={styles.recoverPassContainer}>
                    <Text style={styles.recoverPassText}>Khôi phục mật khẩu</Text>
                </View>

                <View style={styles.emailInputContainer}>
                    <TextInput
                        style={styles.emailInputText}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                    />
                </View>


                <View style={styles.noteContainer}
                >
                    <Text style={styles.noteText}>
                        <Text style={styles.directionText}>
                            Hướng dẫn:
                        </Text>
                        <Text> </Text>
                        <Text>
                            Bạn sẽ nhận được email có liên kết đặt lại mật khẩu.
                        </Text>
                    </Text>
                </View>


                <TouchableOpacity style={styles.sendLinkButton}>
                    <View style={styles.sendLinkView}>
                        <Text style={styles.sendLinkText}>
                            Gửi liên kết
                        </Text>
                    </View>

                </TouchableOpacity>


            </View>


        </View>
    );
}