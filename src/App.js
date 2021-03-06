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
  const url = '/tasks/getAllTasks';
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
  axios.get('/tasks/getAllTasks')
  .then(res=>this.setState({tasks:res.data}));
}



markComplete = (tId) => {
 axios.put(`/tasks/update/${tId}`)
 .then(this.setState({tasks:this.state.tasks.map(task=>{
   if(task.tId===tId){
     task.completed=!task.completed
   }
    return task;
 })}))
}

deleteTask = (tId) => {
  axios.delete(`/tasks/deleteTask/${tId}`)
    .then(res=>this.setState({tasks:[...this.state.tasks.filter(task => task.tId!==tId)]}));
}

addTask=(statement)=>{
  axios.post('/tasks/addTask',{statement})
    .then(res=>this.setState({tasks:[...this.state.tasks, res.data]}))
    .then(axios.get('/tasks/getAllTasks')
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
