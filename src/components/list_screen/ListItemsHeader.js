import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ListItemsHeader extends React.Component {

    sortTasks = () => {
        console.log("umm");
    }

    render() {
        const todoList = this.props.todoList;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="card todo-list-link pink lighten-3">
                <div className="card-content text-darken-3 row">
                    <div className="list_item_header card-title col s3" 
                         onClick={this.sortTasks}>Task</div>
                    <div className="list_item_header card-title col s3">Due Date</div>
                    <div className="list_item_header card-title col s2">Status</div>
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