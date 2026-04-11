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
                <div id="product" class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">${data.title}</h3>
                                <h6 class="card-description-highlight"><b>Описание</b></h6>
                                <p class="card-description">${data.description}</p>
                                <p class="card-type"><b>Тип:</b> ${data.type}</p>
                                <p class="card-components"><b>Компоненты:</b> ${concatenate(erase(data.components), ", ")}</p>
                                <p class="card-assembly-time"><b>Время сборки:</b> ${data.assemblyTime}</p>
                                <p class="card-price"><b>Стоимость:</b> ${data.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        let model3D = new Model3DComponent(document.getElementById('product'));
        model3D.render(data);
    }
}