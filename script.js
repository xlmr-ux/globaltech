import * as THREE from "https://unpkg.com/three@0.120.0/build/three.module.js";

let container, scene, camera, renderer;
let letters = [];

window.addEventListener("load", init);

function init() {
  container = document.querySelector("#scene-container");

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 2, 21);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Letters for "MOMBASA"
  const lettersText = "MOMBASA";
  const material = new THREE.MeshStandardMaterial({ color: 0xff5733 });

  lettersText.split("").forEach((char, index) => {
    const geometry = new THREE.TextGeometry(char, {
      font: new THREE.FontLoader().load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"),
      size: 1,
      height: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(index * 1.5 - (lettersText.length / 2), 0, 0);
    letters.push(mesh);
    scene.add(mesh);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate each letter
  letters.forEach((letter, index) => {
    letter.rotation.y += 0.02 + index * 0.005;
  });

  renderer.render(scene, camera);
}
