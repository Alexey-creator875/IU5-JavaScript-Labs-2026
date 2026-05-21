import { SearchFieldComponent } from "../../components/search-field/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { launchVehicleUrls } from "../../modules/launchVehicleUrls.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData(price = null) {
        ajax.get(launchVehicleUrls.getLaunchVehicles(price), (data) => {
            this.renderData(data);
        })
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    get searchSpot() {
        return document.getElementById('search-spot');
    }

    getHTML() {
        return (
            `
                <div class="titlepage">
                    <h1>Ракетоносители</h1>
                </div>
                <div id="search-spot"></div>
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    clickCard(e) {
        const cardId = e.currentTarget.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    clickSearch() {
        this.pageRoot.innerHTML = '';

        const searchText = document.getElementById("search-input").value;
        this.getData(searchText);
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const searchField = new SearchFieldComponent(this.searchSpot)
        searchField.render(this.clickSearch.bind(this))

        this.getData()
    }
}