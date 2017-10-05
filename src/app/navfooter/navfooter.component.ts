import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navfooter',
  templateUrl: './navfooter.component.html',
  styleUrls: ['./navfooter.component.css']
})
export class NavfooterComponent implements OnInit {

  @Output() repeatOrder = new EventEmitter();
  @Output() editOrder = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmitRepeat() {
    this.repeatOrder.emit();
  }

  onSubmitEdit() {
    this.editOrder.emit();
  }

}
