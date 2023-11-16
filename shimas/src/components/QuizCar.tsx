import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import YUKA from 'yuka'
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


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

    const loader=new GLTFLoader();
    const dLoader= new DRACOLoader();
    dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    dLoader.setDecoderConfig({type:'tsx'})
    loader.setDRACOLoader(dLoader)
  
    loader.load(monkeyUrl.href, function(glb:any){
        const model=glb.scene;
        scene.add(model)
    })

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