import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const width = Dimensions.get('window').width;

export default class BookDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: '#FFAA33',
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: 'white',
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={navigation.getParam('goBack')}
                >
                    <Text style={styles.txt}>Back</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={navigation.getParam('editBook')}
                >
                    <Text style={styles.txt}>Edit</Text>
                </TouchableOpacity>
            ),
        };
    };

    componentDidMount = async () => {
        this.props.navigation.setParams({
            goBack: this.goBack,
            editBook: this.editBook
        });
    }

    goBack = () => {
        const { goBack } = this.props.navigation;
        goBack()
    }

    editBook = () => {
        alert('123')
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.author}>
                    <View style={styles.authorContainer}>
                        <Text style={styles.authorTxt}> Author: {this.props.navigation.state.params.author}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateTxt}> {this.props.navigation.state.params.publicationDate.substring(0, 10)}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.descriptionTxt}>{this.props.navigation.state.params.description}</Text>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    txt: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 20,
        marginLeft: 20,
        fontSize: 16
    },
    author: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
    },
    authorContainer: {
        width: width * 0.65,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    dateContainer: {
        width: width * 0.35,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    authorTxt: {
        color: '#888888',
        marginLeft: 20,
        
    },
    dateTxt: {
        color: '#888888',
        marginRight: 20,
    },
    descriptionTxt: {
        color: 'black',
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16
    }
});

