import NodeCache from 'node-cache';

// Set TTL to 10 minutes (600 seconds)
const cacheInstance = new NodeCache({ stdTTL: 600 });

export default cacheInstance;
