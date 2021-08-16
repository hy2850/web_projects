import React, { Component } from 'react';
import './buttonStyles.css';

class TOC extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     onModify : false
        // }
    }
 
    render() {        
        var onModify = this.props.mode === 'update' || this.props.mode === 'delete' ? true : false;

        console.log("TOC render");
        var lists = [];
        var data = this.props.data;
        var i = 1;
        while(i < data.length){
            lists.push(
            
            <li key={data[i].id}>
                <a 
                href={"/content/"+data[i].id}
                data-id={data[i].id}
                onClick = {
                    function(key, extraParametersBound, evt){
                        console.log(evt);
                        evt.preventDefault();
                        this.props.showNewContent(key);
                    }.bind(this, data[i].id, 10)
                }>
                {data[i].title}
                </a>
                <span data-id={data[i].id}>
                    {onModify ? 
                        <button class = {'TOC-button ' + this.props.mode} 
                        onClick={function(evt){
                            evt.preventDefault();
                            var clickedID = evt.target.parentNode.getAttribute('data-id');
                            alert(`Button pushed : ${clickedID}`);
                            this.props.getContentID(Number(clickedID))
                        }.bind(this)}>
                        {this.props.mode == 'update' ? 'o' : 'x'}
                        </button> 
                    : null}
                </span>
            </li>);

            i = i + 1;
        }
    
        return ( 
            <nav>
                <ul>    
                    {lists}
                </ul>
            </nav>
        );
    } 
}

// TOC를 밖에서 가져다 쓸 수 있도록
export default TOC;