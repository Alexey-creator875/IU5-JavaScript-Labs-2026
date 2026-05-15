import {ProductComponent} from "../../components/product/index.js"
import {MainPage} from "../main/index.js";
import {ajax} from "../../modules/ajax.js";
import {launchVehicleUrls} from "../../modules/launchVehicleUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        ajax.get(launchVehicleUrls.getLaunchVehicleById(this.id), (data) => {
            this.renderData(data);
        })
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item, this.updatePrice.bind(this))
    }

    updatePrice() {
        console.log("work");
        console.log(this.id);

        const newPrice = document.getElementById("new-price-input").value;
        console.log(newPrice);
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

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData()
    }
}