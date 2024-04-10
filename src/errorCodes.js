exports.InvalidApiKey = "Invalid Hypixel API Key was provided.";
exports.MissingFields = "Missing one or more fields.";
exports.RateLimited = "API Key was rate limited.";
exports.EndpointInvalid = (endpoint, reason = "") => `The endpoint provided (${endpoint.replaceAll(".", "/")}) is not valid. ${reason}`;
exports.InvalidFields = "One or more fields are invalid.";