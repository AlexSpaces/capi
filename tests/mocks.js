export default class RestRepositoryMock {
    get(path, params= {}, headers = {}) {
        return { data: [], code: 200 };
    }

    post(path, params= {}, headers= {}) {
        return { data: params, code: 201 };
    }

    delete(path, params= {}, headers= {}) {
        return {};
    }
}

global.common = {
    RestRepositoryMock,
};
