import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListItemWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 0;
  margin: 0 0 10px;
  font-size: 120%;
`;

const Status = styled.p`
  padding: 0;
  margin: 0;
  font-size: 70%;
`;

export class ListItem extends Component {
    render() {
        const { data } = this.props;

        if (!data) return null;
        const { title, completed } = data;

        return (
            <ListItemWrapper className="list-item">
                <Title>{title}</Title>
                <Status>{completed ? 'COMPLETED' : 'NOT COMPLETED'}</Status>
            </ListItemWrapper>
        );
    }
}

ListItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        userId: PropTypes.number,
        completed: PropTypes.bool,
    }),
};

ListItem.defaultProps = {
    data: null,
};
