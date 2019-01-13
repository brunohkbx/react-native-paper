import React, { Component } from 'react';
import { css } from 'linaria';

const iconsList = require('react-native-vector-icons/glyphmaps/MaterialIcons.json');

const iconContainer = css`
  display: flex;
  align-items: center;
  width: 40%;
  justify-content: space-between;
  margin: 0 30px 0 30px;
  @media (max-width: 935px) {
    width: 100%;
  }
`;

const icon = css`
  font-family: 'MaterialIcons';
  font-size: 40px;
`;

const results = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  :last-child {
    justify-content: flex-start;
  }
`;

const searchbar = css`
  width: 100%;
  padding: 16px 48px 16px 24px;
  font-size: 1em;
  background-color: white;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s;
  outline: 0;
  &:focus {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  @media (min-width: 640px) {
    padding: 12px 24px;
  }
`;

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
    });
  };

  getIconCharacter = iconName => {
    const iconCharacter = iconsList[iconName];
    return <text className={icon}>{String.fromCharCode(iconCharacter)}</text>;
  };

  getResults = () => {
    let icons;

    if (this.state.query) {
      icons = Object.keys(iconsList).filter(item =>
        item.includes(this.state.query)
      );

      return icons.map(iconName => (
        <div className={iconContainer}>
          <text>{iconName}</text>
          {this.getIconCharacter(iconName)}
        </div>
      ));
    }
    return null;
  };

  render() {
    return (
      <form>
        <input
          type="search"
          value={this.state.query}
          onChange={e => this.setState({ query: e.target.value })}
          placeholder="Search for icon..."
          className={searchbar}
        />
        <div className={results}>{this.getResults()}</div>
      </form>
    );
  }
}

export default SearchBar;
