import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'



const BlenderToThree = () => {
    const monkeyUrl = new URL('../assets/3/doggo2.glb', import.meta.url);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.2,
        1000
    );
    renderer.setClearColor(0xc2aad1);

    const orbit = new OrbitControls(camera, renderer.domElement);

    camera.position.set(10, 10, 10);
    orbit.update();

    const grid = new THREE.GridHelper(30, 30);
    scene.add(grid);

    const assetLoader = new GLTFLoader();

    let mixer: any;
    assetLoader.load(monkeyUrl.href, function (gltf) {
        const model = gltf.scene;
        scene.add(model)
        mixer = new THREE.AnimationMixer(model);

        const clips = gltf.animations;
        clips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
    }, undefined, function (error) {
        console.log('Error')
    })

    const clock = new THREE.Clock();
    function animate() {
        if (mixer)
            mixer.update(clock.getDelta());
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return (
        <>

        </>
    )
}

export default BlenderToThree