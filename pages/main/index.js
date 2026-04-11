import {ProductCardComponent} from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "../../assets/Ангара-1.2.jpg",
                title: "Ангара-1.2",
                type: "лёгкий",
                price: "1 200 млн ₽",
                preset: { id: 1, title: "Ангара-1.2", model: "../../assets/models/Range Rover.glb" },
            },
            {
                id: 2,
                src: "../../assets/Ангара-А5.jpg",
                title: "Ангара-А5",
                type: "тяжёлый",
                price: "4 500 млн ₽",
                preset: { id: 1, title: "Ангара-1.2", model: "../../assets/models/Big Tree.glb" },
            },
            {
                id: 3,
                src: "../../assets/Ангара-А5В.jpeg",
                title: "Ангара-А5В",
                type: "сверхтяжёлый",
                price: "8 700 млн ₽",
                 preset: { id: 1, title: "Ангара-1.2", model: "../../assets/models/Palm Tree.glb" },
            }
        ]
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        })
    } 
}