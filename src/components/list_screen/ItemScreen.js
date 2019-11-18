import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends Component {
    state = {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false,
        uninitialized: true,
        redirect: false,
    }

    onChecked = (e) => {
        this.setState( { completed: e.target.checked} );
    }

    onChange = (e) => {
        this.setState( { [e.target.name]: e.target.value} );
    }

    submit = () => {
        var index = this.props.index;
        this.props.todoList.items[index].description = this.state.description;
        this.props.todoList.items[index].assigned_to = this.state.assigned_to;
        this.props.todoList.items[index].due_date = this.state.due_date;
        this.props.todoList.items[index].completed = this.state.completed;
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"items": this.props.todoList.items});
        this.setState({redirect: true});
    }

    cancel = () => {
        this.setState({redirect: true});
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        const index = this.props.index;

        if (!auth.uid) {
            console.log("not logged in");
            return <Redirect to="/" />;
        }

        if (this.state.redirect)
            return <Redirect to={"/todoList/" + this.props.todoList.id}/>;

        if (!todoList){
            console.log("empty todoList")
            return <React.Fragment />;
        }

        if (this.state.uninitialized){
            this.setState({description: this.props.todoList.items[index].description});
            this.setState({assigned_to: this.props.todoList.items[index].assigned_to});
            this.setState({due_date: this.props.todoList.items[index].due_date});
            this.setState({completed: this.props.todoList.items[index].completed});
            this.setState({uninitialized: false});
        }

        return (
            <div className="container white">
                <div className="item_prompt">Item</div>
                <div id="item_description_prompt" className="item_prompt">
                    <span>Description:</span>
                    <input id="item_description_textfield"
                           className="item_input" 
                           type="text" 
                           name="description" 
                           value={this.state.description}
                           onChange={this.onChange}></input>
                </div>
                <div id="item_assigned_to_prompt" className="item_prompt">
                    <span>Assigned To:</span>
                    <input id="item_assigned_to_textfield" 
                           className="item_input" 
                           type="text" 
                           name="assigned_to" 
                           value={this.state.assigned_to}
                           onChange={this.onChange}></input>
                </div>
                <div id="item_due_date_prompt" className="item_prompt">
                    <span>Due Date:</span>
                    <input id="item_due_date_textfield" 
                           className="item_input" 
                           type="date" 
                           name="due_date" 
                           value={this.state.due_date}
                           onChange={this.onChange}></input>
                </div>
                <div id="item_completed" className="item_prompt">
                <label>
                    <input type="checkbox" 
                           checked={this.state.completed}
                           onChange={this.onChecked}/>
                    <span>Completed</span>
                </label>
                </div>
                <div id="item_button_container">
                    <button id="item_submit_button" 
                            className="item_button" 
                            onClick={this.submit}>Submit</button>
                    <div className="item_button_divider"></div>
                    <button id="item_cancel_button" 
                            className="item_button"
                            onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { iid } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList)
    todoList.id = id;
  const index = iid;

  return {
    index,
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