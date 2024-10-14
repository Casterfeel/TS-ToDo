import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface Todo {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const remainingItems = todos.filter(todo => !todo.completed).length;

  return (
    <div className="form-todo">
      <h1>Todos</h1>
      <div className="main-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button onClick={addTodo}>
          <FontAwesomeIcon icon={faCircleDown} />
        </button>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
              <button onClick={() => toggleTodo(index)}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-btns">
        <p>{remainingItems} items left</p>
        <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;