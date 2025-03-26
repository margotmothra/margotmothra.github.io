import React from 'react';
import _ from 'lodash';

var sorted = [];
var left;
var right;
var mid;

export default class SortList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: this.props.mode,
			listToSort: this.props.listToSort,
			error: null,
			userChoice: '',
			choiceA: '',
			choiceB: '',
		};
        
		sorted.push(this.state.listToSort.shift());
	}

	prepareSort(alist) {
		left = 0;
		right = sorted.length;
		mid = Math.floor((left + right) / 2);
		this.setState({ choiceA: alist[0] });
		this.setState({ choiceB: sorted[mid] });
	}

	checkIfDisplay(alist) {
		if (alist.length <= 0) {
			console.log("Sorted!! " + sorted);
			this.state.listToSort.push(...sorted);
			this.props.displayFinal();
			return;
		}
	}

	chooseItem(choice) {
		const validateInput = this.validateInput(choice);
		if (validateInput) {
			this.setState({ error: validateInput });
			return;
		}

		this.setState({ error: null });
		this.setState({ userChoice: choice });

		if (choice === 'a' || choice === 'A') {
			right = mid;
		} else {
			left = mid + 1;
		}

		mid = Math.floor((left + right) / 2);

		if (left < right) {
			this.setState({ choiceB: sorted[mid] });
		} else {
			sorted.splice(mid, 0, this.state.listToSort.shift());
			console.log("New sorted: " + sorted);
			this.checkIfDisplay(this.state.listToSort);
			this.prepareSort(this.state.listToSort);
		}
	}

	validateInput(choice) {
		if (!choice || !['a', 'b'].includes(choice.toLowerCase())) {
			return 'Please enter a valid choice.';
		} else {
			return null;
		}
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}

		return <div style={{ color: 'red' }}>{this.state.error}</div>;
	}

	render() {
		return (
			<div>
				<h3>Which do you prefer?</h3>
				<h4>A. {this.state.choiceA}</h4>
				<h4>B. {this.state.choiceB}</h4>

				{/* Buttons with same pastel pink color and text properly centered */}
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
					<button 
						onClick={() => this.chooseItem('a')} 
						className="btn"
						style={{
							backgroundColor: '#f8a5c2', 
							color: '#fff', 
							borderRadius: '10px', 
							padding: '10px 20px', 
							display: 'flex', 
							alignItems: 'center', 
							justifyContent: 'center', 
							height: '50px',
							width: '150px',
						}}
					>
						{this.state.choiceA}
					</button>
					<button 
						onClick={() => this.chooseItem('b')} 
						className="btn"
						style={{
							backgroundColor: '#f8a5c2', 
							color: '#fff', 
							borderRadius: '10px', 
							padding: '10px 20px', 
							display: 'flex', 
							alignItems: 'center', 
							justifyContent: 'center', 
							height: '50px',
							width: '150px',
						}}
					>
						{this.state.choiceB}
					</button>
				</div>

				{/* Render error messages if any */}
				{this.renderError()}
			</div>
		);
	}

	componentDidMount() {
		this.prepareSort(this.state.listToSort);
	}
}