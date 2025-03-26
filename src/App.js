import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import SortList from './sort-list';
import _ from 'lodash'

const todos = [];

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.displayFinal = this.displayFinal.bind(this);

		this.state = {
			todos: todos,
			mode: 'isBuilding',
			listToSort: [],
			error: null
		};
	}

	renderMainSection() {
		if (this.state.mode === 'isBuilding') {
			return (
				<div class="main">
                    <div class="row">
                        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)}/>
                        <button class="btn waves-effect waves-light deep-purple darken-2" onClick={this.saveList.bind(this)}>Begin</button>
                    </div>
					<TodosList
					todos={this.state.todos}
					toggleTask={this.toggleTask.bind(this)}
					saveTask={this.saveTask.bind(this)}
					deleteTask={this.deleteTask.bind(this)}
					/>
					{this.renderError()}
				</div>
			);
		}  else if (this.state.mode === 'isSorting') {
			return (
				<div>
					<SortList listToSort={this.state.listToSort} mode={this.state.mode} displayFinal={this.displayFinal}/>
					<button class="btn waves-effect waves-light deep-purple darken-2" onClick={this.startOver.bind(this)}>Start Over</button>
				</div>
			);
		} else if (this.state.mode === 'isDisplaying') {
            return (
				<div>
					{this.renderFinalList()}
					<button class="btn waves-effect waves-light deep-purple darken-2" onClick={this.startOver.bind(this)}>Start Over</button>
				</div>
			);
		}
	}

	render() {
		return (
		    <div>
                <nav>
                    <div class="nav-wrapper">
                        <a href="https://www.karenlin.me/" class="brand-logo left"><img src="logo.png" ></img></a>
                        <a class="tooltipped right" data-position="bottom" data-delay="50" data-tooltip="Ranker helps you sort items in your list by comparing them one by one. Start by adding items to your list, then click Begin to sort the list."><i class="material-icons">help</i></a>
                    </div>
                </nav>
                <div class="container">
                    <h1>Ranker</h1>
                    {this.renderMainSection()}
                </div>
            </div>
		);
	}

	toggleTask(task) {
		const foundTodo = _.find(this.state.todos, todo => todo.task === task);
		foundTodo.isCompleted = !foundTodo.isCompleted;
		this.setState({ todos: this.state.todos });
	}

	createTask(task) {
		this.state.todos.push({
			task,
			isCompleted: false
		});
		this.setState({ todos: this.state.todos });
	}

	saveTask(oldTask, newTask) {
		const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
		foundTodo.task = newTask;
		this.setState({ todos: this.state.todos });
	}

	deleteTask(taskToDelete) {
		_.remove(this.state.todos, todo => todo.task === taskToDelete);
		this.setState({ todos: this.state.todos});
	}

	saveList() {
		const listToSort = todos.map(function(x) {return x['task']});
		this.state.listToSort = listToSort;
		const validateInput = this.validateInput(this.state.listToSort.length);

		if (validateInput) {
			this.setState({ error: validateInput });
			return;
		}

		this.setState({ error: null });
		this.setState({ mode: 'isSorting' });


	}

	validateInput(length) {
		if (length < 2) {
			return 'Please enter at least 2 items.'
		} else {
			return null;
		}
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}

		return <div style={{ color: 'red'}}>{this.state.error}</div>
	}

	startOver() {
		this.setState({ mode: 'isBuilding' });
		this.state.todos.length = 0;
		this.state.listToSort.length = 0;
		window.location.reload(true);
	}

	displayFinal() {
        console.log("display plz" + this.state.listToSort);
		this.setState({ mode: 'isDisplaying' });
	}

	renderFinalList() {
		return (
		    <div class="row">
		        <h4>Final List</h4>
		        <div class="col s12 offset-s5">
                    <ol>
                        {this.state.listToSort.map(function(item, index) {
                            return <li key={index}>{item}</li>;
                        })}
                    </ol>
                </div>
            </div>
		);
	}
}

//export default App;
