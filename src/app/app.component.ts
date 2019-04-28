import { Component,ViewChild } from '@angular/core';
import paint from '../paint';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('canvasFrame') canvasContainer: any;


  ngAfterViewInit(){
    console.log(this.canvasContainer)
    new paint( this.canvasContainer.nativeElement );
  }
}
