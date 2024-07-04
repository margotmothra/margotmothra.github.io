import _ from 'lodash';
import React from 'react';
import TodosListHeader from './todos-list-header';
import TodosListItem from './todos-list-item';

export default class TodosList extends React.Component {
	renderItems() {
		const props = this.props;
			// const props = _.omit(this.props, 'todos');

		return _.map(this.props.todos, (todo, index) => <TodosListItem key={index} {...todo} {...props}/>)
	}

	// Equivalent to
	// function(todo, index) {
	// 	return <TodosListItem all the props, all the todos />
	// }

	// for every todo in the todos constant, create an index, todos, props

	// 	task={todo.task} isCompleted = {todo.isCompleted}


	render() {
		return (
		    <div class="row">
                <table class="col s6 offset-s4">
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
            </div>
		);
	}
}