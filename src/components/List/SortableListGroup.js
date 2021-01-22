import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListGroup from './ListGroup';

class SortableListGroup extends Component {
  constructor() {
    super();
    this.state = { items: [], draggedIndex: null };
  }

  getDraggableItem = (item, index) => {
    return (
      <div
        draggable
        onDragStart={event => this.onDragStart(event, item, index)}
        onDragEnd={this.onDragEnd}
        className="d-flex justify-content-start"
      >
        <div className="mr-3">
          <span>
            <i className="fa fa-bars" />
          </span>
        </div>
        <div className="w-100">
          {this.props.render ? this.props.render(item) : item}
        </div>
      </div>
    );
  };

  onDragStart = (event, item, index) => {
    this.draggedItem = item;
    this.setState(state => ({ ...state, draggedIndex: index }));
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 20, 20);
  };

  onDragOver = (index) => {
    const draggedOverItem = this.state.items[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    const items = this.state.items.filter(item => item !== this.draggedItem);
    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    this.setState(state => ({ ...state, items, draggedIndex: index }));
  };

  onDragEnd = () => {
    this.setState(state => ({ ...state, draggedIndex: null }));
    this.props.onSort(this.state.items);
  };

  render() {
    return (
      <ListGroup
        render={(item, index) => this.getDraggableItem(item, index)}
        items={this.state.items}
        draggedIndex={this.state.draggedIndex}
        dragOver={this.onDragOver}
      />
    );
  }

  componentDidMount() {
    this.setState(state => ({ ...state, items: this.props.items }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.items.length !== nextProps.items.length) {
      this.setState(state => ({ ...state, items: nextProps.items }));
    }
  }
}

SortableListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  render: PropTypes.func,
};

export default SortableListGroup;
