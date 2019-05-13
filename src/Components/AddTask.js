import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AddTask extends Component{

	state={
		statement:''
	}

	onChange=(e)=>this.setState({[e.target.name]:e.target.value});
	onSubmit=(e)=>{
		e.preventDefault();
		this.props.addTask(this.state.statement);
		this.setState({
			statement:'',
		});
	}
	render(){
		return(
			<form onSubmit={this.onSubmit} style={{display:'flex'}}>
				<input 
					type="text" 
					name="statement" 
					placeholder="add task ..." 
					style={{flex:'10',margin:'50px'}} 
					value={this.state.statement} 
					onChange={this.onChange}/>
				<input 
					type="submit" 
					value="Add" 
					className="btn" 
					style={{flex:'1'}}/>
			</form>
		)
	}

}

AddTask.propTypes={
	addTask: PropTypes.func.isRequired
}

export default AddTask