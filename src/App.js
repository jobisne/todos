import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Alert from './components/Alert';
import Nav from './components/layout/Nav';
import About from './components/pages/About';
import Register from './components/user/Register';
import Login from './components/user/Login';
import userData from './userData';


import axios from 'axios';
// import uuid from 'uuid';
import './App.css';
import Landing from './components/pages/Landing';

class App extends Component {
 
  state = {
    todos: [],
    isLoggedIn: false,
    alert: null,
    isLoading: false
  };
  componentDidMount() {
    this.setState({ isLoading: true})
    axios
      .get('http://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data, isLoading: false }));
  }

  // Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Delete Todo
  deleteTodo = id => {
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );

    // console.log('tes', id)
  };

  //Add Todo
  addTodo = title => {
    axios
      .post('http://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));

    // console.log(title);
  };
  //Add User
  addUser = user => {
    userData.push(user);
    console.log(userData);
   
  }
  //Login User
  loginUser = userInfo => {
    let status;
    this.setState({ isLoggedIn: true });
    userData.forEach(user => {
      if(user.email === userInfo.email && user.password === userInfo.password) {
        // console.log('yes');
       status = true
      } 
    })
    return status
  }

  //Alert User
  alert = (msg, type) => {
    this.setState({ alert: {msg, type}});

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  }

  render() {
    return (
      <Router>
        <div className="App">
            <Nav loggedIn={this.state.isLoggedIn}/>
            <Route exact  path="/" component={Landing} />
          <div className="container">
            
            
            <Route
              exact
              path="/myapp"
              render={props => (
                <React.Fragment>
                  
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    deleteTodo={this.deleteTodo}
                    isLoading={this.state.isLoading}
                  />
                  <Alert  alert={this.state.alert}/>
                  <AddTodo addTodo={this.addTodo} alert={this.alert} />
                  
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/register" render={props => (
              <React.Fragment>
                <Register addUser={this.addUser} />
              </React.Fragment>
            )} 

            />
            <Route path="/login" render={props => (
              <React.Fragment>
                <Login {...props} loginUser={this.loginUser}/>
              </React.Fragment>
            )}
             />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
