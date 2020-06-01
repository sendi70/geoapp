import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import MyButton from './components/MyButton'
import styles from './styles.json'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.view}>
                    <Text style={{ fontSize: 45 }}>GeoMap App</Text>
                    <Text>find and save your position</Text>
                </View>
                <View style={styles.view2}>
                    <MyButton name="START" activ={true} func={() => this.props.navigation.navigate("s2")} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Main;
