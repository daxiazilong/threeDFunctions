import * as THREE from "three-full";
import Init from './initThree';
import Gencoordinate from './GenCoordinate';
class Paint extends Init{
    constructor(container){
        super(container);
        this.run();
    }
    run(){
        // 坐标系
        new Gencoordinate( this );
        
        this.renderer.render( this.scene,this.camera )
    }
}

export default Paint;