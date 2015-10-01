'use strict';

var React        = require('react'),
    mui          = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Snackbar     = mui.Snackbar,
    Matrix       = require('../Matrix/matrix.jsx');

module.exports = React.createClass({
  render: function() {
    var matrixCols = [['a','b','c'],['d','e','f']]; 
    return <div className='homePage pageContent'>
      <h1>Homepage</h1>
      <p>This is a sample project that uses React, Webpack and Material UI. It supports lightning-fast development ala live reload.</p>
      <Matrix
          ref='matrix' 
          columns={matrixCols}
          resize='horizontal' />
      <RaisedButton label='Update' primary={true} onTouchTap={this._handleClick} />
      <Snackbar
        ref='snackbar'
        message={'You did it!'} />
    </div>;
  },

  _handleClick: function() {
    this.refs.snackbar.show();
    this.refs.matrix.toggleCells([{'x':0,'y':0},{'x':1,'y':1},{'x':0,'y':2}]);
    this.refs.matrix.addColumn();
    this.refs.matrix.setColumn(this.refs.matrix.getWidth()-1, ['g','h','I']);
    console.log('Columns:', matrix.getColumns());
  }
});
