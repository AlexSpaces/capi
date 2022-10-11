<style scoped>
    .search-bar-tokens { margin: 0; padding: 6px; }
    .search-bar-input input { border: none; background: none; height: 40px; }
</style>

<template>
    <form @submit.prevent="onSubmit">
        <div class="search-bar-container d-flex">
            <div v-if="contexts.length" class="search-bar-contexts-container rounded-start">
                <Menu>
                    <template #button>
                        <button class="btn btn-outline-secondary dropdown-toggle me-1" type="button" style="height: 50px">
                            {{ getLabelOf(context) }}
                        </button>
                    </template>

                    <DropdownAction href="#" v-for="c in contexts" @click.prevent="onChangeContext(c)">
                        {{ getLabelOf(c) }}
                    </DropdownAction>
                </Menu>
            </div>

            <div class="search-bar-tokens-container bg-light flex-grow-1 card">
                <div @click="setFocus" class="d-flex align-items-center card-body search-bar-tokens">
                    <div class="tokens-container d-none d-md-flex">
                        <div v-for="token in tokens" :key="token.id" class="search-bar-token me-2" :id="'search-bar-token-' + token.id">
                            <SearchBarToken
                                @select.stop="onSelectToken"
                                @remove.stop="onRemoveToken"
                                :options="token">
                            </SearchBarToken>
                        </div>
                    </div>

                    <div class="search-bar-input flex-grow-1 dropdown">
                        <input name="search" type="text" autocomplete="off" class="w-100"
                               :placeholder="options.placeholder || $t('type_something_search')"
                               :value="search"

                               @blur="onBlur"
                               @keyup="onKeyUp"
                               @keydown="onKeyDown"
                        >

                        <template v-if="getAvailableTokens().length">
                            <div class="search-bar-tokens search-bar-dropdown-menu dropdown-menu mt-2"
                                 :style="{ 'display': isDisplayableForToken() }"
                            >
                                <template v-for="t in getAvailableTokens()" :key="t.name">
                                    <a class="dropdown-item" href="#"
                                       @click.prevent="addToken(t)"
                                    >
                                        {{ t.name }}
                                    </a>
                                </template>
                            </div>
                        </template>

                        <div v-for="ot in options.tokens" :key="ot.name" class="search-bar-values search-bar-dropdown-menu dropdown-menu mt-2"
                             :style="{ 'display': isDisplayableForToken(ot) }"
                        >
                            <a v-for="value in getValuesForToken(ot)" :key="getLabelOf(value)" class="dropdown-item" href="#"
                               @click.prevent="changeSelectedTokenValue(value)"
                            >
                                {{ getLabelOf(value) }}
                            </a>
                        </div>
                    </div>

                    <button class="btn btn-link search-button" type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>

            <!--<button class="filter-button d-md-none btn btn-secondary ml-1"
                #if="this.options.tokens.length"
                type="button"
                [style.height.px]="50"
                (click)="this.openModal()"
            >
                <i class="fas fa-filter"></i>
                <span #if="this.tokens.length" class="badge badge-danger" [innerHTML]="this.tokens.length"></span>
            </button>-->
        </div>
    </form>
</template>

<script>
import SearchBarToken from "./SearchBarToken.vue";
import Menu from "../menu/Menu.vue";
import DropdownAction from "../dropdown/DropdownAction.vue";

let id = 0;
let timer = null;
let typing = null;

export default {
    components: {
        DropdownAction,
        Menu,
        SearchBarToken
    },

    emits: ['refresh'],

    data() {
        return {
            contexts: [],
            context: null,

            tokens: [],
            selectedToken: null,
            search: null,
            focus: false,

            /*modal: new Modal({
                element: 'c-search-bar-filters-modal',
                callback: ({ detail }) => detail.forEach(({ token, value }) => this.selectTokenAndValue(token, value))
            }),*/
        };
    },

    props: {
        options: {
            type: Object,
            default: { search: null, tokens: [], contexts: [] },
        }
    },

    mounted() {
        this.cleanSearchBar(true);

        this.options.tokens.forEach(token => this.parseTokenValues(token));

        if (this.options.selectedTokens) {
            this.options.selectedTokens.forEach(token => {
                if (!this.hasToken(token)) {
                    this.addToken(token, false);
                }
            });
        }

        if (this.options.contexts && this.options.contexts.length) {
            this.contexts = this.options.contexts;
            this.context = this.contexts[0];
        }
    },

    methods: {
        /**
         * Get label of value when value is { label: 'toto' ... }
         * @param {Object|string} item
         * @returns {string}
         */

        getLabelOf(item) {
            return String(item.label ? item.label : item);
        },

        /**
         * Get key of value when value is { key: 'toto' ... }
         * @param {Object|string} item
         * @returns {string}
         */
        getKeyOf(item) {
            return String(item.key ? item.key : item);
        },

        /**
         * Get label of selected value into token
         * @param {Object} token
         * @returns {string}
         */
        getSelectedLabelOfToken(token) {
            const t = this.tokens.find(t => t.name === token.name);

            if (t && t.value) {
                return this.getLabelOf(t.value);
            }

            return token.name;
        },

        /**
         * Get values list (with search term) for token
         * @param {Object} token
         * @returns {Array<Object|string>}
         */
        getValuesForToken(token) {
            const optionToken = this.options.tokens.find(t => t.name === token.name);

            if (!this.search || !this.selectedToken) {
                return optionToken.values.slice(0, 10);
            }

            const search = this.search.toLowerCase();
            return optionToken.values.filter(v => this.getLabelOf(v).toLowerCase().search(search) >= 0).slice(0, 10);
        },

        /**
         * Get all token available to displayRegExp
         * @returns {Array<Object>}
         */
        getAvailableTokens() {
            return this.options.tokens.filter(token => token.multiple === true ||
                (!token.multiple && this.tokens.every(t => t.name !== token.name)));
        },

        /**
         * Check if token is available to add
         * @param token
         * @returns {boolean}
         */
        isAvailableToken(token) {
            return token.multiple === true || (!token.multiple && this.tokens.every(t => t.name !== token.name))
        },

        /**
         * Check if token is displayable
         * @param {Object|null} [token=null]
         * @returns {boolean}
         */
        isDisplayableForToken(token = null) {
            return this.focus &&
            ((this.selectedToken === null && token === null) ||
                (this.selectedToken && token && this.selectedToken.name === token.name && this.getValuesForToken(token).length)) ? 'block' : 'none';
        },

        /**
         * Set focus to search input
         */
        setFocus() {
            clearTimeout(timer);

            if (this.$el.querySelector('input')) {
                this.$el.querySelector('input').focus();
                this.focus = true;
            }
        },

        /**
         * Get values of token from async callback
         * @param {Object} token
         * @param {string} [term='']
         */
        parseTokenValues(token, term = '') {
            if (token.callback) {
                Promise.resolve(token.callback(term)).then(values => {
                    token.values = values;
                });
            }
        },

        /**
         * Add token to request tokens list
         * @param {Object} token
         * @param {boolean} [selected=true]
         */
        addToken(token, selected = true) {
            const newToken = Object.assign({}, token, { value: token.value || null, id: ++id });
            this.tokens.push(newToken);

            if (selected) {
                this.selectToken(newToken);
            }
        },

        /**
         * Check if token already added
         * @param {Object} token
         * @return {boolean}
         */
        hasToken(token) {
            return !!this.tokens.find(t => t.key === token.key && t.value === token.value);
        },

        /**
         * Remove token from request tokens list
         * @param {Object} token
         */
        removeToken(token) {
            const index = this.tokens.findIndex(t => t.id === token.id);

            if (index > -1) {
                this.tokens.splice(index, 1);

                if (token === this.selectedToken) {
                    this.cleanSearchBar(true);
                }

                this.setFocus();
            }
        },

        /**
         * Select token, focus token
         * @param {Object} token
         */
        selectToken(token) {
            this.search = null;
            this.selectedToken = token;
            this.selectedToken.value = null;

            this.setFocus();
        },

        /**
         * Change value of selected token
         * @param {Object|string} value
         */
        changeSelectedTokenValue(value) {
            if (typeof value !== 'object') {
                value = String(value).trim();
            }

            if (this.selectedToken && !!value) {
                this.selectedToken.value = value;

                this.cleanSearchBar();
            } else if (!value) {
                this.search = null;
            }

            this.setFocus();
        },

        /**
         * Reset search bar
         * @param {boolean} [keepSearch=false]
         */
        cleanSearchBar(keepSearch = false) {
            this.selectedToken = null;

            if (!keepSearch) {
                this.search = null;
            }
        },

        onBlur() {
            // beurk
            timer = setTimeout(() => {
                this.focus = !!this.selectedToken;
            }, 100);
        },

        onKeyDown(event) {
            clearTimeout(typing);

            typing = setTimeout(() => {
                if (this.selectedToken) {
                    this.parseTokenValues(this.selectedToken, this.search);
                }
            }, 500);

            if (event.which === 13) {
                event.preventDefault();
            }

            if (event.which === 9 && this.search) {
                event.preventDefault();

                // Add token if user typing tag name on tab
                const token = this.options.tokens.find(t => t.name.toLowerCase().search(this.search.toLowerCase()) >= 0);
                if (token && this.isAvailableToken(token)) {
                    this.search = null;
                    this.addToken(token);
                }
            }

            if (
                this.selectedToken &&
                !this.search &&
                this.tokens.length > 0 &&
                event.which === 8
            ) {
                this.removeToken(this.selectedToken);
            } else if (
                !this.selectedToken &&
                !this.search &&
                this.tokens.length > 0 &&
                event.which === 8
            ) {
                event.preventDefault();
                this.selectToken(this.tokens[this.tokens.length - 1]);
            }
        },

        onKeyUp(event) {
            this.search = event.target.value;

            let preventSumbit = false;
            if (this.selectedToken && (event.which === 13 || event.which === 32)) {
                // Add value to selected token
                this.changeSelectedTokenValue(this.search);
                preventSumbit = true;
            } else if (
                !this.selectedToken &&
                this.search &&
                (event.which === 13 || event.which === 32)
            ) {
                // Add token if user typing tag name
                const token = this.options.tokens.find(t => t.name.toLowerCase() === this.search.toLowerCase());

                if (token && this.isAvailableToken(token)) {
                    this.search = null;
                    this.addToken(token);
                    preventSumbit = true;
                }
            }

            if (
                !preventSumbit &&
                !this.selectedToken &&
                event.which === 13
            ) {
                this.emitChanges();
            }

            if (preventSumbit) {
                event.preventDefault();
            }
        },

        onSelectToken({ detail }) {
            const token = this.tokens.find(t => t.id === detail.token.id);

            if (token) {
                token.id = ++id;
                this.selectToken(token);
                this.moveAfterToken(token);
            }
        },

        /**
         * Add token and change value
         * @param {Object} token
         * @param {Object|string} value
         */
        selectTokenAndValue(token, value) {
            let td;
            if (td = this.tokens.find(t => this.getKeyOf(t) === this.getKeyOf(token))) {
                this.removeToken(td);
            }

            if (!!value) {
                const newToken = Object.assign({}, token, { value: null, id: ++id });
                newToken.value = value;
                this.tokens.push(newToken);
            }

            this.emitChanges();
        },

        onRemoveToken({ detail }) {
            this.removeToken(detail.token);
        },

        onSubmit() {
            this.emitChanges();
        },

        onChangeContext(context) {
            this.context = context;
            this.tokens = [];
            this.search = null;
            this.emitChanges();
        },

        emitChanges() {
            if (!this.selectedToken) {
                this.$emit('refresh', {
                    search: this.search || undefined,
                    context: this.context ? this.getKeyOf(this.context) : undefined,
                    tokens: this.tokens
                });
            }
        },

        moveAfterToken(token) {
            // burk zone
            const index = this.tokens.findIndex(t => t.id === token.id);

            if (index > -1) {
                this.tokens.splice(index, 1);
            }

            this.tokens.push(token);
        },

        openModal() {
            this.modal.open({
                options: this.options.tokens,
                tokens: this.tokens,
            });
        },
    },
}
</script>
