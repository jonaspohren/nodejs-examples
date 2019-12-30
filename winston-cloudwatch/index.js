const logger = require('./src/tools/logger')

logger.info('user added', { user: { id: 1, name: 'John' } })
logger.warn('access denied', { user: { id: 2, name: 'Johnny' } })
logger.error('could not remove user', { user: { id: 1, name: 'John' }, err: { message: 'DENIED' } })

logger.transports[0].kthxbye(() => {})
