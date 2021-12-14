import React, { Component } from "react"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import Grid from "@material-ui/core/Grid"

const api_todos = process.env.REACT_APP_API + 'api/v1/todos'

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
    this.updateTodoList = this.updateTodoList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    // les credentials donnent le current user
    fetch(api_todos, {'credentials': 'include'})
    .then(response => response.json())
    .then(response_items => {
      this.setState({
        items: response_items.reverse()
      })
    })
    .catch(error => console.log('api errors:', error));
  }

  updateTodoList(item) {
    let _items = this.state.items
    _items.unshift(item)
    this.setState({
      items: _items
    })
  }

  deleteItem(item) {
    // delete the item remotely
    var deleteURL = api_todos + `/${item.id}`
    fetch(deleteURL, {
      method: "DELETE",
      // les credentials donnent le current user
      'credentials': 'include'
    }).then(() => {
      // Client side delete
      var _items = this.state.items;
      var index = _items.indexOf(item)
      _items.splice(index, 1);
      this.setState({
        item: _items
      })
    })
  }

  render () {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TodoForm api_todos={api_todos} updateTodoList={this.updateTodoList} />
        </Grid>
        <Grid item xs={12} id="todo_list">
          {this.state.items.map((item) => (
            <TodoItem
            key={item.id}
            item={item}
            deleteItem={this.deleteItem}/>
          ))}
        </Grid>
      </Grid>
    )
  }
}
export default TodoList;