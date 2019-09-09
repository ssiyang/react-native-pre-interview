import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

import Api from '../config/api';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookData: [],
            BookDetail: {}
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: '#FFAA33'
            },
            headerRight: (
                <TouchableOpacity
                    onPress={navigation.getParam('newBook')}
                >
                    <Text style={styles.txt}>New</Text>
                </TouchableOpacity>
            ),
        };
    };

    componentDidMount = async () => {
        this.props.navigation.setParams({
            newBook: this.newBook
        });
        try {
            let response = await fetch(Api.url + `/books`);
            let responseValue = await response.json();
            this.setState({
                bookData: responseValue['hydra:member']
            })
        }
        catch (err) {
            console.log('err:', err)
        }
    }

    newBook = () => {
        alert('123')
    }

    onGoBookDetail = async (id) => {
        const { navigate } = this.props.navigation;
        let response = await fetch(Api.url + id);
        let getBookDetail = await response.json();
        let goBookDetail = await navigate('BookDetail', {
            title: getBookDetail.title,
            author: getBookDetail.author,
            publicationDate: getBookDetail.publicationDate,
            description: getBookDetail.description
        });
        console.log(getBookDetail.title)
    }

    keyExtractor = (item, index) => { return index.toString() };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={this.onGoBookDetail.bind(this, item['@id'])}
            >
                <View style={styles.title}>
                    <Text numberOfLines={2} style={styles.titleTxt}>{item.title}</Text>
                </View>
                <View style={styles.description}>
                    <Text numberOfLines={2} style={styles.descriptionTxt}>{item.description}</Text>
                </View>
                <View>
                    <Text style={styles.authorTxt}>by {item.author.substring(0, 5)}　{item.publicationDate.substring(0, 10)}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        if (this.state.bookData.length === 0) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color='blue' />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.bookData}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',

    },
    container: {
        backgroundColor: '#F5F5F5'
    },
    txt: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 20,
    },
    cardContainer: {
        height: height * 0.25,
        width: height * 0.25,
        backgroundColor: 'white',
        marginTop: 25,
    },
    row: {
        flex: 1,
        justifyContent: "space-evenly"
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt: {
        marginLeft: 5,
        marginRight: 5,
    },
    descriptionTxt: {
        marginLeft: 5,
        marginRight: 5,
        color: '#888888'
    },
    authorTxt: {
        fontStyle: 'italic',
        marginLeft: 5,
        marginBottom: 10,
        color: '#888888'
    }
});

