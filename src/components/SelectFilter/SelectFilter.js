import React from 'react'

const SelectFilter = (props) => {

    const { filterBy, setFilterBy } = props;

    const styles = {
      backgroundColor: "red",
      color: "white",
      fontFamily: "sans-serif",
      fontSize: "12px",
      padding: "3px 10px",
      borderRadius: "25px",
      cursor: "pointer",
      margin: "0 5px"
    };

    return (filterBy==="none") ? (<select onChange={(evt) => setFilterBy(evt.target.value)}>
      <option>{(filterBy !== "none") ? filterBy : `-- Filter By --`}</option>
      {[
        'rebrand_styling',
        'pathname',
        'design',
        'tag',
        'sub-free-gift',
        'otp-free-gift',
        'component',
        'none',
      ].map((option) => {
          return <option value={option} key={option}>{option}</option>
      }
      )}
    </select>)
    :
    <span style={styles} onClick={() => setFilterBy("none")} onKeyUp={() => {}} role="button" tabIndex={0}>{filterBy}</span>
  };

export default SelectFilter