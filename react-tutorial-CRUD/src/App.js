import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode : 'welcome',
      welcome:{title:'Welcome', desc:'Welcome to React!!'},
      read:{title:'read mode', desc:'Read World Wid Web!'},
      contents:[
        {id:0, title:'', desc:''}, // empty content for 'welcome' mode
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ],
      contentsNum : 3, // tracks the number of contents
      contentToShow : 0, // initial content to show (empty)
      contentToUpdate : -1 // used in 'update-selected' mode
    }

    this.deleteContent = this.deleteContent.bind(this);
  }

  /*
  중간 게시물 삭제할 때 마다 id 바꿔서 0~length-1 유지하기
  vs 그냥 매번 삭제할 때마다 contents 탐색해서 해당 id 컨텐츠 찾기
  */
  deleteContent(key){
    var deleteIDX;
    for(var idx = 0; idx < this.state.contents.length; idx++){
      if(this.state.contents[idx].id == key){
        deleteIDX = idx;
        break;
      }
    }

    // var deleteIDX = list.map(x => {
    //   return x.id;
    // }).indexOf(id);
    this.state.contents.splice(deleteIDX, 1);
    this.setState({contents : this.state.contents});
  }

  render() {
    console.log("App render");

    var contentIdx = this.state.contents.map(
      x => { return x.id; }).indexOf(this.state.contentToShow);
    if(contentIdx == -1) contentIdx = 0;

    // Create different '_article' component depending on the mode
    var _title = null, _desc = null, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = null;
    }else if(this.state.mode === 'read'){
      _title = this.state.read.title;
      _desc = this.state.read.desc;
      _article = <ReadContent 
                    title = {this.state.contents[contentIdx].title} 
                    desc = {this.state.contents[contentIdx].desc}>
                  </ReadContent>;
    }   
    else if(this.state.mode === 'create'){
      _article = <CreateContent
                    onSubmission = {function(_title, _desc){
                      this.setState(
                        {contentsNum : this.state.contentsNum + 1,
                        contents : this.state.contents.concat({id : this.state.contentsNum + 1, title:_title, desc:_desc})
                                    });
                    }.bind(this)}>
                  </CreateContent>;
    }
    else if(this.state.mode === 'update-selected'){
      var updateIdx = this.state.contents.map(
        x => { return x.id; }).indexOf(this.state.contentToUpdate);
        
      _article = <UpdateContent

      // Content title and desc for update
      title = {this.state.contents[updateIdx].title}
      desc = {this.state.contents[updateIdx].desc}
      onSubmission = {function(_title, _desc){
        this.state.contents[updateIdx].title = _title;
        this.state.contents[updateIdx].desc = _desc;
        this.setState({
          mode : 'read',
          contentsToShow : updateIdx,
          contents : this.state.contents}); // just for re-rendering

      }.bind(this)}>
    </UpdateContent>;
    }

    return ( 
      <div className="App">
        Hello, React!!

        <Subject title={_title} sub={_desc}
          onChangePage={
            function(){
              this.setState({mode : this.state.mode === 'welcome' ? 'read' : 'welcome'});
            }.bind(this)
          }
        >
        </Subject>

        <TOC 
          // For Read
          mode={this.state.mode}
          data={this.state.contents}
          showNewContent = {function(key){
            this.setState({contentToShow : key});
            this.setState({mode : 'read'});
          }.bind(this)}

          // For Update/Delete
          getContentID = {function(key){
            if(this.state.mode === 'update'){
              this.setState({mode : 'update-selected'});
              this.setState({contentToUpdate : key});
            }
            else if(this.state.mode === 'delete')
              this.deleteContent(key);
          }.bind(this)}>
        </TOC>
        
        <br/>

        <Control onChangeMode={function(modeTo){
          this.setState({mode : modeTo});
        }.bind(this)}>
        </Control>
        
        <br/>

        {_article}
      </div>
    );
  }
}

export default App;
