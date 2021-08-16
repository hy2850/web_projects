import React, { Component } from 'react';

class Subject extends Component {
    render() {
        console.log("Subject render");
        return (
            <header>
            <h1>    
                <a onClick = {function(evt){
                    evt.preventDefault();
                    this.props.onChangePage();
                }.bind(this)}> 
                Web
                </a>
            &nbsp;{this.props.title}
            </h1>
            {this.props.sub}
            </header>     
        );
    }
}

// 해당 컴포넌트를 밖에서 가져다 쓸 수 있도록 (= import)
export default Subject;