import * as THREE from "three-full";

class BasicShapes{
    constructor(){}
    // 旋转抛物面
    static genParaboloid (u,v, target:THREE.Vector3  ){
        let k = 500;//x、y取值范围
        let a = 0.01;//旋转抛物面焦点
        let x = (u-0.5) * k;
        let z = (v-0.5) * k;
        let y = Math.pow(a, 2) * (Math.pow(x, 2) + Math.pow(z, 2));
        target.set(x, y, z);
    }
    // 圆
    static genCircle( u,v, target:THREE.Vector3 ){
        u = u*Math.PI;
        v = v*Math.PI*2;

        let r = 250;
        let x = r*Math.sin( u )*Math.cos(v);;

        let y = r*Math.sin( u )*Math.sin(v);;
        
        target.set(x, y, 0);
    }
    // 球
    static genCube(u,v, target:THREE.Vector3){
        // 球面坐标
        u = u*Math.PI;
        v = v*Math.PI*2;

        let r = 500;

        let x = r*Math.sin( u )*Math.cos(v);
        let z = r*Math.sin( u )*Math.sin(v);
        let y = r*Math.cos(u);
        target.set(x, y, z);
    }
    // 柱面
    static genXy(u,v, target:THREE.Vector3){

        // 柱面坐标
        u = u*Math.PI;
        v = v*Math.PI*2;
        let r = 250;

        let x = r*Math.cos(v);
        let z = r*Math.sin(v);
        let y = r*Math.cos(u);

        target.set(x, y, z);

    }

}

export default BasicShapes;