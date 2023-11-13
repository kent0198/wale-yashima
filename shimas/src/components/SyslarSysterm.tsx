import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import startsTextture from '@asset/solarsystem/stars.jpg'
import sunTexture from '@asset/solarsystem/sun.jpg'
import mercuryTextture from '@asset/solarsystem/mercury.jpg'
import venusTexture from '@asset/solarsystem/venus.jpg'
import earthTexture from '@asset/solarsystem/earth.jpg';
import marsTexture from '@asset/solarsystem/mars.jpg';
import jupiterTexture from '@asset/solarsystem/jupiter.jpg';
import saturnTexture from '@asset/solarsystem/saturn.jpg';
import saturnRingTexture from '@asset/solarsystem/saturn ring.png';
import uranusTexture from '@asset/solarsystem/uranus.jpg';
import uranusRingTexture from '@asset/solarsystem/uranus ring.png';
import neptuneTexture from '@asset/solarsystem/neptune.jpg';
import plutoTexture from '@asset/solarsystem/pluto.jpg';

const SyslarSysterm = () => {
  const rederer = new THREE.WebGL1Renderer();
  rederer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(rederer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.9,
    1000
  )
  const orbit = new OrbitControls(camera, rederer.domElement)
  camera.position.set(90, 140, 140);
  orbit.update();
  const ambientLight = new THREE.AmbientLight(0xc9b3d7);
  scene.add(ambientLight);
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
    startsTextture,
    startsTextture,
    startsTextture,
    startsTextture,
    startsTextture,
    startsTextture
  ]);

  const textureLoader = new THREE.TextureLoader();

  const sunGeo = new THREE.SphereGeometry(16, 30, 30);
  const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);

  scene.add(sun);

  function createPlanete(size: number, texture: any, position: number, ring?: any) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
      const ringGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius,
        32);
      const ringMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(ring.texture),
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      obj.add(ringMesh);
      ringMesh.position.x = position;
      ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return { mesh, obj }
  }

  const mercury = createPlanete(3.2, mercuryTextture, 28);
  const venus = createPlanete(5.8, venusTexture, 44);
  const earth = createPlanete(6, earthTexture, 62);
  const mars = createPlanete(4, marsTexture, 78);
  const jupiter = createPlanete(12, jupiterTexture, 100);
  const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
  });
  const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
  });
  const neptune = createPlanete(7, neptuneTexture, 200);
  const pluto = createPlanete(2.8, plutoTexture, 216);

  const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
  scene.add(pointLight);

  function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    rederer.render(scene, camera);
  }
  rederer.setAnimationLoop(animate);

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rederer.setSize(window.innerWidth, window.innerHeight);
});

  return (
    <div className=''>

    </div>
  )
}

export default SyslarSysterm