to debug:

7/4/24
the new heap sort algorithm has been implemented, but the final list is not displaying.
In sort-list.js line 40, I attempt to assign the final list (sorted) to this.state.listToSort, because in App.js line 148, that's what's used to display the final ranked list.
(Note that assigning state the "correct React way" using this.setState({ listToSort: sorted }); doesn't work for some reason)
this.state.listToSort does print correctly in sort-list.js, but it disappears when I try to print it in App.js line 138. Why???

to-do list:
1. shuffle the list before it's sorted to reduce bias
2. change the a vs b choices to button clicks
