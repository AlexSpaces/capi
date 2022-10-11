const { bootstrapServer } = require('@beelab/toolbox');

bootstrapServer({
    api: require('./config/api.json'),
    cache: false,
    pwa: true,
    localQuery: {
        items: __dirname + '/data/items.db',
    },
    publicDir: 'dist',
});
