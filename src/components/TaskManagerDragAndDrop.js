import React, { useState } from 'react'

const TaskManagerDragAndDrop = () => {

    const TODO = "todo";
    const INPROGRESS = "inprogress";
    const DONE = "done";


    const [addTask, setAddTask] = useState();
    const [tasklist, setTasklist] = useState([]);
    const [id, setId] = useState(1);
    const [dragTask, setDragTask] = useState(null);

    const handleSubmit = () => {
        const obj = {
            title: addTask,
            status: TODO,
            id: id

        }
        setTasklist([...tasklist, obj]);
        setAddTask("");
        setId(prevId => prevId + 1);
    }
    console.log(tasklist);

    const handleDragStart = (task) => {
        setDragTask(task);
    }
    const handleDragAndDrop = (status) => {
        const updatedTasks = tasklist.map((item, i) => {
            if (dragTask && dragTask.id === item.id) {
                return {
                    ...item,
                    status: status
                }
            }
            return item;
        });
        setTasklist(updatedTasks);
        setDragTask(null);

    }

    const handleDrop = (e) => {
        e.preventDefault();
        const status = e.target.getAttribute('data-status');
        if (status) {
            handleDragAndDrop(status);
        }

    }

    const onDragOver = (e) => {
        e.preventDefault();
    };



    return (
        <div>
            <input type="text" value={addTask} onChange={(e) => setAddTask(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <div className="my-tasklist">

                <div className={TODO} data-status={TODO} onDrop={handleDrop} onDragOver={onDragOver} >
                    <p>Todo</p>

                    {
                        tasklist.filter(task => task.status === "todo").map((task, i) =>
                        (


                            <div draggable key={task.id} onDragStart={(e) => handleDragStart(task)}>{task.title}</div>


                        )
                        )
                    }
                </div>
                <div className={INPROGRESS} data-status={INPROGRESS} onDrop={handleDrop} onDragOver={onDragOver} >
                    <p>In Progress</p>
                    {
                        tasklist
                            .filter(task => task.status === "inprogress")
                            .map((task, i) => (
                                <div draggable onDragStart={(e) => handleDragStart(task)} >{task.title}</div>
                            ))
                    }
                </div>
                <div className={DONE} data-status={DONE} onDrop={handleDrop} onDragOver={onDragOver} >
                    <p>Done</p>
                    {
                        tasklist
                            .filter(task => task.status === "done")
                            .map((task, i) => (
                                <div draggable onDragStart={(e) => handleDragStart(task)}>{task.title}</div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskManagerDragAndDrop