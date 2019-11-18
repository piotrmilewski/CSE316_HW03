import React from 'react';

class ItemCard extends React.Component {
    
    getCompletedStyle = () => {
        return {color: this.props.item.completed ? 'green' : 'red'};
    }
    
    render() {
        const { item } = this.props;  
        return (
            <div className="card todo-list-link pink lighten-4">
                <div className="card-content text-darken-3 row">
                    <div className="card-title col s3">{item.description} <p><span className="grey-text text-darken-2">Assigned To: </span>{item.assigned_to}</p></div>
                    <div className="card-title col s3">{item.due_date}</div>
                    <div className="card-title col s2"
                         style={this.getCompletedStyle()}>{this.props.item.completed ? 'Completed' : 'Pending'}</div>
                </div>
            </div>
        );
    }
}
export default ItemCard;