import React, {Component} from 'react';
import PropTypes from 'prop-types';


export  class TaskItem extends Component{
	
	getStyle = () => {
		 
			return{
				background:'#f4f4f4',
				padding:'10px',
				borderBottom:'1px #ccc dotted',
				textDecoration: this.props.task.completed ? 
				'line-through' : 'none'
			}
		
	}



	render(){

		const {tId,statement} = this.props.task;

		return(
				<div style = {this.getStyle()}>
					<p> 
					<input type="checkbox" onChange={this.props.markComplete.bind(this, tId)}/> {'   '}
					{statement}
					<button onClick={this.props.deleteTask.bind(this,tId)} style={btnStyle}>x</button>
					</p>
				</div>
			)
	}
}

//  PropTypes
TaskItem.propTypes={
	task: PropTypes.object.isRequired,
	markComplete:PropTypes.func.isRequired,
	deleteTask:PropTypes.func.isRequired,
}

const btnStyle = {
	background:'#ff0000',
	color:'#fff',
	border:'none',
	padding:'5px 9px',
	borderRadius:'50%',
	cursor:'pointer',
	float:'right'
}

export default TaskItem
