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
            lastPage: '',
            nextPage: '',
            currentPage: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: '圖書列表',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: 'white',
            },
            headerStyle: {
                backgroundColor: '#FFAA33'
            },
            headerLeft: (
                <View />
            ),
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
            let response = await fetch(Api.url + `/books`, {
                method: 'GET',
                headers: {
                  Accept: 'application/ld+json',
                  'Content-Type': 'application/ld+json',
                }});
                
            let responseValue = await response.json();
            this.setState({
                bookData: responseValue['hydra:member'],
                lastPage: responseValue['hydra:view']['hydra:last'],
                nextPage: responseValue['hydra:view']['hydra:next'],
                currentPage: responseValue['hydra:view']['@id']
            })
        }
        catch (err) {
            console.log('err:', err)
        }
    }

    newBook = () => {
        const { navigate } = this.props.navigation;
        navigate('AddBook')
    }

    refreshData = async () => {
        try {
            let response = await fetch(Api.url + `/books`);
            let responseValue = await response.json();
            this.setState({
                bookData: responseValue['hydra:member'],
                lastPage: responseValue['hydra:view']['hydra:last'],
                nextPage: responseValue['hydra:view']['hydra:next'],
                currentPage: responseValue['hydra:view']['@id']
            })
        }
        catch (err) {
            console.log('err:', err)
        }
    }

    onGoBookDetail = async (id) => {
        const { navigate } = this.props.navigation;
        let response = await fetch(Api.url + id);
        let getBookDetail = await response.json();
        let goBookDetail = await navigate('BookDetail', {
            isbn: getBookDetail.isbn,
            title: getBookDetail.title,
            description: getBookDetail.description,
            author: getBookDetail.author,
            publicationDate: getBookDetail.publicationDate,
            id: id
        });
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

    onGetNextPage = async () => {
        if (this.state.currentPage !== this.state.lastPage) {
            try {
                let response = await fetch(Api.url + this.state.nextPage);
                let responseValue = await response.json();
                this.setState(prevState => ({
                    bookData: prevState.bookData.concat(responseValue['hydra:member']),
                    currentPage: responseValue['hydra:view']['@id'],
                    nextPage: responseValue['hydra:view']['hydra:next']
                }))
            }
            catch (err) {
                console.log('err:', err)
            }
        }
    }


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
                    onEndReachedThreshold={0.9}
                    onEndReached={this.onGetNextPage}
                    onRefresh={this.refreshData}
                    refreshing={false}
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

