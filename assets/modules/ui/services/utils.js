export default class {
    static getRef(vEl, refName, index = 0) {
        const ref = vEl.$refs[refName];

        if (Array.isArray(ref)) {
            return ref[index];
        }

        return ref;
    }
}
