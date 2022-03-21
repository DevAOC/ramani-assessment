'use strict';

const axios = require('axios');

const reduce = require('./middleware/reduce');
const sort = require('./middleware/sort');

module.exports = {
  ping: async (req, res) => {
    try {
      await axios.get('https://api.hatchways.io/assessment/blog/posts');
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(503).json({ success: false });
    }
  },
  posts: async (req, res) => {
    const tags = req.params.tags;
    const sortBy = req.params.sortBy;
    const direction = req.params.direction;

    const acceptedSortParams = { id, reads, likes, popularity };
    const acceptedDirectionParams = { desc, asc };

    if (tags === undefined) {
      res.status(400).json({ error: 'Tags parameter is required' });
    }
    if (!acceptedSortParams[sortBy]) {
      res.status(400).json({ error: 'sortBy parameter is invalid' });
    }
    if (!acceptedDirectionParams[direction]) {
      res.status(400).json({ error: 'direction parameter is invalid' });
    }

    const tagArray = tags.split(',');
    let data = [];

    for (const tag of tagArray) {
      try {
        const result = await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`);
        data = [...data, result];
      } catch (error) {
        res.status(500).json({ error });
      }
    }

    reduce(data);
    const results = sort(data, sortBy, direction);

    res.status(200).json({ posts: results });
  },
};
