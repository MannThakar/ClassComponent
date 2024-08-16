import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todosArray: [],
      inputValue: "",
      edit: false,
      currentid: "",
      currentinputValue: "",
    };
  }

  Add = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.inputValue,
      id: Date.now(),
    };
    if (this.state.inputValue !== "") {
      this.setState({
        todosArray: this.state.todosArray.concat(obj),
        inputValue: "",
      });
    }
  };

  Delete = (itemId) => {
    this.setState({
      todosArray: this.state.todosArray.filter((todo) => todo.id !== itemId),
    });
  };

  Edit = (id, newinputValue) => {
    const updatedtodosArray = this.state.todosArray.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: newinputValue };
      }
      return todo;
    });

    this.setState({ todosArray: updatedtodosArray });
  };

  EditTodosFuns = (e) => {
    e.preventDefault();
    this.Edit(this.state.currentid, this.state.currentinputValue);
    this.setState({ edit: false, currentinputValue: "" });
  };

  Toggle = (todo) => {
    this.setState({
      edit: true,
      currentid: todo.id,
      currentinputValue: todo.name,
    });
  };

  render() {
    const mylist = this.state.todosArray.map((todo) => (
      <li key={todo.id} className="todo_item">
        {todo.name}
        <div className="menuButton">
          <button onClick={() => this.Toggle(todo)}>Edit</button>
          <button onClick={() => this.Delete(todo.id)}>Remove</button>
        </div>
      </li>
    ));

    return (
      <div className="App">
        {this.state.edit === false ? (
          <form onSubmit={this.Add}>
            <input
              placeholder="Type your task"
              type={this.state.inputValue}
              onChange={(e) => this.setState({ inputValue: e.target.value })}
            />
            <button type="submit">Add Item</button>
          </form>
        ) : (
          <form onSubmit={this.EditTodosFuns}>
            <input
              placeholder="Edit your task"
              type={this.state.currentinputValue}
              onChange={(e) =>
                this.setState({ currentinputValue: e.target.value })
              }
            />
            <button type="submit">Update Item</button>
          </form>
        )}

        <ul className="todo_wrapper">{mylist}</ul>
      </div>
    );
  }
}

export default App;
