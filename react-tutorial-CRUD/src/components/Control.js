import React, { Component } from 'react';
import './buttonStyles.css';

class Control extends Component {
    render() {
        console.log("Control render");
        return ( 
            <div style = {{listStyleType:"none", display:"flex", justifyContent:"start"}}>
                <button class = 'CON-button create'
                onClick = {function(evt){
                    evt.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)}>
                    CREATE
                </button>

                <button class = 'CON-button update'
                onClick = {function(evt){
                    evt.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}>
                    UPDATE
                </button>

                <button class = 'CON-button delete'
                onClick = {function(evt){
                    evt.preventDefault();
                    this.props.onChangeMode('delete');
                }.bind(this)}>
                    DELETE
                </button>
            </div>
        );
    }
}
export default Control;