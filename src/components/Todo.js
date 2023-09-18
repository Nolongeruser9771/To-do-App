import { useEffect, useState } from "react";

function Todo({ todo, onDeleteBtnClick, onCheckBtnClick, onEditBtnClick}) {
    //tô đỏ task done
    const [textColor, setTextColor] = useState("white");
    const [textDecor, setTextDecor] = useState("none");

    useEffect(() => {
        if(todo.isDone==="y") return (
            setTextColor("firebrick"),
            setTextDecor("line-through")
        )
        else return (
            setTextColor("white"),
            setTextDecor("none")
        )
    },[todo])

    const attributes = {
        color: textColor,
        textDecoration: textDecor
    }
    return (
        <div className="task-container">
            <li>
                {
                    todo.isDone === 'y' ?
                    <input id="checkBox" type="checkbox" onClick={()=>onCheckBtnClick(todo.id)} defaultChecked/>:
                    <input id="checkBox" type="checkbox" onClick={()=>onCheckBtnClick(todo.id)} />

                }
                <span style={attributes}>
                    {todo.name}
                </span>
            </li>
            <div className="task-btn-container">
                <button className="modifiedBtn" onClick={()=>onEditBtnClick(todo.id)}>Edit</button>
                <button className="modifiedBtn" onClick={()=>onDeleteBtnClick(todo.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Todo;