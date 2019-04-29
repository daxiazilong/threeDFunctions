import Paint from './index';
import * as THREE from "three-full";
class DrawFunctions{
    constructor( Painter: Paint ){
        this.draw( Painter )
    }
    draw(Painter){
        let geometry = (new THREE.ParametricGeometry( this.gen3DVertical , 25, 25)) ;
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,side:THREE.DoubleSide} );
        let klein:THREE.Mesh = new THREE.Mesh( geometry, material );
        Painter.scene.add( klein )
    }



    gen3DVertical(u,v, target:THREE.Vector3  ){
        var x = v*500;
        var z = 0;
        var y =0;
        target.set(x, 200, z);
    }


}

export default DrawFunctions;