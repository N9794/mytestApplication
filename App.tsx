import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootSiblingParent } from "react-native-root-siblings";
import Store,{ persistor } from "./src/redux/store";
import { StackNavigator } from "./src/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

function App(): JSX.Element {



  return (
    <SafeAreaView style={{flex:1}}>
    <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootSiblingParent>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </RootSiblingParent>
    </PersistGate>
 </Provider>
 </SafeAreaView>
  );
}



export default App;





