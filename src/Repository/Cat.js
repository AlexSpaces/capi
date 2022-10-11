const CRUDRepository = require("./CRUD");

module.exports = class CatRepository extends CRUDRepository {
    constructor() {
        super('cats');
    }
}
