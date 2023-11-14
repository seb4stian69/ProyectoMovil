import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private rolActual: string = '';

  setRol(rol: string) {
    this.rolActual = rol;
  }

  getRol() {
    return this.rolActual;
  }
}