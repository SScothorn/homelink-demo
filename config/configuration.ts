import databaseConfig from './database';
const db = databaseConfig[process.env.NODE_ENV || 'development'];

export default () => ({
	db,
	weatherAPIKey: process.env.API_KEY_WORLD_WEATHER_ONLINE,
});
