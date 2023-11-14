import { Component } from '@angular/core';
import { Request as RequestLoguin} from 'src/app/service/login/interface/request';
import { Response as ResponseLoguin} from 'src/app/service/login/interface/response';
import { LoginService } from 'src/app/service/login/login.service';
import { RolService } from 'src/app/service/login/rol.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nombreUsuario: string = '';
  contrasena: string = '';

  constructor(
    private $service:LoginService,
    private $rolService: RolService,
    private router: Router
  ) {/* Void constructor */ }

  login(){
    
    let sendData: RequestLoguin = {
      user: this.nombreUsuario,
      pass: this.contrasena
    }

    this.$service.login(sendData).subscribe((data: ResponseLoguin[][]) => {

      if (data && data.length > 0 && data[0] && data[0].length > 0) {
        
        const primerRol:any = data[0][0];
        this.$rolService.setRol(primerRol.rol);

        this.router.navigate(['/admin']);

      } 
      else {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas.",
          footer: '<a href="#">Por que ocurre este problema?</a>'
        });

      }

    });

  }

}
