<template>
    <TopNavbar/>

    <div class="home-banner">
        <img v-for="cat in cats" :src="cat">

        <div class="home-banner-content-container">
            <div class="home-banner-content container">
                <h1>CATAAS</h1>
                <h2>Cat as a service</h2>
                <p>Is a REST API to spread peace and love (or not) thanks to cats.<br/> Have <span class="count">{{ count }}</span> cats for now</p>
                <br/>
                <a class="btn btn-primary" href="/cat/says/hello%20world!" target="_blank">Give me a cat</a>
            </div>
        </div>
    </div>

    <section class="container mt-4">
        <p class="alert alert-success">
            Hey ! Do you like Cataas? Do you want to support the project?

            <a class="btn btn-primary ml-4" href="https://www.buymeacoffee.com/kevinbalicot" target="_blank">Buy me a beer 🍺</a>

            <br><br>
            <Icon icon="exclamation-triangle"/> Cataas is in under recovery mode, a new server and a new stack are coming soon ;)
        </p>

        <h2 class="mt-4">API</h2>
        <p class="alert alert-info">You need doc? Please visite our <a href="/doc.html">Open API</a> documentation page.</p>

        <hr/>

        <h2>Basic</h2>
        <table class="table table-striped">
            <tr>
                <th>Url</th>
                <th class="d-none d-lg-table-cell">Description</th>
                <th>Example</th>
            </tr>

            <tr>
                <td><strong>/cat</strong><br/><span class="d-none d-sm-inline">/c</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat</td>
                <td><a class="btn btn-success" href="/cat" target="_blank">Random cat</a></td>
            </tr>

            <tr>
                <td><strong>/cat/:tag</strong><br/><span class="d-none d-sm-inline">/c/:tag</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat with a <code>:tag</code></td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat/cute" target="_blank">Random cute cat</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat/cute" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat/gif</strong><br/><span class="d-none d-sm-inline">/c/gif</span></td>
                <td class="d-none d-lg-table-cell">Will return a random gif cat \\o/</td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat/gif" target="_blank">Random gif cat</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat/gif" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat/says/:text</strong><br/><span class="d-none d-sm-inline">/c/s/:text</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat saying <code>:text</code></td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat/says/hello" target="_blank">Random cat saying hello</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat/says/hello" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat/:tag/says/:text</strong><br/><span class="d-none d-sm-inline">/c/:tag/s/:text</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat with a <code>:tag</code> and saying <code>:text</code></td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat/cute/says/hello" target="_blank">Random cute cat saying hello</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat/cute/says/hello" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat/says/:text?size=:size&color=:color</strong><br/><span class="d-none d-sm-inline">/c/s/:text?s=:size&c=:color</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat saying <code>:text</code> with text's <code>:size</code> and text's <code>:color</code></td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat/says/hello?size=50&color=red" target="_blank">Custom random cat saying hello</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat/says/hello?size=50&color=red" target="_blank">Example</a>
                </td>
            </tr>
        </table>

        <h2>Advanced</h2>
        <table class="table table-striped">
            <tr>
                <th>Url</th>
                <th class="d-none d-lg-table-cell">Description</th>
                <th>Example</th>
            </tr>

            <tr>
                <td><strong>/cat?type=:type</strong><br/><span class="d-none d-sm-inline">/c?t=:type</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat with image <code>:type</code> (small or sm, medium or md, square or sq, original or or)</td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat?type=sq" target="_blank">Random cat with type</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat?type=sq" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat?filter=:filter</strong><br/><span class="d-none d-sm-inline">/c?fi=:filter</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat with image filtered by <code>:filter</code> (blur, mono, sepia, negative, paint, pixel)</td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat?filter=sepia" target="_blank">Random cat filtered</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat?filter=sepia" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat?width=:width or /cat?height=:height</strong><br/><span class="d-none d-sm-inline">/c?wi=:width or /c?he=:height</span></td>
                <td class="d-none d-lg-table-cell">Will return a random cat with <code>:width</code> or <code>:height</code></td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat?width=100" target="_blank">Random cat with custom size</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat?width=100" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat?html=true</strong></td>
                <td class="d-none d-lg-table-cell">Will return a random cat in a HTML page, usefull for Twitter or Facebook embedded render</td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat?html=true" target="_blank">Random cat in HTML</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat?html=true" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td><strong>/cat?json=true</strong></td>
                <td class="d-none d-lg-table-cell">Will return a random cat in a JSON object</td>
                <td>
                    <a class="btn btn-success d-none d-sm-inline-block" href="/cat?json=true" target="_blank">Random cat in JSON</a>
                    <a class="btn btn-success d-inline-block d-sm-none" href="/cat?json=true" target="_blank">Example</a>
                </td>
            </tr>

            <tr>
                <td>/c/gif/s/Hello?fi=sepia&c=orange&s=40&t=or</td>
                <td class="d-none d-lg-table-cell">Mix 'em all :D</td>
                <td>
                    <a class="btn btn-danger d-none d-sm-inline-block" href="/cat/gif/says/Hello?filter=sepia&color=orange&size=40&type=or" target="_blank">Combo</a>
                    <a class="btn btn-danger d-inline-block d-sm-none" href="/cat/gif/says/Hello?filter=sepia&color=orange&size=40&type=or" target="_blank">Combo</a>
                </td>
            </tr>
        </table>

        <h2>Get JSON data</h2>
        <table class="table table-striped">
            <tr>
                <th>Url</th>
                <th class="d-none d-lg-table-cell">Description</th>
                <th>Example</th>
            </tr>

            <tr>
                <td><strong>/api/cats?tags=tag1,tag2&skip=0&limit=10</strong></td>
                <td class="d-none d-lg-table-cell">Will return all cats</td>
                <td>
                    <a class="btn btn-success" href="/api/cats?tags=cute" target="_blank">Get all cute cats</a>
                </td>
            </tr>

            <tr>
                <td><strong>/api/tags</strong></td>
                <td class="d-none d-lg-table-cell">Will return all tags</td>
                <td>
                    <a class="btn btn-success" href="/api/tags" target="_blank">Get all tags</a>
                </td>
            </tr>
        </table>
    </section>
</template>

<script setup>
import TopNavbar from "../modules/app/components/Default/TopNavBar.vue";
import Icon from "../modules/ui/components/elements/Icon.vue";
import { ref } from "vue";

const count = ref(0);
let tmpCats = [];
for (let i = 0; i < 30; i++) {
    tmpCats.push('/cat?t=sq&time=' + (new Date()).getTime() + i);
}
const cats = ref(tmpCats);

fetch('/api/count').then(response => response.json()).then(({ number }) => count.value = number);
</script>
