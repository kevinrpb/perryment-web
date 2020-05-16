import { Component, OnInit } from '@angular/core';

const backgrounds: String[] = [
  'https://images.unsplash.com/photo-1558008258-7ff8888b42b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bgStyle = {};

  constructor() { }

  ngOnInit(): void {
    // Get random background
    const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    this.bgStyle = {
      background: `url(${bg}) no-repeat center center fixed`,
      'background-size': 'cover'
    }
  }

  goToAbout($event: Event, id: string) {
    $event.preventDefault();

    const $about = document.getElementById(id);

    $about.scrollIntoView({ behavior: "smooth" });
  }

}
