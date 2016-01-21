import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  componentDidMount() {
    this.nodeEl = document.createElement('div');
    document.body.appendChild(this.nodeEl);
    this.renderChildren(this.props);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.nodeEl);
    document.body.removeChild(this.nodeEl);
  }

  componentWillReceiveProps(newProps) {
    this.renderChildren(newProps);
  }

  renderChildren(props) {
    ReactDOM.render(props.children, this.nodeEl);
  }

  render() {
    return null;
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired
};

module.exports = Portal;
