'use strict';

module.exports = (data, sortBy = 'id', direction = 'asc') => {
  if (direction === 'desc') {
    return data.sort((a, b) => {
      b[sortBy] - a[sortBy];
    });
  } else {
    return data.sort((a, b) => {
      a[sortBy] - b[sortBy];
    });
  }
};
