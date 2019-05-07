import * as THREE from "three-full";
import Init from './initThree';
import Gencoordinate from './GenCoordinate';
import DrawFunctions from './DrawFunction';
class Paint extends Init{
    drawCoordite:Gencoordinate;
    drawFunction:DrawFunctions;
    animateId: number;
    constructor(container){
        super(container);
        this.run();
    }
    clear(){
  
        this.scene.children.forEach(element => {
            if( element.name === 'function' ){
                this.scene.remove(element)
            }
        });
        this.renderer.render( this.scene,this.camera )
    }
    run(){
        // 坐标系
       this.drawCoordite =  new Gencoordinate( this );
       this.drawFunction = new DrawFunctions(this);
       this.renderer.render( this.scene,this.camera );
       this.animation();

    }
    animation(){
        this.animaStack.forEach( calback => {
            calback();
        });
        this.renderer.render( this.scene, this.camera );
        this.animateId = requestAnimationFrame( this.animation.bind(this) )
    }
}

export default Paint;