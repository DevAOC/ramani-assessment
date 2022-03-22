'use strict';

const axios = require('axios');

const reduce = require('../middleware/reduce');
const sort = require('../middleware/sort');

const acceptedSortParams = { id: 'id', reads: 'reads', likes: 'likes', popularity: 'popularity' };
const acceptedDirectionParams = { desc: 'desc', asc: 'asc' };

module.exports = {
  ping: async (req, res) => {
    try {
      await axios.get('https://api.hatchways.io/assessment/blog/posts');
      res.status(200).send({ success: true });
    } catch (error) {
      res.status(503).send({ success: false });
    }
  },
  posts: async (req, res) => {
    const tags = req.query.tags;
    const sortBy = req.query.sortBy;
    const direction = req.query.direction;

    if (!tags) {
      res.status(400).json({ error: 'Tags parameter is required' });
    } else {
      if (sortBy && !acceptedSortParams[sortBy]) {
        res.status(400).json({ error: 'sortBy parameter is invalid' });
      } else if (direction && !acceptedDirectionParams[direction]) {
        res.status(400).json({ error: 'direction parameter is invalid' });
      } else {
        const tagArray = tags.split(',');
        let data = [];

        for (const tag of tagArray) {
          try {
            const result = await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`);
            data = [...data, result.posts];
          } catch (error) {
            res.status(500).send({ error });
          }
        }

        reduce(data);
        const sorted = sort(data, sortBy, direction);

        res.status(200).json({ sorted });
      }
    }
  },
};
