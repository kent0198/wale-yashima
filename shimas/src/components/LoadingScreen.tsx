import * as THREE from 'three';

const LoadingScreen = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(2, 50, 50); 
    const sphereMaterial = new THREE.MeshPhysicalMaterial({ 
       roughness:0,
       metalness:0,
       transmission:1,
       color:0xFFEA00,
       ior:2.33,
    });

    renderer.setClearColor(0xb29fc8);
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Đặt camera và render scene
    camera.position.z = 15;

    // Tạo animation loop
    const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();
    return (
        <>

        </>
    )
}

export default LoadingScreen