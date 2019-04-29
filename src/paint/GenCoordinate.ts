import * as THREE from "three-full";
import Paint from './index';

class Gencoordinate{
    constructor( Painter: Paint ){
        this.draw( Painter );
    }
    draw(Painter:Paint){
        let loader = new THREE.FontLoader();

        loader.load('assets/source/fonts/helvetiker_regular.typeface.json', function ( font ) {
            [
                { x:0,y:0,z:Painter.camera.position.z - 100,text:'X' },
                { x:-10,y:window.innerHeight/2,z:20,text:'Z' },
                { x:window.innerWidth / 2,y:10,z:0,text:'Y' }
            ].forEach((item) => {
                let geometry = new THREE.TextGeometry( item.text, {
                font: font,
                size: 20,
                height: 1,
                curveSegments: 1,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            });

            let materials = [
                new THREE.MeshPhongMaterial( { color: 0xff0000 } ),
            ];
            geometry = new THREE.BufferGeometry().fromGeometry( geometry );
            let textMesh1 = new THREE.Mesh( geometry, materials );
            textMesh1.position.x = item.x;
            textMesh1.position.y = item.y;
            textMesh1.position.z = item.z;
            Painter.scene.add( textMesh1 );
            })
            
        });
        let coordinateXY = new THREE.GridHelper( 2000, 100 , 0xff0000, 0xEED5B7);
        let material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        let geometry = new THREE.Geometry();

        geometry.vertices.push(new THREE.Vector3( 0, -10000, 0) );
        geometry.vertices.push(new THREE.Vector3( 0, 10000,0) );

        let geometry1 = new THREE.Geometry();
        geometry1.vertices.push(new THREE.Vector3( 0, 100, 0) );
        geometry1.vertices.push(new THREE.Vector3( 1000, 100,0) );


        let line = new THREE.Line( geometry, material );
        let line1 = new THREE.Line( geometry1, material );

        Painter.scene.add( line );
        Painter.scene.add( line1 );
        Painter.scene.add( coordinateXY );
        

    }
}

export default Gencoordinate;