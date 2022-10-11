<template>
    <TopNavbar>
        <SearchBar :options="searchOptions" @refresh="onSearchBarRefreshed"></SearchBar>
    </TopNavbar>

    <main class="container">
        <h2 class="mb-4">{{ $t('Fish list') }} <Emoji code="Tropical Fish"></Emoji></h2>

        <div class="card shadow-sm overflow-hidden">
            <header class="card-header d-flex bg-white align-items-center p-lg-4 p-md-3">
                <h5 class="mb-0">{{ $t('Fish list') }}</h5>

                <div class="ms-auto">
                    <Button outline level="success" icon="plus" @click="createResource">
                        {{ $t('create_new') }}
                    </Button>
                </div>
            </header>

            <div class="table-responsive">
                <table class="table-content">
                    <thead>
                        <tr>
                            <th>{{ $t('id') }}</th>
                            <th>{{ $t('name') }}</th>
                            <th>{{ $t('type') }}</th>
                            <th>{{ $t('created_at') }}</th>
                            <th>{{ $t('edited_at') }}</th>
                            <th>{{ $t('actions') }}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items" :key="item._id">
                            <td>
                                <Badge :title="item._id">{{ item._id.slice(-6) }}</Badge>
                            </td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.type }}</td>
                            <td><Date :date="item.createdAt"/></td>
                            <td><Date :date="item.updatedAt"/></td>
                            <td class="text-end">
                                <Menu>
                                    <DropdownHeader>{{ $t('actions') }}</DropdownHeader>
                                    <DropdownAction href="#" @click.prevent="showResource(item)">
                                        {{ $t('show') }}
                                    </DropdownAction>
                                    <DropdownAction href="#" @click.prevent="editResource(item)">
                                        {{ $t('edit') }}
                                    </DropdownAction>
                                    <DropdownAction href="#" @click.prevent="deleteResource(item)">
                                        <span class="text-danger">{{ $t('delete') }}</span>
                                    </DropdownAction>
                                </Menu>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <footer class="p-lg-4 p-md-3">
                <Pagination class="m-0 justify-content-end" :page="pagination.page" :max="pagination.max"></Pagination>
            </footer>
        </div>
    </main>

    <Edit @success="fetch"/>
    <Delete @success="fetch"/>
    <Show />
</template>

<script setup>
import TopNavbar from "../modules/app/components/Default/TopNavBar.vue";
import Button from "../modules/ui/components/elements/Button.vue";
import Emoji from "../modules/ui/components/elements/Emoji.vue";
import Edit from "../modules/app/components/Item/Edit.vue";
import Delete from "../modules/app/components/Item/Delete.vue";
import Show from "../modules/app/components/Item/Show.vue";
import Badge from "../modules/ui/components/elements/Badge.vue";
import Date from "../modules/ui/components/elements/Date.vue";
import SearchBar from "../modules/ui/components/search/SearchBar.vue";
import DropdownAction from "../modules/ui/components/dropdown/DropdownAction.vue";
import DropdownHeader from "../modules/ui/components/dropdown/DropdownHeader.vue";
import Menu from "../modules/ui/components/menu/Menu.vue";
import Pagination from "../modules/ui/components/elements/Pagination.vue";

import ItemFactory from "../modules/app/factory/item";
import Page from "../modules/common/services/pagination";

import { eventName, countUrl, findUrl } from '../modules/app/components/Item/parameters';
import { inject, ref, reactive, onMounted } from 'vue';

const repository = inject('repository');
const emitter = inject('emitter');

const items = ref([]);
const pagination = reactive(new Page(10));
const searchOptions = reactive({ tokens: [] });

onMounted(() => fetch());

const fetch = (params = {}) => {
    repository.get(countUrl(), params)
        .then(count => pagination.max = count)
        .then(() => repository.get(findUrl(), { ...params, ...pagination.params }))
        .then(data => data.map(ItemFactory.createFromData))
        .then(values => {
            items.value = values;

            if (1 === values.length && params.search) {
                emitter.emit(eventName('show'), values[0]);
            }
        });
};

const onSearchBarRefreshed = ({ search, tokens }) => {
    const params = tokens.reduce((params, token) => {
        params[token.key] = token.value.key || token.value;

        return params;
    }, search ? { search, searchTarget: 'name' } : {});

    fetch(params);
};

const createResource = () => {
    emitter.emit(eventName('edit'), {});
};

const showResource = item => {
    emitter.emit(eventName('show'), { ...item });
};

const deleteResource = item => {
    emitter.emit(eventName('delete'), { ...item });
};

const editResource = item => {
    emitter.emit(eventName('edit'), { ...item });
};
</script>
