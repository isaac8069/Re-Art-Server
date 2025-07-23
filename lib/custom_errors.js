// Custom Error Classes
class OwnershipError extends Error {
	constructor(message = 'The provided token does not match the owner of this document') {
	  super(message);
	  this.name = 'OwnershipError';
	}
  }
  
  class DocumentNotFoundError extends Error {
	constructor(message = "The provided ID doesn't match any documents") {
	  super(message);
	  this.name = 'DocumentNotFoundError';
	}
  }
  
  class BadParamsError extends Error {
	constructor(message = 'A required parameter was omitted or invalid') {
	  super(message);
	  this.name = 'BadParamsError';
	}
  }
  
  class BadCredentialsError extends Error {
	constructor(message = 'The provided username or password is incorrect') {
	  super(message);
	  this.name = 'BadCredentialsError';
	}
  }
  
  // Ensure the user is the owner of the resource
  const requireOwnership = (req, resource) => {
	const owner = resource.owner._id ? resource.owner._id : resource.owner;
	if (!req.user._id.equals(owner)) {
	  throw new OwnershipError();
	}
  };
  
  // Throw a 404 error if a document is not found
  const handle404 = (record) => {
	if (!record) throw new DocumentNotFoundError();
	return record;
  };
  
  module.exports = {
	requireOwnership,
	handle404,
	BadParamsError,
	BadCredentialsError,
  };
  