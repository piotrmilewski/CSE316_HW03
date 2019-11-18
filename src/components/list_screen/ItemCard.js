import React from 'react';
import { Button , Icon} from 'react-materialize'
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom'

class ItemCard extends React.Component {
    
    state = {
        id: 0,
        iid: 0,
        redirect: false,
    }

    getCompletedStyle = () => {
        return {color: this.props.item.completed ? 'green' : 'red'};
    }

    upItem = () => {
        var index = this.props.item.key;
        if (index !== 0){
            this.props.todoList.items.splice(
                index-1, 0, this.props.todoList.items.splice(index, 1)[0]
              );
            this.props.todoList.items[index].key = index;
            this.props.todoList.items[index-1].key = index-1;
            getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"items": this.props.todoList.items});
        }
    }

    downItem = () => {
        var index = this.props.item.key;
        if (index !== (this.props.todoList.items.length - 1)){
            this.props.todoList.items.splice(
                index+1, 0, this.props.todoList.items.splice(index, 1)[0]
              );
            this.props.todoList.items[index].key = index;
            this.props.todoList.items[index+1].key = index+1;
            getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"items": this.props.todoList.items});
        }
    }

    removeItem = () => {
        var index = this.props.item.key;
        this.props.todoList.items.splice(index, 1);
        while (index <= (this.props.todoList.items.length-1)){
            this.props.todoList.items[index].key = index;
            index++;
        }
        getFirestore().collection('todoLists').doc(this.props.todoList.id).update({"items": this.props.todoList.items});
    }

    editItem = () => {
        this.setState({redirect: true});
        this.setState({id: this.props.todoList.id});
        this.setState({iid: this.props.item.id});
    }

    render() {
        const { item } = this.props;  

        if (this.state.redirect){
            return <Redirect to={"/todoList/" + this.state.id + "/item/" + this.state.iid}/>;
        }

        return (
            <div className="card todo-list-link pink lighten-4">
                <div className="card-content text-darken-3 row">
                    <div className="card-title col s3">{item.description} <p><span className="grey-text text-darken-2">Assigned To: </span>{item.assigned_to}</p></div>
                    <div className="card-title col s3">{item.due_date}</div>
                    <div className="card-title col s5"
                         style={this.getCompletedStyle()}>{this.props.item.completed ? 'Completed' : 'Pending'}</div>
                    <Button 
                        floating
                        fab={{direction: 'left'}}
                        className="red"
                        large
                        style={{position: 'relative', top: 5, left: 10}}
                        onClick={this.editItem}
                    >
                    <Button floating icon={<Icon className="material-icons">arrow_upward</Icon>} 
                            className="green" 
                            onClick={this.upItem}></Button>
                    <Button floating icon={<Icon className="material-icons">arrow_downward</Icon>} 
                            className="green" 
                            style={{right: 5}} 
                            onClick={this.downItem}/>
                    <Button floating icon={<Icon className="material-icons">delete</Icon>} 
                            className="red" 
                            style={{right: 10}}
                            onClick={this.removeItem}/>
                    </Button>
                </div>
            </div>
        );
    }
}
export default ItemCard;