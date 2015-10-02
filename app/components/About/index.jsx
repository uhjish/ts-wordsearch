'use strict';

var React = require('react'),
  mui     = require('material-ui'),
  Avatar  = mui.Avatar,
  Card    = mui.Card,
  CardHeader   = mui.CardHeader,
  CardText     = mui.CardText,
  CardActions  = mui.CardActions,
  RaisedButton = mui.RaisedButton,
  FontIcon     = mui.FontIcon;

require('./style');

module.exports = React.createClass({
  render: function() {
    return <div className='aboutPage pageContent'>
      <h1>About</h1>
      <h3>Relevant Sources</h3>
      <Card initiallyExpanded={false}>
        <CardHeader
          title="Algorithm"
          subtitle="DFS search for word over grid"
          avatar={<Avatar style={{color:'blue'}}>Al</Avatar>}
          showExpandableButton={true}>
        </CardHeader>
        <CardText expandable={true}>
          Run DFS search recursively looking for sequential matches
          to the given word. Currently ignores case and allows 
          multiple paths to share a given cell. 
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton linkButton={true} href="https://github.com/uhjish/ts-wordsearch/blob/scalatra-service/src/main/scala/com/rootedinsights/ws/Wordsearch.scala#L5" secondary={true} label="Source">
          </RaisedButton>
        </CardActions>
      </Card> 
      <Card initiallyExpanded={false}>
        <CardHeader
          title="Scalatra WS"
          subtitle="Simple webservice wrapping logic"
          avatar={<Avatar style={{color:'red'}}>Ws</Avatar>}
          showExpandableButton={true}>
        </CardHeader>
        <CardText expandable={true}>
          Has one relevant route /search which takes a POST JSON
          object containing the grid rows and the word to search for.
          It returns a list of list of Points where each point 
          has a row and col field.
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton linkButton={true} href="https://github.com/uhjish/ts-wordsearch/blob/scalatra-service/src/main/scala/com/rootedinsights/ws/WordsearchServlet.scala#L26" secondary={true} label="Source">
          </RaisedButton>
          <RaisedButton linkButton={true} href="http://ts-wordsearch-webservice.herokuapp.com/" secondary={true} label="Heroku">
          </RaisedButton>
        </CardActions>
      </Card> 
      <Card initiallyExpanded={false}>
        <CardHeader
          title="React Matrix Component"
          subtitle="Matrix component for controlling grid size, cells, toggling of cell-highlight"
          avatar={<Avatar style={{color:'green'}}>Vi</Avatar>}
          showExpandableButton={true}>
        </CardHeader>
        <CardText expandable={true}>
          React component that takes a list of lists and renders it as a grid.
          Included functionality to change the shape of the grid in flight.
          Added functionality to highlight a set of cells on the grid to show paths.
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton linkButton={true} href="https://github.com/uhjish/ts-wordsearch/commit/178fef6cd38fc1c83e6638cde2ea562a3f2ec9f2" secondary={true} label="Source">
          </RaisedButton>
        </CardActions>
      </Card> 
      <Card initiallyExpanded={false}>
        <CardHeader
          title="React Wordsearch Component"
          subtitle="Controls all the action"
          avatar={<Avatar style={{color:'orange'}}>Ux</Avatar>}
          showExpandableButton={true}>
        </CardHeader>
        <CardText expandable={true}>
          One way data-flow from a text-input to Matrix component, using live updates.
          Search button fires off the POST request to Wordsearch WS, populates the returned
          paths into a radio button group, and highlights cells belonging to the selected
          path on the Matrix component. Just a big wrapper around the submission form that
          serves as a controller for the wordsearch and visualization state.
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton linkButton={true} href="https://github.com/uhjish/ts-wordsearch/blob/c20d29b89b33c8fb13c71a05a26511f5e024c1dc/react-client/app/components/Home/index.jsx" secondary={true} label="Source">
          </RaisedButton>
        </CardActions>
      </Card>
      <br/><br/>
      <Card initiallyExpanded={false}>
        <CardHeader
          title="Author"
          subtitle="Ajish George"
          avatar={<Avatar style={{color:'purple'}}>Me</Avatar>}
          showExpandableButton={true}>
        </CardHeader>
        <CardText expandable={true}>
          Shameless plug here.
        </CardText>
        <CardActions expandable={true}>
          <RaisedButton linkButton={true} href="https://www.linkedin.com/in/ajishg" secondary={true} label="LinkedIn"/>
          <RaisedButton linkButton={true} href="http://github.com/uhjish" secondary={true} label="Github">
          </RaisedButton>
          <RaisedButton linkButton={true} href="http://www.researchgate.net/profile/Ajish_George" secondary={true} label="ResearchGate">
          </RaisedButton>
        </CardActions>
      </Card>

    </div>;
  }
});
