import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Button from './src/components/ButtonTouchableOpacity';
import {getCount, getFName, getLName} from './src/utils/helpers';
import {
  addUserData,
  getAllUsersData,
  listenForChange,
  listenForOneDoc,
  fireQuery,
} from './src/services/userServices';

class App extends Component {
  state = {
    isLoading: false,
    data: '',
    error: null,
  };

  addUser = () => {
    this.setState({isLoading: true, error: null});
    const userNumber = getCount();

    addUserData(
      new Date().getTime().toString(),
      `mukeshkumar${userNumber}@gmail.com`,
      getFName(),
      getLName(),
    )
      .then(() => {
        this.setState({isLoading: false});
      })
      .catch(error => {
        this.setState({isLoading: false, error: error});
      });
  };

  getAllUsers = () => {
    this.setState({isLoading: true, error: null});
    getAllUsersData()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        console.log(data); // array of cities objects
        this.setState({isLoading: false, data: data});
      })
      .catch(error => {
        console.error('Error reading document: ', error);
        this.setState({isLoading: false, error: error});
      });
  };

  setListener = () => {
    listenForChange(data => {
      this.setState({isLoading: false, data: data});
    });

    // listenForOneDoc(data => {
    //   this.setState({isLoading: false, data: data});
    // });
  };

  fireQuery = () => {
    fireQuery()
      .then(data => {
        this.setState({isLoading: false, data: data});
      })
      .catch(error => {
        this.setState({isLoading: false, error: error});
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          renderItem={({item}) => (
            <View style={styles.flatview}>
              <Text style={styles.itemText}>{item.fname}</Text>
              <Text style={styles.itemText}>{item.lname}</Text>
              <Text style={styles.itemText}>{item.email}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        {this.state.isLoading && (
          <ActivityIndicator style={{marginBottom: 10}} />
        )}
        {this.state.error && (
          <Text style={styles.errorText}>Error Occured</Text>
        )}
        <View style={styles.buttonGroup}>
          <Button onPress={this.addUser}>
            <Text style={styles.buttonTitle}>Add 1 item</Text>
          </Button>

          <Button onPress={this.getAllUsers}>
            <Text style={styles.buttonTitle}>Get All</Text>
          </Button>

          <Button onPress={this.setListener}>
            <Text style={styles.buttonTitle}>Add Listener</Text>
          </Button>

          <Button onPress={this.fireQuery}>
            <Text style={styles.buttonTitle}>Fire Query</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'blue',
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  flatList: {
    width: '100%',
  },
  flatview: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
