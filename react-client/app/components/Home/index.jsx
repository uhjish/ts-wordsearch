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
  
  render: function() {
    console.log(this.state);
    //TODO: inefficient, move elsewhere
    var transpose = function( rs ){
      return rs[0].map(function (_, c) { return rs.map(function (r) { return r[c]; }); });
    };
    var toRowsString = function( rs ){
      return rs.map( function( r ){ return r.join(","); } ).join(";");
    };

    return <div className='homePage pageContent'>
      <h1>Wordsearch Grid</h1>
      <p>Scalatra, React, Webpack and Material UI.</p>
      <Matrix
          ref='matrix' 
          columns={transpose(this.state.rows)}
          resize='horizontal' />
      <br/>
      <br/>
      <TextField
          ref='gridtext'
          hintText="enter grid rows, cells separated by commas, rows separate by semicolons (ex: a,b,c;d,e,f;g,h,I)"
          floatingLabelText="Input Grid Rows" 
          value={toRowsString(this.state.rows)}
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
    this.setState(
      {rows: newgt.split(";")
                  .map(function(x){ return x.split(",")}),
       word: this.refs.searchword.value});
    console.log(this.state);
  },
  _handleClick: function() {
    this.refs.snackbar.show();
    this.refs.matrix.toggleCells([{'x':0,'y':0},{'x':1,'y':1},{'x':0,'y':2}]);
    this.refs.matrix.addColumn();
    this.refs.matrix.setColumn(this.refs.matrix.getWidth()-1, ['g','h','I']);
    console.log('Columns:', matrix.getColumns());
  }
});
