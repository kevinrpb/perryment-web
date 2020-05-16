import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

  $showDetail: BehaviorSubject<boolean>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.$showDetail = new BehaviorSubject<boolean>(false);

    const outlets = _route.parent.children.filter(r => r.outlet === 'section')

    // Navigate to list if no aux outlet is provided
    if (outlets.length < 1)
      this._router.navigate([{ outlets: { section: 't-list' } }], { relativeTo: this._route });
    else if (outlets[0].routeConfig.path === 't-detail')
      outlets[0].paramMap.pipe(
        switchMap(params =>
          params['id'] ? of(true) : of(
            this._router.navigate([{ outlets: { section: 't-list' } }], { relativeTo: this._route }))
        )
      )
  }

  ngOnInit(): void {
  }

}
