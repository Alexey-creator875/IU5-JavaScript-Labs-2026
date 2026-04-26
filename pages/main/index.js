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
                description: "Ангара-1.2 — лёгкая ракета-носитель, предназначенная для вывода малых и средних спутников на низкие орбиты. Использует экологически чистое топливо (керосин + жидкий кислород). Идеальна для научных и коммерческих запусков.",
                price: "1 200 млн ₽",
            },
            {
                id: 2,
                src: "../../assets/Ангара-А5.jpg",
                title: "Ангара-А5",
                description: "Ангара-А5 — тяжёлая ракета, способная выводить до 24 тонн на низкую опорную орбиту. Оснащена разгонным блоком для доставки грузов на геостационарную орбиту. Основной конкурент «Протона» с повышенной экологичностью.",
                price: "4 500 млн ₽",
            },
            {
                id: 3,
                src: "../../assets/Ангара-А5В.jpeg",
                title: "Ангара-А5В",
                description: "Ангара-А5В — модернизированная версия с водородной второй ступенью. Позволяет выводить до 37 тонн на низкую орбиту или до 12 тонн к Луне. Перспективная ракета для лунных и межпланетных миссий.",
                price: "8 700 млн ₽",
            }
        ]
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
                <div class="titlepage">
                    <h1>Ракетоносители</h1>
                </div>
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    clickCard(e) {
        const cardId = e.currentTarget.dataset.id;

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