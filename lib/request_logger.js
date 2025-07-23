/**
 * Middleware to log incoming requests with timestamp, method, URL, and body.
 */
const requestLogger = (req, res, next) => {
	console.log('\n===== Incoming Request =====');
	console.log(`Time: ${new Date().toISOString()}`);
	console.log(`Method: ${req.method}`);
	console.log(`URL: ${req.originalUrl}`);
	console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
	console.log('============================\n');
	next();
  };
  
  module.exports = requestLogger;
  