export default class ItemFactory {
    static createFromData({ _id, name, type, createdAt, updatedAt }) {
        return {
            _id,
            name,
            type,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),

            toString() {
                return `${this.name} (${this.type})`;
            }
        }
    }
}
