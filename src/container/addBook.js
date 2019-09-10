import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Api from '../config/api';


export default class Addbook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isbn: '3334567123-467',
      title: '',
      author: '',
      publicationDate: '2019-09-09T16:39:00.874Z',
      description: ''
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add new book',
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
          onPress={navigation.getParam('addBook')}
        >
          <Text style={styles.txt}>Save</Text>
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount = async () => {
    this.props.navigation.setParams({
      goBack: this.goBack,
      addBook: this.addBook
    });
  }

  goBack = () => {
    const { goBack } = this.props.navigation;
    goBack()
  }

  addBook = async () => {
    if (this.state.title === '' || this.state.author === '' || this.state.description === '') {
      alert('請輸入完整資訊')
      return
    }
    try {
      let saveBook = await fetch(Api.url + `/books`, {
        method: 'POST',
        headers: {
          Accept: 'application/ld+json',
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({
          "isbn": null,
          "title": this.state.title,
          "description": this.state.description,
          "author": this.state.author,
          "publicationDate": new Date(),
          "reviews": []
        }),
      });
      this.setState({
        title: '',
        author: '',
        description: ''
      })
      alert('新增完成');

    }
    catch (err) {
      console.log('err:', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.label}>Title :</Text>
        <TextInput
          style={styles.smallText}
          placeholder='title'
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}
        />

        <Text style={styles.label}>Author :</Text>
        <TextInput
          style={styles.smallText}
          placeholder='author'
          value={this.state.author}
          onChangeText={(author) => this.setState({ author })}
        />

        <Text style={styles.label}>Description :</Text>
        <TextInput
          style={styles.bigText}
          placeholder='description'
          multiline
          numberOfLines={5}
          value={this.state.description}
          onChangeText={(description) => this.setState({ description })}
        />
      </View>
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
  label: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  smallText: {
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    borderRadius: 5
  },
  bigText: {
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5
  },
});
