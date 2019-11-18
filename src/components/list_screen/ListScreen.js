import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import ListItemsHeader from './ListItemsHeader.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize'

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        newItem: false,
        id: 0,
        iid: 0,
        goHome: false,
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
        this.setState({goHome: true});
    }

    newItem = () => {
        var newIndex;
        if (this.props.todoList.items === null){
            newIndex = 0;
            this.props.todoList.items = [{assigned_to: "Undefined",
                                          completed: false,
                                          due_date: "0000-00-00",
                                          description: "Undefined",
                                          id: new Date().getTime(),
                                          key: newIndex,}]
        }
        else{
            newIndex = this.props.todoList.items.length;
            this.props.todoList.items[newIndex] = {assigned_to: "Undefined",
                                                completed: false,
                                                due_date: "0000-00-00",
                                                description: "Undefined",
                                                id: new Date().getTime(),
                                                key: newIndex,};
        }
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update("items", this.props.todoList.items);
        this.setState({newItem: true});
        this.setState({id: this.props.todoList.id});
        this.setState({iid: newIndex});
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if (!todoList)
            return <React.Fragment />;

        if (this.state.newItem)
            return <Redirect to={"/todoList/" + this.state.id + "/item/" + this.state.iid}/>;

        if (this.state.goHome)
            return <Redirect to="/" />;

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <Modal header="Delete list?" trigger={<Button><Icon className="material-icons">delete</Icon></Button>}>
                    <p><b>Are your sure you want to delete this list?</b></p>
                    <Button onClick={this.deleteList}>Yes</Button>
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
                <div className="card todo-list-link pink lighten-3">
                    <div className="card-content text-darken-3 row">
                        <div className="list_item_header card-title col s12" 
                            onClick={this.newItem}
                            style={{textAlign: "center"}}>Create New Item</div>
                    </div>
                </div>
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