# ramani-assessment


## Problem Domain

This repository was created as an assessment of Antoine Charette's skills in Javascript/Node.js.

This assessment checks the ability to write code that will access and API and fetch data from said API.

## Author

Antoine Charette

## Methods

### GET

Route - /api/ping

Response - Code 200 with success boolean

Route - /api/posts

**Tag parameter required**

Response - Code 200 with all posts associated to tag parameter

NOTE - Response can be sorted by direction specified and field specified.

## Notes

I encountered bugs while testing. This was both when writing the tests and understanding the nuances of express.

With the reduce function I was able to achieve a time and space complexity of O(n). With the limited time I had, I could not find a faster solution.
