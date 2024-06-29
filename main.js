// main.js
import * as THREE from 'three';

let scene, camera, renderer, star;

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Star Geometry
    const starShape = new THREE.Shape();
    starShape.moveTo(0, 0.5);
    for (let i = 1; i <= 10; i++) {
        const angle = (i / 5) * Math.PI;
        const radius = i % 2 === 0 ? 0.5 : 0.2;
        starShape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Animation logic
    star.rotation.x += 0.01;
    star.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
init();
