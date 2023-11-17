import {Path , Vector3} from 'yuka'
import {Vector3 as Vec3, Audio, AudioListener, AudioLoader} from 'three';

const YELLOWVEHICLESPATHS:any[]=[];

const yellowV1 = new Path();
yellowV1.add(new Vector3(5.91, 0.3, 125.92));
yellowV1.add(new Vector3(5.72, 0.3, 93.68));
YELLOWVEHICLESPATHS.push(yellowV1);

export {
    YELLOWVEHICLESPATHS,
}