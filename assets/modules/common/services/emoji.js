import emojione from 'emojione';
import emojiData from 'emojione/emoji.json';

export default class Emoji {
    constructor(size = 32) {
        this.emojis = [];
        const emojis = emojiData;

        for (let id in emojis) {
            this.emojis.push(Object.assign({ url: `${emojione.imagePathPNG}${size}/${id}.png` }, emojis[id]));
        }
    }

    /**
     * @param {string} [category=people]
     * @return {Array}
     */
    getByCategory(category = 'people') {
        return this.emojis.filter(emoji => emoji.category === category && emoji.diversity === null)
            .sort((a, b) => a.order - b.order);
    }

    /**
     * @param {string} [search=smile]
     * @return {Array}
     */
    search(search = 'smile') {
        search = search.replace('+', '');

        return this.emojis.filter(emoji => {
            const regexp = new RegExp(`^${search}`, 'i');
            return emoji.name.match(regexp) || emoji.keywords.some(el => el === search);
        });
    }
}
