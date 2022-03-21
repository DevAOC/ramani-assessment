'use strict';

module.exports = (data) => {
  const seen = {};
  for (let i = 0; i < data.length; i++) {
    if (seen[data[i].id]) {
      data.splice(i);
    } else {
      seen[data[i].id];
    }
  }
};
