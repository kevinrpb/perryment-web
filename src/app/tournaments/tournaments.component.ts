import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { switchMap, filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit, OnDestroy {

  $detailID: BehaviorSubject<string>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.$detailID = new BehaviorSubject<string>(null);

    this.setupBreadcrumb();
  }

  /*
   * This is a bit of a pain in the ass...
   * Because the detail
   */
  private setupBreadcrumb() {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(
        switchMap(async (event) : Promise<string> => {
          console.log(event);

          const outlets = this._route.parent.children.filter(r => r.outlet === 'section')

          // Navigate to list if no aux outlet is provided
          if (outlets.length < 1) {
            this.navigateToList();

            return of(null).toPromise();
          }

          // Get tid when in detail to show breadcrumb navigation
          if (outlets[0].routeConfig.path.includes('t-detail')) {
            const params = await outlets[0].params.pipe(first()).toPromise();
            const tid = params['tid'];

            if (!tid) {
              this.navigateToList();

              return of(null).toPromise();
            }

            return of(tid).toPromise();
          } else {
            return of(null).toPromise();
          }
        })
      ).subscribe(this.$detailID);
  }

  private navigateToList() {
    this._router.navigate(
      [{ outlets: { section: 't-list' } }],
      { relativeTo: this._route }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$detailID.unsubscribe();
  }

}
