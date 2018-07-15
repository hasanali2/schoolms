import React from 'react';
import { FluxMixin, StoreWatchMixin } from './../flux'
var reactMixin = require('react-mixin');
import autobind from "../utils/autobind"

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "", table: [] };

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  getStateFromFlux() {
    var flux = this.getFlux();
    return {
      data: flux.store("MainStore").data
    }
  }
  componentDidMount() {
    this.getFlux().actions.getInitData();
  }
  handleSubmitClick(e) {
    this.getFlux().actions.login(this.state.username, this.state.password)
  }
  handleUserChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    return <div>
      Username:  <input type="text" onChange={this.handleUserChange} value={this.state.username} />
      Password: <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
      <button type="button" onClick={this.handleSubmitClick}>Submit</button>
    </div>

  }
};


reactMixin.onClass(Application, FluxMixin)
reactMixin.onClass(Application, StoreWatchMixin('MainStore'))
reactMixin.onClass(Application, autobind(Object.keys(StoreWatchMixin)))

export { Application }
