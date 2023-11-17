import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as YUKA from 'yuka'
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import 'three/examples/jsm/utils/SkeletonUtils.js';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';
import { YELLOWVEHICLESPATHS, REDVEHICLESPATHS, BLUEVEHICLESPATHS } from './ContantQuizCar';
import Loading from './Loading';

const QuizCar = () => {

    const entityManager = new YUKA.EntityManager();
    const redCar = new URL('../assets/quizcar/red.glb', import.meta.url)
    const monkeyUrl = new URL('../assets/quizcar/terrain.glb', import.meta.url);
    const blueCar = new URL('../assets/quizcar/blue.glb', import.meta.url)
    const suv = new URL('../assets/quizcar/SUV.glb', import.meta.url);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loadingManager = new THREE.LoadingManager();

    const yellowCars: any[] = [];
    const redCars: any[] = [];
    const blueCars = [];

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


    const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;
    loadingManager.onProgress = function (url: any, loaded: any, total: any) {
        if (progressBar) {
            progressBar.value = (loaded / total) * 100;
        }
    }

    const progressBarContainer = document.querySelector('.progress-bar-container') as HTMLElement;
    loadingManager.onLoad = function () {
        progressBarContainer.style.display = 'none';
    }


    const loader = new GLTFLoader(loadingManager);
    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    dLoader.setDecoderConfig({ type: 'tsx' })
    loader.setDRACOLoader(dLoader)

    loader.load(monkeyUrl.href, function (glb: any) {
        const model = glb.scene;
        scene.add(model)
    })

    loader.load(suv.href, function (glb) {
        const model = glb.scene;
        const v1 = createCarV(model, YELLOWVEHICLESPATHS[0], entityManager, Math.PI)
        const v2 = createCarV(model, YELLOWVEHICLESPATHS[1], entityManager, Math.PI)
        const v3 = createCarV(model, YELLOWVEHICLESPATHS[2], entityManager, Math.PI)
        const v4 = createCarV(model, YELLOWVEHICLESPATHS[3], entityManager, Math.PI)
        const v5 = createCarV(model, YELLOWVEHICLESPATHS[4], entityManager, Math.PI)
        const v6 = createCarV(model, YELLOWVEHICLESPATHS[5], entityManager, Math.PI)
        const v7 = createCarV(model, YELLOWVEHICLESPATHS[6], entityManager, -Math.PI / 2)

        yellowCars.push(v1, v2, v3, v4, v5, v6, v7)
    })

    loader.load(redCar.href, function (glb) {
        const model = glb.scene;
        const v1 = createCarV(model, REDVEHICLESPATHS[0], entityManager, Math.PI);
        const v2 = createCarV(model, REDVEHICLESPATHS[1], entityManager, Math.PI);
        const v3 = createCarV(model, REDVEHICLESPATHS[2], entityManager, -Math.PI);
        const v4 = createCarV(model, REDVEHICLESPATHS[3], entityManager, 0);
        const v5 = createCarV(model, REDVEHICLESPATHS[4], entityManager, Math.PI);
        const v6 = createCarV(model, REDVEHICLESPATHS[5], entityManager, Math.PI);
        const v7 = createCarV(model, REDVEHICLESPATHS[6], entityManager, Math.PI / 2);
        redCars.push(v1, v2, v3, v4, v5, v6, v7);

    })

    loader.load(blueCar.href, function (glb) {
        const model = glb.scene;
        const v1 = createCarV(model, BLUEVEHICLESPATHS[0], entityManager, Math.PI / 2);
        const v2 = createCarV(model, BLUEVEHICLESPATHS[1], entityManager, Math.PI / 2);
        const v3 = createCarV(model, BLUEVEHICLESPATHS[2], entityManager, 0);
        const v4 = createCarV(model, BLUEVEHICLESPATHS[3], entityManager, Math.PI / 2);
        const v7 = createCarV(model, BLUEVEHICLESPATHS[4], entityManager, Math.PI);
        blueCars.push(v1, v2, v3, v4, v7);
    });


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

        v.rotation.fromEuler(0, yRotation, 0);


        const vehicleAll = { vehicle: v, modelGroup: car };
        return vehicleAll;

    }
    const time = new YUKA.Time();
    function animate() {

        const delta = time.update().getDelta();
        entityManager.update(delta);
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