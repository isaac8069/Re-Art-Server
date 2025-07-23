/**
 * Middleware to normalize the `Authorization` header.
 * Converts:
 *   `Authorization: Token token=<token>`
 * into:
 *   `Authorization: Bearer <token>`
 */
module.exports = (req, res, next) => {
	const { authorization } = req.headers;
  
	if (authorization && authorization.startsWith('Token token=')) {
	  req.headers.authorization = authorization.replace('Token token=', 'Bearer ');
	}
  
	next();
  };
  