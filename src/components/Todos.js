import React, { Component } from 'react';
import Todoitem from './Todoitem';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import '../App.css';

class Todos extends Component {
  
  render() {
    if(this.props.isLoading){
      return <Spinner />
    } else {
      return this.props.todos.map((todo) => (
      <Todoitem key={todo.id} todo={todo} markComplete = {this.props.markComplete} deleteTodo = {this.props.deleteTodo} />
      ))
    }
  }
}


// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired

}

export default Todos;
