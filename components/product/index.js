import { concatenate } from "../../tasks/1.1.js";
import { erase } from "../../tasks/1.10.js";

import { Model3DComponent } from "../3D-model/index.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div id="product">
                    <h2>${data.title}</h2>

                    <div class="media_embed">
                        <img src="${data.src}" class="img-fluid" alt="картинка">
                    </div>

                    <p class="card-description">${data.description}</p>
                    <p class="card-type"><b>Тип:</b> ${data.type}</p>
                    <p class="card-components"><b>Компоненты:</b> ${concatenate(erase(data.components), ", ")}</p>
                    <p class="card-assembly-time"><b>Время сборки:</b> ${data.assemblyTime}</p>
                    <p class="card-price"><b>Стоимость:</b> ${data.price}</p>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        let model3D = new Model3DComponent(document.getElementById('product'));
        model3D.render(data.model);
    }
}