import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Switch, FlatList } from 'react-native-gesture-handler';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { AsyncStorage } from "react-native"
import MyButton from './components/MyButton';
import ListItem from './components/ListItem'
import styles from './styles.json'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            dataSource: "",
            activePoints: [],
            activeSwitch: false
        };
    }
    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }

    componentDidMount() {
        this.setPermissions()
        this.getAllData()
    }

    getPosition = async () => {
        let pos = await Location.getCurrentPositionAsync({})
        alert(JSON.stringify(pos, null, 4))
        console.log("data", pos)
        this.setData(JSON.stringify(pos))
        this.getAllData()
    }

    setData = async (data) => {
        //await AsyncStorage.setItem('key1', 'value1');
        let item = JSON.parse(data)
        console.log("data: " + item.timestamp)
        await AsyncStorage.setItem("" + item.timestamp, data);
    }

    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        console.log("keys", keys)
        let stores = await AsyncStorage.multiGet(keys);
        console.log("stores", stores)
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = JSON.parse(store[i][1]);
            console.log(key, value)
            return value
        })
        console.log(maps)
        this.setState({
            dataSource: maps
        })
    }

    removeAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        AsyncStorage.multiRemove(keys, err => {
            if (err == "null")
                alert("Usunieto wszystkie rekordy.")
        })
        let a = await this.getAllData()
    }

    handle = () => {
        this.setState({
            activeSwitch: !this.state.activeSwitch
        })
    }
    change = (time, value) => {
        console.log(time, value)
        if (value) {//off
            arr = this.state.activePoints
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === ""+time) {
                    arr.splice(i, 1);
                    i--;
                }
            }
            console.log(arr)
        }
        else {
            temp = this.state.activePoints
            temp.push(time + "")
            this.setState({
                activePoints: temp
            })
        }
    }
    next = async () => {
        points = []
        arr = this.state.activePoints
        let stores = await AsyncStorage.multiGet(arr);
        let points = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = JSON.parse(store[i][1]);
            return value
        })
        console.log(points)
        this.props.navigation.navigate("s3", { a: JSON.stringify(points) })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <MyButton name="POBIERZ I ZAPISZ POZYCJĘ" activ={true} func={() => this.getPosition()} />
                    <MyButton name="USUŃ WSZYSTKIE DANE" activ={true} func={() => this.removeAllData()} />
                    <MyButton name="PRZEJDŹ DO MAPY" activ={true} func={() => this.next()} />
                    <Switch style={{ justifyContent: "flex-end", alignSelf: "flex-end" }} onChange={() => this.handle()} value={this.state.activeSwitch} />
                </View>
                <View style={styles.flatListContainer}>
                    {
                        this.state.dataSource === "" ?
                            <ActivityIndicator size="large" color="#0000ff" />
                            :
                            <FlatList
                                data={
                                    this.state.dataSource}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <ListItem time={item.timestamp} lali={item.coords.latitude} long={item.coords.longitude} func={this.change} switch={this.state.activeSwitch} />}

                            />
                    }

                </View>
            </View>
        );
    }
}

export default List;
