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
                src: "../../assets/Ангара-1.2.jpg",
                title: "Ангара-1.2",
                type: "лёгкий",
                price: "1 200 млн ₽",
                description: "Ангара-1.2 — лёгкая ракета-носитель, предназначенная для вывода малых и средних спутников на низкие орбиты. Использует экологически чистое топливо (керосин + жидкий кислород). Идеальна для научных и коммерческих запусков.",
                assemblyTime: "6 месяцев",
                components: [null, "УРМ-1", null, "РД-191М", null, "стандартный головной обтекатель", "бортовая система управления и навигации"],
                preset: { id: 1, title: "Ангара-1.2", model: "../../assets/models/Range Rover.glb" },
            }
        }

        if (this.id == 2) {
            return {
                id: 2,
                src: "../../assets/Ангара-А5.jpg",
                title: "Ангара-А5",
                type: "тяжёлый",
                price: "4 500 млн ₽",
                description: "Ангара-А5 — тяжёлая ракета, способная выводить до 24 тонн на низкую опорную орбиту. Оснащена разгонным блоком для доставки грузов на геостационарную орбиту. Основной конкурент «Протона» с повышенной экологичностью.",
                assemblyTime: "14 месяцев",
                components: ["4 х УРМ-1", "УРМ-2", "4 х РД-191", "РД-191", "Бриз-М", "крупногабаритный головной обтекатель", "бортовая система управления и навигации"],
                preset: { id: 1, title: "Ангара-1.2", model: "../../assets/models/Big Tree.glb" },
            }
        }

        if (this.id == 3) {
            return {
                id: 3,
                src: "../../assets/Ангара-А5В.jpeg",
                title: "Ангара-А5В",
                type: "сверхтяжёлый",
                price: "8 700 млн ₽",
                description: "Ангара-А5В — модернизированная версия с водородной второй ступенью. Позволяет выводить до 37 тонн на низкую орбиту или до 12 тонн к Луне. Перспективная ракета для лунных и межпланетных миссий.",
                assemblyTime: "20 месяцев",
                components: ["4 х УРМ-1", "УРМ-2В (водородный)", "4 х РД-191", "РД-0150 (водородный)", "КВТК (кислородно-водородный)", "усиленный головной обтекатель повышенной грузоподъемности", "бортовая система управления и навигации с криогенной поддержкой"],
                preset: { id: 1, title: "Ангара-1.2", model: "../../assets/models/Palm Tree.glb" },
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