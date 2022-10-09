import databaseConfig from './database';

const db = databaseConfig[process.env.NODE_ENV || 'development'];
const config = {
	db,
	weatherAPIKey: process.env.API_KEY_WORLD_WEATHER_ONLINE,
};

export default config;
