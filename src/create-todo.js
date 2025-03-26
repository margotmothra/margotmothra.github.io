import React from 'react';
import _ from 'lodash';

export default class CreateTodo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null
		};
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}
		return <div style={{ color: 'red'}}>{this.state.error}</div>
	}


	render() {
		return (
			<form onSubmit={this.handleCreate.bind(this)}>
			    <div class="row">
                    <div class="input-field col s8 m4 offset-s2 offset-m4">
                        <input type='text' placeholder='Item to rank' ref='createInput' />    
                    </div>
                    <button class="btn waves-effect waves-light purple lighten-3 left col s3 l2 offset-s4">Add Item</button>
                    
                </div>
                
                {this.renderError()}
			</form>
		);
	}

	handleCreate(event) {
		event.preventDefault();

		const createInput = this.refs.createInput;
		const task = createInput.value;
		const validateInput = this.validateInput(task);

		if (validateInput) {
			this.setState({ error: validateInput });
			return;
		}

		this.setState({ error: null });
		this.props.createTask(task);
		this.refs.createInput.value = '';
	}

	validateInput(task) {
		if (!task) {
			return 'Please enter an item.';
		} else if (_.find(this.props.todos, todo => todo.task === task)) {
			return 'Item already exists.';
		} else {
			return null;
		}
	}
}