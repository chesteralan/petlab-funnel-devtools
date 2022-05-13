import React from 'react'

const SelectSort = (props) => {

    const { sortBy, setSortBy } = props;

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

    return (sortBy==='none') ? (<select onChange={(evt) => setSortBy(evt.target.value)}>
      <option>{(sortBy !== "none") ? sortBy : `-- Sort By --`}</option>
      {[
        'name-asc',
        'name-desc',
        'pathname-asc',
        'pathname-desc',
        'klaviyo-asc',
        'klaviyo-desc',
        'upsell-asc',
        'upsell-desc',
        'none',
      ].map((option) => {
          return <option value={option} key={option}>{option}</option>
      }
      )}
    </select>)
    :
    <span style={styles} onClick={() => setSortBy("none")} onKeyUp={() => {}} role="button" tabIndex={0}>{sortBy}</span>
  };

export default SelectSort