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
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        
        $('.my-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
        });
    }
}