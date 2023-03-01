const fs = require('fs');
const imageEditor = require('cataas-image-editor');
const { send } = require("@tamia-web/tamia/modules/common/services/controller");

const Requester = require("../Service/Request");
const CatRepository = require("../Repository/Cat");

module.exports = {
    async findCat(req, res) {
        const repository = new CatRepository();

        if (req.headers['user-agent']) {
            const event = req.params.id ? 'oneCat' : 'randomCat';
            const values = req.query;
            Requester.post(
                'https://analytics.boutdecode.fr/api/collect',
                JSON.stringify({
                    payload: {
                        website: 'ba785fe5-03d6-4593-929b-ab1280a5be29',
                        url: req.url,
                        event_name: event,
                        event_type: 'api_call',
                        event_value: JSON.stringify(values),
                        hostname: req.headers['host'],
                    },
                    type: 'event'
                }),
                { headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': req.headers['user-agent'],
                    }}
            );
        }

        const params = { validated: true };
        const html = req.query.html || false;
        const json = req.query.json || false;

        let cat = null;
        if (req.params.id && req.params.id.match(/\w{16}/)) {
            cat = await repository.findOne({ _id: req.params.id, ...params });
        } else if (req.params.id) {
            req.params.tag = req.params.id;

            const query = req.params.tag.split(',').reduce((query, tags) => {
                query.push({ tags });

                return query;
            }, []);

            const result = await repository.find({ $and: query, ...params }, 10000);
            cat = result[Math.floor(Math.random() * result.length)];
        } else {
            const result = await repository.find(params, 10000);
            const notGif = result.filter(({ mimetype }) => mimetype !== 'image/gif');
            cat = notGif[Math.floor(Math.random() * notGif.length)];
        }

        if (!cat) {
            return send(req, res, 'Cat not found.', 404);
        }

        if (json) {
            return send(req, res, {
                ...cat,
                url: this.getUrl(req.params.tag, req.params.text, req.query, cat._id),
            });
        }

        if (html) {
            const template = `
                <!DOCTYPE html>
                <html lang="en">
                    <header>
                        <meta charset="utf-8">
                    </header>
                    <body>
                        <img alt="${cat._id}" src="${this.getUrl(req.params.tag, req.params.text, req.query, cat._id)}">
                    </body>
                </html>
            `;

            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Length', template.length);
            res.write(template);

            return res.end();
        }

        try {
            const file = fs.readFileSync(`${__dirname}/../../data/images/${cat.file}`);
            const buffer = await this.editImage(req, file, cat.mimetype);

            res.setHeader('Content-Type', cat.mimetype);
            res.setHeader('Content-Length', buffer.length);

            res.write(buffer);
            res.end();
        } catch ({ message, code }) {
            send(req, res, { code, message }, code || 500);
        }
    },

    async editImage(req, buffer, mimetype) {
        let text = !!req.params.text ? decodeURIComponent(req.params.text) : '';
        let color = req.query.color || req.query.c || '#ffffff';
        let size = req.query.size || req.query.s || 30;
        let type = req.query.type || req.query.t || 'default';
        let filter = req.query.filter || req.query.fi || req.query.f || null;
        let width = req.query.width || req.query.wi || req.query.w || null;
        let height = req.query.height || req.query.he || req.query.h || null;
        let gravity = req.query.gravity || req.query.g || 'Center';

        if (width !== null) {
            width = width <= 1000 ? width : 1000;
        }

        if (height !== null) {
            height = height <= 1000 ? height : 1000;
        }

        if (size !== null) {
            size = size <= 100 ? size : 100;
        }

        // Don't resize gif if there are no type selected or custom width / height
        if (mimetype === 'image/gif' && type === 'default' && width === null && height === null) {
            type = 'original';
        }

        return imageEditor.edit(buffer, mimetype, type, text, color, size, filter, width, height, gravity);
    },

    async api(req, res) {
        const repository = new CatRepository();
        const params = { validated: true };

        if (req.query.tags) {
            params.$and = req.query.tags.split(',').reduce((query, tags) => {
                query.push({ tags });

                return query;
            }, []);
        }

        try {
            send(req, res, await repository.find(params, req.query.limit, req.query.skip));
        } catch ({ message, code }) {
            send(req, res, { code, message }, code);
        }
    },

    async tags(req, res) {
        const repository = new CatRepository();

        const cats = await repository.find({ validated: true }, 9999, 0);
        let result = [];

        cats.forEach(({ tags }) => {
            tags.forEach(tag => {
                if (!result.includes(tag)) {
                    result.push(tag);
                }
            })
        });

        send(req, res, result.sort());
    },

    async count(req, res) {
        const repository = new CatRepository();
        const number = await repository.count({ validated: true });

        send(req, res, { number });
    },

    getUrl (tag = null, text = null, queries = {}, id = null) {
        let url = '/cat';
        let q = [];

        if (id) {
            url += `/${id}`;
        } else {
            url += tag ? `/${tag}` : '';
        }

        url += text ? `/says/${text}` : '';

        if (queries.color || queries.c) {
            q.push(`color=${queries.color || queries.c}`);
        }

        if (queries.size || queries.s) {
            q.push(`size=${queries.size || queries.s}`);
        }

        if (queries.type || queries.t) {
            q.push(`type=${queries.type || queries.t}`);
        }

        if (queries.filter || queries.fi || queries.f) {
            q.push(`filter=${queries.filter || queries.fi || queries.f}`);
        }

        if (queries.width || queries.wi || queries.w) {
            q.push(`width=${queries.width || queries.wi || queries.w}`);
        }

        if (queries.height || queries.he || queries.h) {
            q.push(`height=${queries.height || queries.he || queries.h}`);
        }

        if (queries.gravity || queries.g) {
            q.push(`gravity=${queries.gravity || queries.g}`);
        }

        if (q.length > 0) {
            url += `?${q.join('&')}`;
        }

        return url;
    },
}
