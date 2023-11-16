import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import YUKA from 'yuka'
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import 'three/examples/jsm/utils/SkeletonUtils.js';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';


const QuizCar = () => {

    const monkeyUrl = new URL('../assets/quizcar/terrain.glb', import.meta.url);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Sets the color of the background
    renderer.setClearColor(0X94d8fb);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );


    // Camera positioning
    camera.position.set(3, 10, 218);
    camera.lookAt(scene.position)

    const ambientLight = new THREE.AmbientLight(0xE1E1E1, 0.3)
    scene.add(ambientLight)

    const hemisphereLight = new THREE.HemisphereLight(0x94D8FB, 0X9CFF2E, 0.3)
    scene.add(hemisphereLight)

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.7);
    scene.add(directionalLight)



    const loader = new GLTFLoader();
    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    dLoader.setDecoderConfig({ type: 'tsx' })
    loader.setDRACOLoader(dLoader)

    loader.load(monkeyUrl.href, function (glb: any) {
        const model = glb.scene;
        scene.add(model)
    })

    function sync(entity: any, renderComponent: any) {
        renderComponent.matrix.copy(entity.worldMatrix)
    }

    function createCarV(model: any, path: any, entityManager: any, yRotation: any) {
        const group = new THREE.Group();
        scene.add(group)
        group.matrixAutoUpdate = false;
        const car = SkeletonUtils.clone(model)
        group.add(car)

        const v = new YUKA.Vehicle();
        v.setRenderComponent(group, sync);

        renderer.render(scene, camera)

        entityManager.add(v)
        const followPathBehavior = new YUKA.FollowPathBehavior(path, 2);
        const onPathBehavior = new YUKA.OnPathBehavior(path);
        onPathBehavior.radius = 0.1;

        v.position.copy(path.current());
        v.maxSpeed = 5;
        v.steering.add(onPathBehavior);
        v.steering.add(followPathBehavior);

        followPathBehavior.active = false;


        const vehicleAll = { vehicle: v, modelGroup: car };
        return vehicleAll;

    }

    function animate() {
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

export default QuizCar