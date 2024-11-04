import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Startapp from "../screens/Startapp";
import Login from "../screens/Login";
import Forgotpass from "../screens/Forgotpass";
import Resetpass from "../screens/Resetpass";
import Resetconfirm from "../screens/Resetconfirm";
import Signup from "../screens/Signup";
import Plscheck from "../screens/Plscheck";
import Homepage from "../screens/Homepage";
import Pets from "../screens/Pets";
import Profilescreen from "../screens/Profilescreen";
import ChangePassword from "../screens/Changpassword";
import Medicalsched from "../screens/Medicalsched";
import Compawnionsched from "../screens/Compawnionsched";
const Stack = createNativeStackNavigator();

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Startapp" screenOptions={{
                    headerShown: false,}}>
                <Stack.Screen name="Startapp" component={Startapp} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Forgotpass" component={Forgotpass} />
                <Stack.Screen name="Resetpass" component={Resetpass} />
                <Stack.Screen name="Resetconfirm" component={Resetconfirm} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Plscheck" component={Plscheck}/>
                <Stack.Screen name="Homepage" component={Homepage}/>
                <Stack.Screen name="Pets" component={Pets}/>
                <Stack.Screen name="Profilescreen" component={Profilescreen}/>
                <Stack.Screen name="Changepassword" component={ChangePassword}/>
                <Stack.Screen name="Medicalsched" component={Medicalsched}/>
                <Stack.Screen name="Compawnionsched" component={Compawnionsched}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
