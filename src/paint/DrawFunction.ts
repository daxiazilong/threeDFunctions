import Paint from './index';
import * as THREE from "three-full";
import BasicShapes from './basicShape/BasicShape'
/**
 * 生成函数时主要使用柱面坐标系和球面坐标系
 * 生成对应的函数
 * 缺省的参数根据实际情况 灵活处理
 */

class DrawFunctions{
    constructor( Painter: Paint ){
        this.draw( Painter )
    }
    draw(Painter){

        let geometry = (new THREE.ParametricGeometry( BasicShapes.genXy , 125, 125)) ;


        let texture = new THREE.TextureLoader().load( "assets/source/images/lanqiu.gif" );

        texture.center = new THREE.Vector2( 0.5, 0.5 );
        console.log(texture)
        // texture.image = new THREE.TextureLoader().load( "assets/source/images/lanqiu.gif" );
        texture.needsUpdate = true;
        texture.rotation = -1.5;
        let material = new THREE.MeshBasicMaterial({ 
            color: 0xffffff ,
            side:THREE.DoubleSide,
            map: texture
        });

        // material.wireframe  = true;

        let mesh:THREE.Mesh = new THREE.Mesh( geometry, material );
        Painter.scene.add( mesh );
        animate();
        function animate(){
            texture.needsUpdate = true;
            mesh.rotation.y -= 0.01;
            requestAnimationFrame( animate );
            
            Painter.renderer.render( Painter.scene, Painter.camera );
           
        }
    }


    


}

export default DrawFunctions;