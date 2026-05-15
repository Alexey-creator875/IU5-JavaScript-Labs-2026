export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div id="product">
                    <h2>${data.title}</h2>

                    <div class="my-slider">
                        <div><img src="${data.src1}"></div>
                        <div><img src="${data.src2}"></div>
                        <div><img src="${data.src3}"></div>
                    </div>

                    <p class="card-description">${data.description}</p>
                    <p class="card-type"><b>Тип:</b> ${data.type}</p>
                    <p class="card-components"><b>Компоненты:</b> ${data.components}</p>
                    <p class="card-assembly-time"><b>Время сборки:</b> ${data.assemblyTime}</p>
                    <p class="card-price"><b>Стоимость:</b> ${data.price}</p>
                    <input type="string" id="new-price-input" placeholder="Новая цена">
                    <button id="save-price-btn">Сохранить</button>
                </div>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById("save-price-btn")
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        this.addListeners(data, listener)
        
        $('.my-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
        });
    }
}