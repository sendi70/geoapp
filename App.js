import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./Main"
import List from './List'
import Map from './Map'


const Root = createStackNavigator({
  s1: { screen: Main },
  s2: { screen: List },
  s3: { screen: Map }
});


const App = createAppContainer(Root);

export default App;