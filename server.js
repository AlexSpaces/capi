const { bootstrapServer } = require('@beelab/toolbox');

bootstrapServer({
    api: require('./config/api.json'),
    apiPrefix: '',
    cache: true,
    pwa: false,
    localQuery: {
        cats: __dirname + '/data/cats.db',
    },
    publicDir: 'dist',
});
