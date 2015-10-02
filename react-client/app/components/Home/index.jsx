'use strict';

var React        = require('react'),
    mui          = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    RadioButton  = mui.RadioButton,
    RadioButtonGroup  = mui.RadioButtonGroup,
    Snackbar     = mui.Snackbar,
    TextField    = mui.TextField,
    Matrix       = require('../Matrix/matrix.jsx');

module.exports = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      word:"dell",
      rows:[['w','p','a','o','u'],
            ['p','i','e','d','q'],
            ['l','l','n','r','o'],
            ['e','c','a','u','w'],
            ['y','d','x','s','z']],
      paths: Array()
    };
  }, 
  transpose: function( rs ){
      return rs[0].map(function (_, c) { return rs.map(function (r) { return r[c]; }); });
  },
  toRowsString: function( rs ){
      return rs.map( function( r ){ return r.join(","); } ).join(";");
  },
  render: function() {
    var radioButtonForPath = function(path, idx) {
      var path_id = "path_"+idx;
      return <RadioButton
        value={path_id}
        label={path_id + " st: (" + path[0].col + "," + path[0].row + ")"}
        style={{marginBottom:4}} />
    };

    return <div className='homePage pageContent'>
      <h1>Wordsearch Grid</h1>
      <p>Scalatra, React, Webpack and Material UI.</p>
      <p>Recursive DFS search service in Scala.</p>
      <Matrix
        ref='matrix' 
        columns={this.transpose(this.state.rows)}
        resize='both'
        readonly={true}/>
      <RadioButtonGroup name="shipSpeed" defaultSelected="path_0">
        {this.state.paths.map(function(path, idx){
          return radioButtonForPath(path,idx);
        })}
      </RadioButtonGroup>
      <br/>
      <br/>
      <TextField
        ref='gridtext'
          hintText="enter grid rows (ex: a,b,c;d,e,f;g,h,I)"
          floatingLabelText="Grid Rows ex: a,b,c; d,e,f" 
          value={this.toRowsString(this.state.rows)}
          onChange={this.handleGridTextChange} />
      <br/>
      <TextField
          ref='searchword'
          hintText="word to search for in grid"
          floatingLabelText="Search Word" 
          defaultValue={this.state.word}/>
      <br/>
      <br/>
      <RaisedButton label='Search' primary={true} onTouchTap={this._handleClick} />
      <Snackbar
        ref='snackbar'
        message={'Updating...'} />
    </div>;
  },

  handleGridTextChange: function(event) {
    var newgt = this.refs.gridtext.getValue();
    var rows = newgt.split(";").map(function(x){ return x.split(",")});
    this.setState( {rows: rows} ); 
    this.refs.matrix.setColumns( this.transpose(rows) );
  },

  handlePathsFound: function(wordPaths){
    var thisHndl = this;
    var matrix = this.refs.matrix;
    wordPaths.forEach( function(path){
        matrix.toggleCells(path);
    });
    thisHndl.setState({paths: wordPaths});
  
  },

  _handleClick: function() {
    //scoping for async callbacks
    var snack = this.refs.snackbar;
    var pathHandler = this.handlePathsFound;
    this.refs.matrix.toggleCells([]);
    this.setState({word: this.refs.searchword, 
                   paths: Array()});
    snack.show();
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/search');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
          var wordPaths = JSON.parse(xhr.responseText);
          pathHandler(wordPaths);
          snack.dismiss();
        }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(JSON.stringify({
        rows: this.state.rows,
        word: this.refs.searchword.getValue()
    }));
  },

  componentDidMount: function() {
    this._handleClick();
  }
});
