
import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='dark-navy f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='navy f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;

