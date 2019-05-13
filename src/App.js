import React, {Component} from 'react';
import Tasks from './Components/Tasks';
import './App.css';
import Header from './Components/Header';
import AddTask from './Components/AddTask';
import axios from 'axios';

export class App extends Component{
  state = {
    tasks:[]
  }

getAll(){
  const request = new XMLHttpRequest();
  const url = 'http://localhost:8888/tasks/getAllTasks';
  request.open("GET",url);
  request.responseType='json';
  request.setRequestHeader("content-Type","application/json");
  request.onload = () => {
    let list = request.response;
    this.setState({
      tasks:[...this.state.tasks,list]
    });
    request.send();
  };
}


componentDidMount(){
  axios.get('http://localhost:8888/tasks/getAllTasks')
  .then(res=>this.setState({tasks:res.data}));
}



markComplete = (tId) => {
 axios.put(`http://localhost:8888/tasks/update/${tId}`)
 .then(this.setState({tasks:this.state.tasks.map(task=>{
   if(task.tId===tId){
     task.completed=!task.completed
   }
    return task;
 })}))
}

deleteTask = (tId) => {
  axios.delete(`http://localhost:8888/tasks/deleteTask/${tId}`)
    .then(res=>this.setState({tasks:[...this.state.tasks.filter(task => task.tId!==tId)]}));
}

addTask=(statement)=>{
  axios.post('http://localhost:8888/tasks/addTask',{statement})
    .then(res=>this.setState({tasks:[...this.state.tasks, res.data]}))
    .then(axios.get('http://localhost:8888/tasks/getAllTasks')
    .then(res=>this.setState({tasks:res.data})));
}


  render() {

  return(
    <div className="App">
      <Header />
          <AddTask
            addTask={this.addTask}/>
          <Tasks 
            tasks={this.state.tasks} 
            markComplete={this.markComplete} 
            deleteTask={this.deleteTask}/>
    </div>

  );
}
}
export default App;
