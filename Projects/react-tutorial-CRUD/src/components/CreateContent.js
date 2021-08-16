import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      title_val : '',
      desc_val : ''
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    //debugger;
    this.setState({title_val: event.target.value});
  }

  handleDescChange(event) {
    //debugger;
    this.setState({desc_val: event.target.value});
  }

  handleSubmit(evt){
    evt.preventDefault();
    alert('Submitted!');
    this.props.onSubmission(this.state.title_val, this.state.desc_val);
  }

  render(){
    console.log("CreateContent render");
    return (
      <article>
        Create new document
        <form action="/create_process" method="post" onSubmit = {this.handleSubmit}>
          <label>
            <input type="text" name="title" placeholder="Title" autocomplete="off" onChange = {this.handleTitleChange}/>
          </label>
          <br/>
          <label>
            <textarea type="text" name="desc" placeholder="Description" 
            style = {{width: '300px', height: '150px'}}
            onChange = {this.handleDescChange}/>
          </label>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </article>
    );
  }
}
export default UpdateContent;