import React from "react";
import Todo from "./Todo";

function TodoList({ todoList, onDeleteBtnClick, onCheckBtnClick, onEditBtnClick}) {
    return (
        <>
            {
                todoList.map(todo => <Todo key={todo.id} todo={todo} 
                    onDeleteBtnClick={onDeleteBtnClick} 
                    onCheckBtnClick={onCheckBtnClick}
                    onEditBtnClick={onEditBtnClick}/>)
            }
        </>
    );
}

export default TodoList;