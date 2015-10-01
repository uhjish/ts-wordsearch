'use strict';

var React        = require('react'),
    mui          = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Snackbar     = mui.Snackbar,
    TextField    = mui.TextField,
    Matrix       = require('../Matrix/matrix.jsx');

module.exports = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      word:"eac",
      rows:[["a","d"],["b","e"],["e","f"]]
    };
  }, 
  transpose: function( rs ){
      return rs[0].map(function (_, c) { return rs.map(function (r) { return r[c]; }); });
  },
  toRowsString: function( rs ){
      return rs.map( function( r ){ return r.join(","); } ).join(";");
  },
  
  render: function() {
    console.log(this.state);
    //TODO: inefficient, move elsewhere

    return <div className='homePage pageContent'>
      <h1>Wordsearch Grid</h1>
      <p>Scalatra, React, Webpack and Material UI.</p>
      <Matrix
          ref='matrix' 
          columns={this.transpose(this.state.rows)}
          resize='both'
          readonly={true}/>
      <br/>
      <br/>
      <TextField
          ref='gridtext'
          hintText="enter grid rows, cells separated by commas, rows separate by semicolons (ex: a,b,c;d,e,f;g,h,I)"
          floatingLabelText="Input Grid Rows" 
          value={this.toRowsString(this.state.rows)}
          onChange={this.handleGridTextChange} />
      <br/>
      <TextField
          ref='searchword'
          hintText="word to search for in grid"
          floatingLabelText="Search Word" 
          valueLink={this.linkState('word')}/>
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
    console.log(newgt);
    var rows = newgt.split(";").map(function(x){ return x.split(",")});
    this.setState( {rows: rows} ); 
    this.refs.matrix.setColumns( this.transpose(rows) );
    console.log(this.state);
  },
  _handleClick: function() {
    this.refs.snackbar.show();
    //really not worth importing jquery or angular routes for ONE call
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/search');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
          var searchResults = JSON.parse(xhr.responseText);
          console.log(searchResults);
        }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(JSON.stringify({
        rows: this.state.rows,
        word: this.state.word
    }));
    this.refs.matrix.toggleCells([{'x':0,'y':0},{'x':1,'y':1},{'x':0,'y':2}]);
    this.refs.matrix.addColumn();
    this.refs.matrix.setColumn(this.refs.matrix.getWidth()-1, ['g','h','I']);
  }
});
