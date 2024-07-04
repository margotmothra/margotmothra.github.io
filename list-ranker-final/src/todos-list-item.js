import React from 'react';
import _ from 'lodash';

export default class TodosListItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isEditing: false,
			error: null
		};
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}
		return <div style={{ color: 'red'}}>{this.state.error}</div>
	}

	renderTaskSection() {
		const { task, isCompleted } = this.props;

		const taskStyle = {
			fontSize: 20
		};

		if (this.state.isEditing) {
			return (
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type='text' defaultValue={task} ref='editInput' />
						{this.renderError()}
					</form>
				</td>
			);
		}

		return (
			<td style={taskStyle}>{task}</td>
		);
	}

	renderActionSection() {
		if (this.state.isEditing) {
			return (
			<td>
				<button class="btn waves-effect waves-light light-blue lighten-2" onClick={this.onSaveClick.bind(this)}>Save</button>
				<button class="btn waves-effect waves-light light-blue darken-2" onClick={this.onCancelClick.bind(this)}>Cancel</button>
			</td>
			);
		}

		return (
			<td>
				<button class="btn waves-effect waves-light light-blue lighten-2" onClick={this.onEditClick.bind(this)}>Edit</button>
				<button class="btn waves-effect waves-light light-blue darken-2" onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
			</td>
			);
	}

	render() {
		return (
			<tr>
				{this.renderTaskSection()}
				{this.renderActionSection()}
			</tr>
		);
	}

	onEditClick() {
		this.setState({ isEditing: true });
	}

	onCancelClick() {
		this.setState({ isEditing: false });
	}

	onSaveClick(event) {
		event.preventDefault();

		const oldTask = this.props.task;
		const newTask = this.refs.editInput.value;
		const validateInput = this.validateInput(newTask);

		if (validateInput) {
			this.setState({ error: validateInput });
			return;
		}

		this.setState({ error: null });
		this.props.saveTask(oldTask, newTask);
		this.setState({ isEditing: false });
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