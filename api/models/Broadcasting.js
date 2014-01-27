/**
 * Broadcasting.js
 *
 * @description This model temporarily holds the performer data relevant to the front end.
 */

module.exports = {

  adapter: 'redis',

	attributes: {
    name: 'string',
    age: 'integer'
	}

};
