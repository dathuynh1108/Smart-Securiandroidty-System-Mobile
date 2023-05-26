import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Configuration from "./components/Configuration";
import Event from "./components/Event";
import Welcome from "./components/Welcome";
import EventDetail from "./components/EventDetail";
import ConfigurationCameraDetail from "./components/ConfigurationCameraDetail";
import ConfigurationIOTDetail from "./components/ConfigurationIOTDetail";
import Monitor from "./components/Monitor";
import Dashboard from "./components/Dashboard";
import Report from "./components/Report";
import Login from "./components/Login";
import LoginForgetPassword from "./components/LoginForgetPassword";
import Personal from "./components/Personal";
import Notifications from "./components/Notifications";
import { Provider } from 'react-redux';

import store from './global/store';
import MonitorVideoPTZ from './components/MonitorVideoPTZ';

const Stack = createNativeStackNavigator();

export default function App() {
    console.log('ok')
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Login'
                    screenOptions={({ route, navigation }) => ({
                        headerTitleAlign: 'center',
                    })}
                >
                    <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Smart Surveillance System' }} />
                    <Stack.Screen name="Event" component={Event} options={{ title: 'Sự kiện' }} />
                    <Stack.Screen name="EventDetail" component={EventDetail} options={{ title: 'Chi tiết sự kiện' }} />
                    <Stack.Screen name="Configuration" component={Configuration} options={{ title: 'Cấu hình' }} />
                    <Stack.Screen name="ConfigurationCameraDetail" component={ConfigurationCameraDetail} options={{ title: 'Chi tiết camera' }} />
                    <Stack.Screen name="ConfigurationIOTDetail" component={ConfigurationIOTDetail} options={{ title: 'Chi tiết cảm biến' }} />
                    <Stack.Screen name="Monitor" component={Monitor} options={{ title: 'Giám sát' }} />
                    <Stack.Screen name="MonitorVideoPTZ" component={MonitorVideoPTZ} options={{ title: 'Điều khiển camera' }} />
                    <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Tổng quát' }} />
                    <Stack.Screen name="Report" component={Report} options={{ title: 'Báo cáo' }} />
                    {/* <Stack.Screen name="Login" component={Login} options={{title: 'Trang đăng nhập'}}/> */}
                    <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
                    <Stack.Screen name="LoginForgetPassword" component={LoginForgetPassword} options={{ title: 'Quên mật khẩu' }} />
                    <Stack.Screen name="Personal" component={Personal} options={{ title: 'Cá nhân' }} />
                    <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Thông báo' }} />

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}