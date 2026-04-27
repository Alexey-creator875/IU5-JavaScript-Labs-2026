export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="product-card" id="click-card-${data.id}" data-id="${data.id}">
                    <span class="pict">
                        <img src="${data.src}" alt="картинка">
                    </span>

                    <span class="text">
                        <span class="card-title">${data.title}</span>
                        <span class="card-info">${data.description}</span>
                        <span class="card-info">Стоимость: ${data.price}</span>
                    </span>
                </div>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}