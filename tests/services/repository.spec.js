const sinon = require('sinon');
const assert = require('assert');

const { default: RestRepository } = require('../../assets/modules/common/services/repository.js');

describe('Test', () => {
    const instance = new RestRepository('/api', { debug() {} });

    global.fetch = (uri, options) => {
        if ('/truites' === uri) {
            return new Promise(resolve => {
                resolve({
                    status: 200,
                    json: () => Promise.resolve({ data: [] })
                });
            });
        } else if ('/truite/1') {
            return new Promise(resolve => {
                resolve({
                    status: 404,
                    json: () => Promise.resolve({ message: 'Not found', code: 404 })
                });
            });
        }
    };

    global.Headers = class {
        append(key, value) {}
    };

    it('should get Repository instance', () => {
        assert.strictEqual(instance instanceof RestRepository, true);
    });

    it('should call find method', () => {
        //const spy = sinon.spy(global.common.RestRepositoryMock.prototype, 'get');

        instance.get('/truites').then(data => assert.deepStrictEqual(data, { data: [] }));
    });

    it('should call get method', () => {
        instance.get('/truite/1')
            .then(data => assert.deepStrictEqual(data, { message: 'Not found', code: 404 }));
    });

    /*it('should call count method', () => {
        const spy = sinon.spy(global.common.RestRepository.prototype, 'count');

        assert.deepStrictEqual(instance.count({}), { data: 1, code: 200 });

        assert(spy.calledWith('truites/count', 'GET', {}));
        assert(spy.calledOnce);
    });

    it('should call create method', () => {
        const spy = sinon.spy(global.common.RestRepository.prototype, 'create');

        assert.deepStrictEqual(instance.create({ foo: 'bar' }), { data: { foo: 'bar' }, code: 201 });

        assert(spy.calledWith('truites', 'POST', { foo: 'bar' }));
        assert(spy.calledOnce);
    });

    it('should call update method', () => {
        const spy = sinon.spy(global.common.RestRepository.prototype, 'update');

        assert.deepStrictEqual(instance.update(1, { foo: 'bar' }), { data: { foo: 'bar' }, code: 200 });

        assert(spy.calledWith('truites/1', 'POST', { foo: 'bar' }));
        assert(spy.calledOnce);
    });

    it('should call remove method', () => {
        const spy = sinon.spy(global.common.RestRepository.prototype, 'remove');

        assert.deepStrictEqual(instance.remove(1), {});

        assert(spy.calledWith('truites/1', 'DELETE'));
        assert(spy.calledOnce);
    });*/
});
