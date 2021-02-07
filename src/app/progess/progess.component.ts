import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-progess",
  templateUrl: "./progess.component.html",
  styleUrls: ["./progess.component.scss"],
})
export class ProgressComponent implements OnInit {
  @Input() progress = 0;
  constructor() {}

  ngOnInit(): void {}
}
