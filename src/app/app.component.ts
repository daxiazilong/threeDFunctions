import { Component,ViewChild } from '@angular/core';
import paint from '../paint';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public Expression:string = '';
  public Painter: paint

  @ViewChild('canvasFrame') canvasContainer: any;


  ngAfterViewInit(){
    this.Painter = new paint( this.canvasContainer.nativeElement );
  }

  handleClick(e){
    let Expression = this.Expression.trim();
    if( Expression !== '' ){
      cancelAnimationFrame(this.Painter.animateId);
      this.Painter.clear();
      
      // 生成新图
      this.Painter.drawFunction.computeShape(Expression,this.Painter);
      // 清掉动画回调
      this.Painter.animaStack.forEach( (animate,index) => {
        if( animate['needClear'] ){
          this.Painter.animaStack.splice(index,1)
        }
      })

      this.Painter.animation();
      
    }
    
  }
}
