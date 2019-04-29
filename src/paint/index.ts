import * as THREE from "three-full";
import Init from './initThree';
import Gencoordinate from './GenCoordinate';
import DrawFunctions from './DrawFunction';
class Paint extends Init{
    constructor(container){
        super(container);
        this.run();
    }
    run(){
        // 坐标系
        new Gencoordinate( this );
        new DrawFunctions(this);
        this.renderer.render( this.scene,this.camera )
    }
}

export default Paint;