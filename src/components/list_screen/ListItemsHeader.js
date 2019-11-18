import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ListItemsHeader extends React.Component {

    state = {
        sortByTaskDecreasing: false,
        sortByDateDecreasing: false,
        sortByStatusDecreasing: false,
    }

    sortTasks = () => {
        if (this.state.sortByTaskDecreasing)
          this.setState({sortByTaskDecreasing: false});
        else
          this.setState({sortByTaskDecreasing: true});
        this.props.todoList.items = this.props.todoList.items.sort(this.taskCompare.bind(this));
        var index = 0;
        while (index <= (this.props.todoList.items.length-1)){
          this.props.todoList.items[index].key = index;
          index++;
        }
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"items": this.props.todoList.items});
    }

    sortDates = () => {
        if (this.state.sortByDateDecreasing)
          this.setState({sortByDateDecreasing: false});
        else
          this.setState({sortByDateDecreasing: true});
        this.props.todoList.items = this.props.todoList.items.sort(this.dateCompare.bind(this));
        var index = 0;
        while (index <= (this.props.todoList.items.length-1)){
          this.props.todoList.items[index].key = index;
          index++;
        }
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"items": this.props.todoList.items});
    }

    sortStatuses = () => {
        if (this.state.sortByStatusDecreasing)
          this.setState({sortByStatusDecreasing: false});
        else
          this.setState({sortByStatusDecreasing: true});
        this.props.todoList.items = this.props.todoList.items.sort(this.statusCompare.bind(this));
        var index = 0;
        while (index <= (this.props.todoList.items.length-1)){
          this.props.todoList.items[index].key = index;
          index++;
        }
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"items": this.props.todoList.items});
    }

    taskCompare(item1, item2) {
        if (this.state.sortByTaskDecreasing){
          let temp = item1;
          item1 = item2;
          item2 = temp;
        }
        if (item1.description < item2.description)
          return -1;
        else if (item1.description > item2.description)
          return 1;
        else
          return 0;
    }

    dateCompare(item1, item2) {
        if (this.state.sortByDateDecreasing){
          let temp = item1;
          item1 = item2;
          item2 = temp;
        }
        if (item1.due_date < item2.due_date)
          return -1;
        else if (item1.due_date > item2.due_date)
          return 1;
        else
          return 0;
    }

    statusCompare(item1, item2) {
        if (this.state.sortByStatusDecreasing){
          let temp = item1;
          item1 = item2;
          item2 = temp;
        }
        if (item1.completed < item2.completed)
          return -1;
        else if (item1.completed > item2.completed)
          return 1;
        else
          return 0;
    }

    render() {
        const todoList = this.props.todoList;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="card todo-list-link pink lighten-3">
                <div className="card-content text-darken-3 row">
                    <div className="list_item_header card-title col s3" 
                         onClick={this.sortTasks}>Task</div>
                    <div className="list_item_header card-title col s3"
                         onClick={this.sortDates}>Due Date</div>
                    <div className="list_item_header card-title col s5"
                         onClick={this.sortStatuses}>Status</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ListItemsHeader);