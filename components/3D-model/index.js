import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Model3DComponent {
    constructor(parent) {
        this.parent = parent;
        
    }

    getHTML() {
        return (
            `
            <div class="3D-model">
                <h6 class="3D-title"><b>3D модель</b></h6>
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
            `
        )
    }

    renderModel(model) {
        let camera, controls;

        let toRender = [{ model: model }];

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

    render(model) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.renderModel(model);
    }
}