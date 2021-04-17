import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService
      .getUserClaims(Number(localStorage.getItem('userId')))
      .subscribe((res) => {
        res.data?.forEach((claim) => {
          if (claim.operationClaimName == 'admin') {
            return true;
          } else {
            this.router.navigate(['cars']);
            this.toastr.warning('Bu sayfa için yetkiniz Yok');
            return false;
          }
        });
      });
    return true;
  }
}
