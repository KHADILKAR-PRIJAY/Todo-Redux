import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput, Divider } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/actions';


// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list, addTodo, deleteTodo }) => {
  const [task, setTask] = React.useState('');
  const [assignee, setAssignee] = React.useState('');

  const handleAddTodo = () => {
    addTodo(task,assignee)
    setTask('')
    setAssignee('')
  }

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          
          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer/>
          <TextInput
            mode="outlined"
            label="Assignee"
            value={assignee}
            onChangeText={assignee => setAssignee(assignee)}
          />
          <Spacer/>
          <Button mode="contained" onPress={handleAddTodo}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
            <Card>
              <Card.Title
                // title={`Task#${item.id}`}
                title={item.assignee}
                left={(props) => <Icon name="user" size={24} color="black" />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
              />
              <Card.Content>
                <Divider/>
                <Paragraph style={styles.task}>{item.task}</Paragraph>
              </Card.Content>
            </Card>
            <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task:{
    padding:15,
    marginHorizontal:2,
    marginVertical:10,
    backgroundColor: '#F8F8F8',
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
