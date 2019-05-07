import * as THREE from "three-full";

class Init{
    camera:any;
    scene:any;
    renderer:any;
    controls:any;
    light: any;
    canMove: boolean = true;
    animaStack: Array< Function > = [];
    
    constructor(container){
        this.initCamera();
        this.initScene();
        this.initRender( container );
        this.initLight();
        this.initControls(container);
    }
    initCamera(){
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.x = 50 ;
        this.camera.position.y = 50;
        this.camera.position.z = 1000;

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
        this.renderer.setClearColor(0xd2d2d2, 1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    initLight() {
    // A start
        this.light = new THREE.AmbientLight(0xffffff);
        this.light.position.set(0, 0, 0);
        this.scene.add(this.light);
    // A end

    }
    initControls(con){
        this.controls = new THREE.OrbitControls( this.camera ,con);
        // this.controls.autoRotate = true;
        this.controls.enableKeys = false;
        this.controls.enableZoom = false;
        // this.controls.dampingFactor = 1;
        this.controls.update();
        let Painter = this;
        function animate() {            
            Painter.controls.update();
        }

        // 加入动画栈
        this.animaStack.push( animate )
    }
    
}
export default Init;