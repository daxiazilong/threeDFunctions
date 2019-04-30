import Paint from './index';
import * as THREE from "three-full";
class DrawFunctions{
    constructor( Painter: Paint ){
        this.draw( Painter )
    }
    draw(Painter){
        let geometry = (new THREE.ParametricGeometry( this.genCube , 25, 25)) ;
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,side:THREE.DoubleSide} );
        material.wireframe  = true;

        let klein:THREE.Mesh = new THREE.Mesh( geometry, material );
        Painter.scene.add( klein )
    }



    genParaboloid (u,v, target:THREE.Vector3  ){
        let k = 500;//x、y取值范围
        let a = 0.1;//旋转抛物面焦点
        let x = (u-0.5) * k;
        let z = (v-0.5) * k;
        let y = Math.pow(a, 2) * (Math.pow(x, 2) + Math.pow(z, 2));
        target.set(x, y, z);
    }

    genCircle( u,v, target:THREE.Vector3 ){
        u = u*Math.PI*2;
        v = v*Math.PI*2;

        let r = 250;
        let x = r*Math.cos(u);

        let y = Math.sqrt( Math.pow(r,2) - Math.pow(x,2) )*Math.sin(v);
        
        target.set(x, y, 0);
    }
    genCube(u,v, target:THREE.Vector3){
        // 球面坐标
        u = u*Math.PI;
        v = v*Math.PI*2;

        let r = 500;

        let x = r*Math.sin( u )*Math.cos(v);
        let z = r*Math.sin( u )*Math.sin(v);
        let y = r*Math.cos(u);
        target.set(x, y, z);
    }


}

export default DrawFunctions;