import { useCallback, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("TODO_LIST_STORAGE")
      ? JSON.parse(localStorage.getItem("TODO_LIST_STORAGE"))
      : []
  ); //array lưu to-do list

  const [textInput, setTextInput] = useState(""); //lưu giá trị input
  const [emptyDisplay, setEmptyDisplay] = useState("block"); //hiển thị thông báo emptylist

  useEffect(() => {
    localStorage.setItem("TODO_LIST_STORAGE", JSON.stringify(todoList));
    console.log(localStorage.getItem("TODO_LIST_STORAGE"));
  }, [todoList]);

  //set textInput = value of input
  const textInputChange = (e) => {
    setTextInput(e.target.value);
  };
  //create AUTO_ID
  const autoId = () => {
    return Math.floor(Math.random() * 10000);
  };
  //set to-do list (oldList + newTodo)
  const onAddBtnClick = () => {
    if (textInput !== "") {
      setTodoList([
        { id: autoId(), name: textInput, isDone: "n" },
        ...todoList,
      ]);
      setTextInput("");
    }
  };

  //filter todoList on Delete button Click
  const onDeleteBtnClick = (id) => {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
  };

  //checked if todo.isDone = true;
  const onCheckBtnClick = useCallback((id) => {
    setTodoList((oldlist) =>
      oldlist.map((todo) =>
        todo.id === id
          ? todo.isDone === "n"
            ? { ...todo, isDone: "y" }
            : { ...todo, isDone: "n" }
          : todo
      )
    );
  }, []);

  //edit tasks
  const onEditBtnClick = (id) => {
    const taskEdit = prompt("Enter your edit");
    if (taskEdit !== "" && taskEdit !== undefined && taskEdit !== null) {
      setTodoList((oldlist) =>
        oldlist.map((todo) =>
          todo.id === id ? { ...todo, name: taskEdit } : todo
        )
      );
    }
  };

  //announce empty list
  useEffect(() => {
    if (todoList.length !== 0) {
      return setEmptyDisplay("none");
    } else setEmptyDisplay("block");
  }, [todoList]);

  return (
    <div className="App">
      <h3>TodoList App</h3>
      <div id="content-input">
        <input
          className="input-task"
          placeholder="Enter todo title ..."
          value={textInput}
          onChange={textInputChange}
        ></input>

        <button id="addBtn" onClick={onAddBtnClick}>
          Add
        </button>
      </div>

      <div className="todo-list">
        <span style={{ display: emptyDisplay }}>Danh sách công việc trống</span>
        <TodoList
          todoList={todoList}
          onDeleteBtnClick={onDeleteBtnClick}
          onCheckBtnClick={onCheckBtnClick}
          onEditBtnClick={onEditBtnClick}
        />
      </div>
    </div>
  );
}

export default App;
