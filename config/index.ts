import databaseConfig from './database';

const db = databaseConfig[process.env.NODE_ENV || 'development'];
const config = {
	db,
};

export default config;
