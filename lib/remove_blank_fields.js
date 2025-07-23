/**
 * Middleware to remove any key/value pairs from `req.body` objects
 * where the value is an empty string.
 * Example:
 * { example: { title: 'thing', text: '' } }
 *   -> { example: { title: 'thing' } }
 */
module.exports = (req, res, next) => {
	if (req.body && typeof req.body === 'object') {
	  Object.values(req.body).forEach((obj) => {
		if (obj && typeof obj === 'object') {
		  for (const key in obj) {
			if (Object.hasOwn(obj, key) && obj[key] === '') {
			  delete obj[key]; // Remove empty keys
			}
		  }
		}
	  });
	}
	next();
  };
  