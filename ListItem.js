import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MyButton from './MyButton'
import { Switch } from 'react-native-gesture-handler';
//import styles from './../styles.json'

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activ: this.props.switch,
            checked: false
        };
    }
    componentDidUpdate(prevProps) {
        // Typowy sposób użycia (nie zapomnij porównać właściwości):
        if (this.props.switch !== prevProps.switch) {
            if (this.props.switch) {
                this.setState({
                    checked: true
                })
                let a = () => this.props.func(this.props.time, this.state.checked)
                a()
            }
        }
    }

    //next = () => this.props.navigation.navigate("s3", { name: this.props.name, pass: this.props.pass })
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../img/map.png')} style={styles.image} />
                <View style={{ flexDirection: "column", flex: 2, alignItems: 'center' }}>
                    <Text style={styles.text}>timestamp: {this.props.time}: </Text>
                    <Text style={styles.text}>latitude: {this.props.lali} </Text>
                    <Text style={styles.text}>longitude: {this.props.long} </Text>
                </View>
                <View style={styles.container2}>
                    <Switch onChange={() => this.setState({ checked: !this.state.checked })} onValueChange={() => this.props.func(this.props.time, this.state.checked)} value={this.state.checked} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 0.5,
        margin: 20,
        height: 50,
        resizeMode: "stretch"

    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 12,
    },
    container2: {
        flex: 0.5,
        flexDirection: "row",
        margin: 20,
        justifyContent: 'flex-end'
    }
})

export default ListItem;
