import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from '../service/login/rol.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {

    constructor(private rolService: RolService, private router: Router) {/* Void constructor */ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    // Lógica para verificar el rol, utiliza el servicio o la lógica adecuada
    const primerRol = this.rolService.getRol();

    if (primerRol === 'Admin') {
      return true;
    } else {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tienes permisos para acceder a esta página.",
        footer: '<a href="#">Por que ocurre este problema?</a>'
      });

      this.router.navigate(['/']);

      return false;

    }

  }

}
