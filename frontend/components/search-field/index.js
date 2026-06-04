export class SearchFieldComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("search-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <div id="search-field">
                    <input type="text" id="search-input" class="black-input" placeholder="Поиск...">
                    <button id="search-button" class="black-btn">Найти</button>
                </div>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}