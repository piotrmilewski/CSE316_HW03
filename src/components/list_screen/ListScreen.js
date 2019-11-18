import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import ListItemsHeader from './ListItemsHeader.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal } from 'react-materialize'

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        if (target.id === "name"){
            this.props.todoList.name = target.value;
            getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"name": target.value});
        }
        else{
            this.props.todoList.owner = target.value;
            getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"owner": target.value});
        }
    }

    deleteList = (e) => {
        getFirestore().collection('todoLists').doc(this.props.todoList.id).delete();
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if (!todoList)
            return <React.Fragment />;

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <Modal header="Modal Header" trigger={<button className="material-icons">delete</button>}>
                    <p>Delete list?</p>
                    <p><b>Are your sure you want to delete this list?</b></p>
                    <button onClick={this.deleteList}>Yes</button>
                    <p>The list will not be retreivable.</p>
                </Modal>
                <div className="input-field">
                    <label className="active" htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ListItemsHeader todoList={todoList} />
                <ItemsList todoList={todoList} />
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
)(ListScreen);