import {ProductComponent} from "../../components/product/index.js"
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        if (this.id == 1) {
            return {
                id: 1,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Ангара-1.2",
                type: "лёгкий",
                price: "1 200 млн ₽",
                description: "Ангара-1.2 — лёгкая ракета-носитель, предназначенная для вывода малых и средних спутников на низкие орбиты. Использует экологически чистое топливо (керосин + жидкий кислород). Идеальна для научных и коммерческих запусков.",
                assemblyTime: "6 месяцев"
            }
        }

        if (this.id == 2) {
            return {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Ангара-А5",
                type: "тяжёлый",
                price: "4 500 млн ₽",
                description: "Ангара-А5 — тяжёлая ракета, способная выводить до 24 тонн на низкую опорную орбиту. Оснащена разгонным блоком для доставки грузов на геостационарную орбиту. Основной конкурент «Протона» с повышенной экологичностью.",
                assemblyTime: "14 месяцев"
            }
        }

        if (this.id == 3) {
            return {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Ангара-А5В",
                type: "сверхтяжёлый",
                price: "8 700 млн ₽",
                description: "Ангара-А5В — модернизированная версия с водородной второй ступенью. Позволяет выводить до 37 тонн на низкую орбиту или до 12 тонн к Луне. Перспективная ракета для лунных и межпланетных миссий.",
                assemblyTime: "20 месяцев"
            }
        }
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

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)
    }
}