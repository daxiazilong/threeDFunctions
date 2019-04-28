import * as THREE from "three-full";

class Init{
    camera:any;
    scene:any;
    renderer:any;
    controls:any;
    light: any;
    
    constructor(container){
        this.initCamera();
        this.initScene();
        this.initRender( container );
        this.initLight();
        this.initControls(container);
    }
    initCamera(){
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.x = 100;
        this.camera.position.y = 200;
        this.camera.position.z = 800;

        this.camera.lookAt({
            x : 0,
            y : 0,
            z : 0
        });
    }
    initScene(){
        this.scene = new THREE.Scene();
    }
    initRender(con){
        this.renderer = new THREE.WebGLRenderer({
                    antialias : true
        });
        con.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x000000, 1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    initLight() {
    // A start
        this.light = new THREE.AmbientLight(0xffffff);
        this.light.position.set(100, 100, 200);
        this.scene.add(this.light);
    // A end

    }
    initControls(con){
        this.controls = new THREE.OrbitControls( this.camera ,con);
        this.controls.update();
        let painter = this;
        animate();
        function animate() {

            requestAnimationFrame( animate );

            // required if controls.enableDamping or controls.autoRotate are set to true
            painter.controls.update();

            painter.renderer.render( painter.scene, painter.camera );

        }
    }
}
export default Init;