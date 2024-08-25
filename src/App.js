import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import TaskManagerDragAndDrop from './components/TaskManagerDragAndDrop';

function App() {
  return (
    <div className="App">
     <TodoList />
     <TaskManagerDragAndDrop />
    </div>

  );
}

export default App;
