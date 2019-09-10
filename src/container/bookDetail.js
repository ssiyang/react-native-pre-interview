import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Button
} from 'react-native';

import Api from '../config/api'

const width = Dimensions.get('window').width;

export default class BookDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isbn: this.props.navigation.state.params.isbn,
            title: this.props.navigation.state.params.title,
            author: this.props.navigation.state.params.author,
            publicationDate: this.props.navigation.state.params.publicationDate,
            description: this.props.navigation.state.params.description,
            id: this.props.navigation.state.params.id
        }
    }

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

    refreshData = async() => {
        try{
            const { navigate } = this.props.navigation;
            let response = await fetch(Api.url + this.state.id);
            let getBookDetail = await response.json();
            this.props.navigation.setParams({
                Title : getBookDetail.title
            })
            this.setState({
                author: getBookDetail.author,
                publicationDate: getBookDetail.publicationDate,
                description: getBookDetail.description,
            })
        }
         catch (err) {
             console.log('err:', err)
         }
    }

    goBack = () => {
        const { goBack } = this.props.navigation;
        goBack()
    }

    editBook = () => {
        const { navigate } = this.props.navigation;
        navigate('EditBook', {
            isbn: this.state.isbn,
            title: this.state.title,
            author: this.state.author,
            publicationDate: this.state.publicationDate,
            description: this.state.description,
            refreshData: this.refreshData,
            id: this.state.id
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.author}>
                    <View style={styles.authorContainer}>
                        <Text style={styles.authorTxt}> Author: {this.state.author}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateTxt}> {this.state.publicationDate.substring(0, 10)}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.descriptionTxt}>{this.state.description}</Text>
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

