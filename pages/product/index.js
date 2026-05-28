import { ProductComponent } from "../../components/product/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { launchVehicleUrls } from "../../modules/launchVehicleUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    async getData() {
        try {
            const data = await ajax.get(launchVehicleUrls.getLaunchVehicleById(this.id));
            this.renderData(data);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item, this.updatePrice.bind(this))
    }

    updatePrice() {
        const newPrice = document.getElementById("new-price-input").value;

        setTimeout(() => {
            ajax.patch(launchVehicleUrls.updateLaunchVehicleById(this.id), {price: newPrice}, () => {});
        }, 20000);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot, "Ракетоносители")
        backButton.render(this.clickBack.bind(this))

        this.getData()
    }
}