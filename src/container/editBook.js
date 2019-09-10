import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Api from '../config/api';


export default class EditBook extends React.Component {
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
      title: 'Edit the book',
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
          onPress={navigation.getParam('saveBook')}
        >
          <Text style={styles.txt}>Save</Text>
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount = async () => {
    this.props.navigation.setParams({
      goBack: this.goBack,
      saveBook: this.saveBook
    });
  }

  goBack = () => {
    const refreshData = this.props.navigation.state.params.refreshData
    const { goBack } = this.props.navigation;
    refreshData()
    goBack()
  }

  saveBook = async () => {
    try {
      let saveBook = await fetch(Api.url + this.state.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/ld+json',
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({
          "isbn": this.state.isbn,
          "title": this.state.title,
          "description": this.state.description,
          "author": this.state.author,
          "publicationDate": this.state.publicationDate,
          "reviews": []
        }),
      });
      alert('修改完成');
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
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}
        />

        <Text style={styles.label}>Author :</Text>
        <TextInput
          style={styles.smallText}
          value={this.state.author}
          onChangeText={(author) => this.setState({ author })}
        />

        <Text style={styles.label}>Created at:</Text>
        <TextInput
          style={styles.smallText}
          value={this.state.publicationDate}
          onChangeText={(publicationDate) => this.setState({ publicationDate })}
        />

        <Text style={styles.label}>Description :</Text>
        <TextInput
          style={styles.bigText}
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
