import React from 'react'

const SelectVariable = (props) => {

    const { showVariable, setShowVariable } = props;

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

    return (showVariable==='pathname') ? (<select onChange={(evt) => setShowVariable(evt.target.value)}>
      <option value="">-- Select --</option>
      {[
        'pathname',
        'klaviyo',
        'pixel_ids',
        'upsell',
        'upsell-extra',
        'currency',
        'store',
        'expedited_delivery',
        'expedited_delivery_price',
        'sub-variant-ids',
        'sub-prices',
        'sub-free-gifts',
        'sub-discount-codes',
        'sub-bump-offer',
        'otp-variant-ids',
        'otp-prices',
        'otp-free-gifts',
        'otp-discount-codes',
        'otp-bump-offer',
        'rebrand_styling',
        'tags',
        'extra',
        'rebill_discount',
        'higher_initial_discount',
      ].map((option) => {
          return <option value={option} key={option}>{option}</option>
      }
      )}
    </select>)
    : 
    <span style={styles} onClick={() => setShowVariable("pathname")} onKeyUp={() => {}} role="button" tabIndex={0}>{showVariable}</span>
  };

export default SelectVariable