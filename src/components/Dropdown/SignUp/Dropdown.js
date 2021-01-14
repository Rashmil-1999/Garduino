import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';


const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' } 
  ];

  
  class Dropdown extends React.Component {
     state = {
        selectedOption: null,
      };

      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      };
    render(){
        const { selectedOption } = this.state;
    
      return (
        <Select className="mt-4 col-md-6 col-offset-4"
        onChange={this.handleChange}
        options={options}
        autoFocus={true}
        />
      );
    }
}
export default Dropdown;