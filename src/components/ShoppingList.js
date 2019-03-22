import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
                >
                  &times;
                </Button>
                &nbsp;{name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </ListGroup>
      </Container>
    )
  }
}

ShoppingList.propTypes = {
  item: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, {
  getItems, deleteItem,
})(ShoppingList);