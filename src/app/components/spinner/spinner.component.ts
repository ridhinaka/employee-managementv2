import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() disappearing = false;

  ngOnInit() {
    const loader = document.querySelector('.spinner') as HTMLElement;
    loader.style.display = 'flex';

    setInterval(() => {
      this.disappearing = true;
    }, 10000000);
  }

  ngOnDestroy() {
    // Clean up if needed
  }
}
