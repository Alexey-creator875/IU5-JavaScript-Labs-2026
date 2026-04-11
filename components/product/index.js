import { concatenate } from "../../tasks/1.1.js";
import { erase } from "../../tasks/1.10.js";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ---- ФУНКЦИЯ ОТРИСОВКИ ----
function renderModel(camera, controls) {
//   document.getElementById('model-title').textContent = title || "3D модель";
  const canvas = document.getElementById('viewer-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe6ebf5);

  // camera и controls — глобальные!
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.target.set(0, 1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(4, 10, 8);
  scene.add(dirLight);

  const loader = new GLTFLoader();
  let loaded = [];
  const gap = 1.8;

  if (toRender.length === 2) {
    toRender.forEach((item, i) => {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        model.position.x = i === 0 ? -gap : gap;
        scene.add(model);
        loaded.push(model);
      });
    });
  } else if (toRender.length === 1) {
    const item = toRender[0];
    if (item.model) {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        scene.add(model);
        loaded.push(model);
      });
    } else if (item.buffer) {
      loader.parse(item.buffer, '', gltf => {
        const model = gltf.scene;
        scene.add(model);
        loaded.push(model);
      }, error => {
        alert('Не удалось загрузить модель');
        console.error(error);
      });
    }
  }

  // --- КНОПКИ УПРАВЛЕНИЯ ---
  document.getElementById('zoom-in').onclick = () => {
    const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.addScaledVector(vec, -0.5);
    controls.update();
  };
  document.getElementById('zoom-out').onclick = () => {
    const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.addScaledVector(vec, 0.5);
    controls.update();
  };

  const distance = () => camera.position.distanceTo(controls.target);

  function setCameraDirection(dir) {
    const d = distance();
    let x = 0, y = 2, z = 0;
    if (dir === "front")  { x = 0; z = d; }
    if (dir === "back")   { x = 0; z = -d; }
    if (dir === "left")   { x = -d; z = 0; }
    if (dir === "right")  { x = d; z = 0; }
    camera.position.set(x, y, z);
    controls.target.set(0, 1, 0);
    controls.update();
  }

  document.getElementById('view-front').onclick = () => setCameraDirection('front');
  document.getElementById('view-back').onclick = () => setCameraDirection('back');
  document.getElementById('view-left').onclick = () => setCameraDirection('left');
  document.getElementById('view-right').onclick = () => setCameraDirection('right');

  // --- Resize и animate ---
  function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    return needResize;
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener('resize', resizeRendererToDisplaySize);
}


export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
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
                        <h6 class="3В-title"><b>3D модель</b></h6>
                        <div id="viewer-controls" style="display:flex;gap:12px;align-items:center;margin:20px 0 0 20px;">
                            <button id="zoom-in">+</button>
                            <button id="zoom-out">−</button>
                            <button id="view-front">Вид спереди</button>
                            <button id="view-back">Сзади</button>
                            <button id="view-left">Слева</button>
                            <button id="view-right">Справа</button>
                        </div>
                        <canvas id="viewer-canvas"></canvas>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        let camera, controls;

        const id = data.id;
        const userId = null;

        let modelData = null;
        let title = '';
        let toRender = [];

        if (id) {
            modelData = data.preset;
            title = data.title;

            if (modelData?.models) {
                toRender = modelData.models.map(x => ({ model: x.model }));
            } else if (modelData?.model) {
                toRender = [{ model: modelData.model }];
            }

            renderModel(camera, controls);
        } else if (userId) {
            getModelByIdFromDB(userId).then(userModel => {
                if (!userModel) {
                    document.getElementById('model-title').textContent = "Модель не найдена";
                    return;
                }
                title = userModel.title;
                toRender = [{ buffer: userModel.buffer, filename: userModel.filename }];
                renderModel();
            });
        } else {
            document.getElementById('model-title').textContent = 'Нет данных';
        }

        // ---- ФУНКЦИЯ ОТРИСОВКИ ----
        function renderModel() {
            //   document.getElementById('model-title').textContent = title || "3D модель";
            const canvas = document.getElementById('viewer-canvas');
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xe6ebf5);

            // camera и controls — глобальные!
            camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            camera.position.set(0, 2, 5);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enableZoom = true;
            controls.target.set(0, 1, 0);

            scene.add(new THREE.AmbientLight(0xffffff, 0.7));
            const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
            dirLight.position.set(4, 10, 8);
            scene.add(dirLight);

            const loader = new GLTFLoader();
            let loaded = [];
            const gap = 1.8;

            if (toRender.length === 2) {
                toRender.forEach((item, i) => {
                loader.load(item.model, gltf => {
                    const model = gltf.scene;
                    model.position.x = i === 0 ? -gap : gap;
                    scene.add(model);
                    loaded.push(model);
                });
                });
            } else if (toRender.length === 1) {
                const item = toRender[0];
                if (item.model) {
                loader.load(item.model, gltf => {
                    const model = gltf.scene;
                    scene.add(model);
                    loaded.push(model);
                });
                } else if (item.buffer) {
                loader.parse(item.buffer, '', gltf => {
                    const model = gltf.scene;
                    scene.add(model);
                    loaded.push(model);
                }, error => {
                    alert('Не удалось загрузить модель');
                    console.error(error);
                });
                }
            }

            // --- КНОПКИ УПРАВЛЕНИЯ ---
            document.getElementById('zoom-in').onclick = () => {
                const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
                camera.position.addScaledVector(vec, -0.5);
                controls.update();
            };
            document.getElementById('zoom-out').onclick = () => {
                const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
                camera.position.addScaledVector(vec, 0.5);
                controls.update();
            };

            const distance = () => camera.position.distanceTo(controls.target);

            function setCameraDirection(dir) {
                const d = distance();
                let x = 0, y = 2, z = 0;
                if (dir === "front")  { x = 0; z = d; }
                if (dir === "back")   { x = 0; z = -d; }
                if (dir === "left")   { x = -d; z = 0; }
                if (dir === "right")  { x = d; z = 0; }
                camera.position.set(x, y, z);
                controls.target.set(0, 1, 0);
                controls.update();
            }

            document.getElementById('view-front').onclick = () => setCameraDirection('front');
            document.getElementById('view-back').onclick = () => setCameraDirection('back');
            document.getElementById('view-left').onclick = () => setCameraDirection('left');
            document.getElementById('view-right').onclick = () => setCameraDirection('right');

            // --- Resize и animate ---
            function resizeRendererToDisplaySize() {
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                const needResize = canvas.width !== width || canvas.height !== height;
                if (needResize) {
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                }
                return needResize;
            }

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
            window.addEventListener('resize', resizeRendererToDisplaySize);
        }
    }
}