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
        mid = Math.floor((left + right)/2);
		this.setState({ choiceA: alist[0] });
		this.setState({ choiceB: sorted[mid] });

	}

    
	checkIfDisplay(alist) {
		if (alist.length <= 0) {
            console.log("sorted" + sorted);
            this.state.listToSort = sorted;
            //this.setState({ listToSort: sorted });
            console.log("list to display" + this.state.listToSort);
			this.props.displayFinal();
            return;
        }
	}


	chooseItem(event) {
		event.preventDefault();

		const choice = this.refs.itemChoice.value; //changed by button click
		const validateInput = this.validateInput(choice);

		if (validateInput) {
			this.setState({ error: validateInput });
			return;
		}

		this.setState({ error: null });
		this.setState({ userChoice: choice });
        
        //var alist = this.state.listToSort;
        
        if (choice === 'a' || choice === 'A') {
            right = mid;
        } else {
            left = mid + 1;
        }
        
        mid = Math.floor((left + right)/2)
        
        
        
        if (left < right) {
            this.setState({ choiceB: sorted[mid]});
        } else {
            sorted.splice(mid, 0, this.state.listToSort.shift());
            console.log("new sorted" + sorted);
            this.checkIfDisplay(this.state.listToSort);
            this.prepareSort(this.state.listToSort);
            
        }
        
        //console.log("alist" + alist);
        //console.log("sorted" + sorted);

		this.refs.itemChoice.value = '';
	}

	validateInput(choice) {
		if (!choice || !['a', 'b'].includes(choice.toLowerCase())) {
			return 'Please enter a or b';
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

	render() {

		return (
			<div>
				<h3>Which do you prefer?</h3>
				<h4>a. {this.state.choiceA}</h4>
				<h4>b. {this.state.choiceB}</h4>
				<form onSubmit={this.chooseItem.bind(this)}>
				    <div class="row">
                        <div class="input-field col s2 offset-s5">
                            <input type='text' placeholder='a or b?' ref='itemChoice' />
                        </div> 
                    </div>
                </form>
				{this.renderError()}
				<br />
			</div>
		);
	}
    

	componentDidMount() {
		this.prepareSort(this.state.listToSort);
	}


}