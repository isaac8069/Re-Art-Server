// Centralized Error Handler Middleware
module.exports = (err, req, res, next) => {
	// LOGGING ERRORS
	if (!process.env.TESTENV) {
	  console.log('\n', new Date().toTimeString() + ':');
	  console.error(err);
	}
  
	// HANDLE MONGOOSE VALIDATION & DUPLICATE ERRORS
	if (/Valid/.test(err.name) || err.name === 'MongoError') {
	  const message = 'The received parameters failed a Mongoose validation';
	  err = { status: 422, message };
	}
  
	// CUSTOM ERROR TYPES
	switch (err.name) {
	  case 'DocumentNotFoundError':
		err.status = 404;
		break;
	  case 'CastError':
	  case 'BadParamsError':
		err.status = 422;
		break;
	  case 'BadCredentialsError':
		err.status = 401;
		break;
	}
  
	// DEFAULT TO 500 SERVER ERROR
	res.status(err.status || 500).json({
	  status: err.status || 500,
	  message: err.message || 'An unknown server error occurred.',
	});
  };
  