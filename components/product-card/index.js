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

                    <span class="arr">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 7.5C22.7251 7.5 23.3301 8.01444 23.4697 8.69824C23.4897 8.79586 23.5 8.89746 23.5 9.00098V22.001C23.4997 22.8292 22.8283 23.501 22 23.501C21.1717 23.501 20.5003 22.8292 20.5 22.001V12.6221L10.0605 23.0615C9.47484 23.647 8.52518 23.6469 7.93945 23.0615C7.35367 22.4757 7.35367 21.5252 7.93945 20.9395L18.3789 10.5H9C8.17157 10.5 7.5 9.82843 7.5 9C7.5 8.17157 8.17157 7.5 9 7.5H22Z" fill="currentColor"></path>
                        </svg>
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