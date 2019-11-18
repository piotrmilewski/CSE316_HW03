import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ItemScreen extends Component {
    state = {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false,
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            console.log("not logged in");
            return <Redirect to="/" />;
        }

        if (!todoList){
            console.log("empty todoList")
            return <React.Fragment />;
        }

        return (
            <div className="container white">
                <p>hi</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList)
    todoList.id = id;

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
)(ItemScreen);