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
      <h1>Wordsearch Grid</h1>
      <p>Scalatra, React, Webpack and Material UI.</p>
      <Matrix
          ref='matrix' 
          columns={matrixCols}
          resize='horizontal' />
      <br/>
      <RaisedButton label='Update' primary={true} onTouchTap={this._handleClick} />
      <br/>
      <Snackbar
        ref='snackbar'
        message={'Updating...'} />
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
