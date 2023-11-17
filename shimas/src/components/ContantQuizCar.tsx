import { Path, Vector3 } from 'yuka'
import { Vector3 as Vec3, Audio, AudioListener, AudioLoader } from 'three';

const YELLOWVEHICLESPATHS: any[] = [];

const yellowV1 = new Path();
yellowV1.add(new Vector3(5.91, 0.3, 125.92));
yellowV1.add(new Vector3(5.72, 0.3, 93.68));
YELLOWVEHICLESPATHS.push(yellowV1);

const yellowV2 = new Path();
yellowV2.add(new Vector3(6.21, 0.3, 30.19));
yellowV2.add(new Vector3(7.07, 0.3, 24.66));
yellowV2.add(new Vector3(33.32, 0.3, 24.36));
YELLOWVEHICLESPATHS.push(yellowV2);

const yellowV3 = new Path();
yellowV3.add(new Vector3(93.03, 0.3, 24.50));
yellowV3.add(new Vector3(102, 0.3, 22.84));
yellowV3.add(new Vector3(102.42, 0.3, -1.27));
YELLOWVEHICLESPATHS.push(yellowV3);

const yellowV4 = new Path();
yellowV4.add(new Vector3(102.50, 0.3, -66));
yellowV4.add(new Vector3(99.92, 0.3, -73.97));
yellowV4.add(new Vector3(76.00, 0.3, -75.41));
YELLOWVEHICLESPATHS.push(yellowV4);

const yellowV5 = new Path();
yellowV5.add(new Vector3(11.86, 0.3, -75.86));
yellowV5.add(new Vector3(5.98, 0.3, -75.96));
yellowV5.add(new Vector3(5.63, 0.3, -102.59));
YELLOWVEHICLESPATHS.push(yellowV5);

const yellowV6 = new Path();
yellowV6.add(new Vector3(5.97, 0.3, -161.04));
yellowV6.add(new Vector3(4.55, 0.3, -169.50));
yellowV6.add(new Vector3(-20.11, 0.3, -170.21));
YELLOWVEHICLESPATHS.push(yellowV6);

const yellowV7 = new Path();
yellowV7.add(new Vector3(-82.82, 0.3, -171.17));
yellowV7.add(new Vector3(-115.08, 0.3, -170.50));
YELLOWVEHICLESPATHS.push(yellowV7);

export {
    YELLOWVEHICLESPATHS,
}