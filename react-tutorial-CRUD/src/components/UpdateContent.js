import React, { Component } from 'react';

class CreateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      title_val : this.props.title,
      desc_val : this.props.desc
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title_val: event.target.value});
  }

  handleDescChange(event) {
    this.setState({desc_val: event.target.value});
  }

  handleSubmit(evt){
    evt.preventDefault();
    alert('Updated!');
    this.props.onSubmission(this.state.title_val, this.state.desc_val);
  }

  render(){
    console.log("UpdateContent render");
    return (
      <article>
        Update existing document
        <form action="/update_process" method="post" onSubmit = {this.handleSubmit}>
          <label>
            <input type="text" name="title" value={this.state.title_val} autocomplete="off" onChange = {this.handleTitleChange}/>
          </label>
          <br/>
          <label>
            <textarea type="text" name="desc" value={this.state.desc_val} 
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
export default CreateContent;