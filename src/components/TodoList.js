import React, { useState, useRef, useEffect } from "react";

const TodoList = () => {
  const TODO = "todo";
  const INPROGRESS = "inprogress";
  const DONE = "done";

  const [task, setTask] = useState();
  const [list, setList] = useState([]);
  const [id, setId] = useState(1);
  const [todos, setTodos] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [open, setOpen] = useState();
  const [idToEdit, setIdToEdit] = useState();
  console.log(idToEdit);
  console.log(task);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideclick = (e) => {
      console.log(modalRef.current.value);
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideclick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideclick);
    };
  }, []);

  const addToList = () => {
    const obj = {
      task: "todo",
      name: task,
      id: id,
    };
    setList((prev) => [...prev, obj]);
    setTask("");
    setId((id) => id + 1);
  };

  const EditTask = (value) => {
    console.log(value);
    setIdToEdit(value);
    setOpen(true);
  };
  const changeTask = (value) => {
    const updatedList = list.filter((item) => {
      if (item.id === idToEdit) {
        item.task = value;
      }
      return item;
    });
    console.log(updatedList);
    setList(updatedList);
    setOpen(false);
  };
  return (
    <div className="todo-wrapper">
      TodoDropdown
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addToList}>Add Task</button>
        <select>
          <option value="0">Filter By Task</option>
          <option value={TODO}>Todo</option>
          <option value={INPROGRESS}>InProgress</option>
          <option value={DONE}>Done</option>
        </select>
      </div>
        <div className="taskList-wrapper">
          <div>
            <p>Todo</p>
            <div>
              {list.filter(item => item.task === TODO).map((task, i) => {
                return (
                  <>
                    <div>
                      {task.name}
                      <button onClick={(e) => EditTask(task.id)}>Edit</button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div>
            <p>InProgress</p>
            <div>
              {list.filter(item => item.task === INPROGRESS).map((task, i) => {
                return (
                  <>
                    <div>
                      {task.name}
                      <button onClick={(e) => EditTask(task.id)}>Edit</button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div>
            <p>Done</p>
            <div>
              {list.filter(item => item.task === DONE).map((task, i) => {
                return (
                  <>
                    <div>
                      {task.name}
                      <button onClick={(e) => EditTask(task.id)}>Edit</button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          
        </div>

        <div
          ref={modalRef}
          className="modal"
          style={{ display: open ? "block" : "none" }}
        >
          {/* <input value={} type="text" onChange={(e) => setEditTask} />
           */}
          <div>
            <div onClick={() => changeTask(TODO)}>{TODO}</div>
            <div onClick={() => changeTask(INPROGRESS)}>{INPROGRESS}</div>
            <div onClick={() => changeTask(DONE)}>{DONE}</div>
          </div>
        </div>
      </div>
  );
};

export default TodoList;
