import Paint from './index';
import * as THREE from "three-full";
import BasicShapes from './basicShape/BasicShape'
/**
 * 生成函数时主要使用柱面坐标系和球面坐标系
 * 生成对应的函数
 * 缺省的参数根据实际情况 灵活处理
 */

class DrawFunctions{
    basicMathOpr:Array<string> = Object.keys(Object.getOwnPropertyDescriptors(Math ));
    basicOperator:Array<string> = [
        '+','-','*','/','.',
        '(',')'
    ];
    independentVariable:Array<string> = ['x','y','z'];

    constructor( Painter: Paint ){
        this.draw( Painter )
        // this.computeShape( 'z = -x-y +200',Painter )
    }
    

    computeShape( Exp:string ,Painter?: Paint ){
        let exp = this.checkValidate(Exp);

        /**
         * 目前只解决 以下两种类型的方程
         *  z= f(x,y)
         *  y = f(x)
         */
        switch( exp[0] ){
            case 'z':
                this.handleZ(exp,Painter);
                break;
            case 'y':
                this.handleY(exp,Painter);
                break;
            default:
                throw {
                    type:0,
                    msg:'Invild Expression'
                }
        }
    }

    handleY(exp:string,Painter?: Paint){
        let geometry = (new THREE.ParametricGeometry( genXy , 250, 100)) ;

        // three.js坐标系中，width == y, length = x
        function genGeomWithExtrude(){
            let path = new THREE.Path();

            let x = -500;
            let start = {x:x,y:eval( exp )};
            path.moveTo(x,eval( exp ));
            let Path = [];
            let shape = new THREE.Shape( );
            shape.autoClose = false;
            for(  ; x <=500;x++ ){

                let y = eval( exp );
                Path.push( new THREE.Vector2( x, y ) )

                shape.lineTo(x,y);
                // shape.moveTo(x,y);
                // shape.closePath();
            }
            shape.moveTo(start.x,start.y);
            shape.closePath();

            
            
            
            shape.holes = path;

            var extrudeSettings = {
                steps: 10,
                depth: 1,
                bevelEnabled: false,
            };

            var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        }
        
        this.draw( Painter, geometry );
        function genXy(u:number,v:number, target:THREE.Vector3){
            // 控制正负号
            u = u - 0.5;
            v = v - 0.5;
            // theTa = 2*Math.PI *theTa;
            // fin   = Math.PI * fin;

             
            let r = 1000;
            let x = r*u;
            let y = eval( exp );
            let z = r*v;

            // let r = 500;
            // let x = r * Math.sin(fin) * Math.cos(theTa);
            // let y = eval( exp )* Math.sin(fin) *Math.cos(theTa);
            // let z = r* Math.cos(fin);
            target.set(y, z, x);
            // target.set(x, y, z);

        }
    }
    handleZ(exp:string,Painter?: Paint){
        let geometry = (new THREE.ParametricGeometry( genXyz , 250, 100)) ;
        this.draw( Painter, geometry );
        function genXyz(u:number,v:number, target:THREE.Vector3){
            u = (u - 0.5) * 2;
            v = (v - 0.5) * 2;

            let r = 500;
            let x = r*u;
            let y = r*v;
            let z = eval( exp );

            target.set(y, z, x);
        }
    }

    checkValidate(exp:string){
        // 将所有大括号，中括号用小括号替换
        exp = exp.replace(/\[/g,'(');
        exp = exp.replace(/\]/g,')');
        exp = exp.replace(/\{/g,'(');
        exp = exp.replace(/\}/g,')');

        // xyz全替换成大小写；
        exp.replace(/X/g,'x');
        exp.replace(/Y/g,'y');
        exp.replace(/Z/g,'z');     
        return exp;
    }

    draw(Painter,geometry?:THREE.ParametricGeometry){

        geometry =  geometry ? geometry : (new THREE.ParametricGeometry( BasicShapes.genCube , 125, 125)) ;


        let texture = new THREE.TextureLoader().load( "assets/source/images/lanqiu.gif" );

        texture.center = new THREE.Vector2( 0.5, 0.5 );
        texture.needsUpdate = true;
        texture.rotation = -1.5;
        let material = new THREE.MeshNormalMaterial({ 
            color: 0xffffff ,
            side:THREE.DoubleSide,
            opacity:0.5,
            // map: texture
        });
 
        // material.wireframe  = true;
        material.needsUpdate = true;

        let basicMesh:THREE.Mesh = new THREE.Mesh( geometry, material );
        basicMesh.name = "function";
        Painter.scene.add( basicMesh );
        Painter.renderer.render( Painter.scene, Painter.camera );
        function animate(){
            texture.needsUpdate = true;
            material.needsUpdate = true;
            basicMesh.rotation.y -= 0.01;               
        }
        animate.needClear = true;
        // Painter.animaStack.push( animate );
    }


}

export default DrawFunctions;