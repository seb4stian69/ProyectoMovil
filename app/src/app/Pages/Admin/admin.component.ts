import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/service/admin/usuarios/usuarios.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RolesService } from 'src/app/service/admin/roles/roles.service';
import { CategoriasService } from 'src/app/service/admin/categorias/categorias.service';
import { CredencialesService } from 'src/app/service/admin/credenciales/credenciales.service';
import { DetallefacturaService } from 'src/app/service/admin/detallefactura/detallefactura.service';
import { FacturasService } from 'src/app/service/admin/facturas/facturas.service';
import { IngresosLogsService } from 'src/app/service/admin/ingresos-logs/ingresos-logs.service';
import { MetodopagoService } from 'src/app/service/admin/metodopago/metodopago.service';
import { ProductosService } from 'src/app/service/admin/productos/productos.service';
import { VideosArtesanoService } from 'src/app/service/admin/videos-artesano/videos-artesano.service';

interface GenericObject {
  [key: string]: string | number | null;
}

interface Response {
  [key: string]: GenericObject;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  /* + ------------------------------------------------------------- Atributos ------------------------------------------------------------- + */

  data!: Response;
  tables: SafeHtml[] = [];
  selectedOption: string = 'Categorias';

  /* + ------------------------------------------------------------- Constructor ------------------------------------------------------------- + */

  constructor(
    private $userService: UsuariosService,
    private $roleService: RolesService,
    private $categoriasService: CategoriasService,
    private $credencialesService: CredencialesService,
    private $detalleFacturaService: DetallefacturaService,
    private $ingresosLogsService: IngresosLogsService,
    private $facturaService: FacturasService,
    private $metodopagoService: MetodopagoService,
    private $productosService: ProductosService,
    private $videoArtesanoService: VideosArtesanoService,
    private sanitizer: DomSanitizer
  ) { }

  /* + ------------------------------------------------------------- OnInit ------------------------------------------------------------- + */

  ngOnInit(): void {
    
    this.getCategorias();

    // Agregar un manejador de eventos al contenedor principal (puede ser el cuerpo del documento)
    document.body.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // Verificar si se hizo clic en un botón de actualización
      if (target.classList.contains('update-button')) {

        const index = target.dataset['index'];
        
        if (index !== undefined) {

          if (target.textContent == 'Enviar') {

            this.enableInputs(parseInt(index, 10));
            target.textContent = 'Actualizar';

          } else if(target.textContent == 'Crear'){

            this.createMethod(this.obtenerDatosElementos(index));

          } else {

            target.textContent = 'Enviar';
            console.log(this.obtenerDatosElementos(index))
            this.enableInputs(parseInt(index, 10));

          }

        }
      }
    });

  }

  /* + ------------------------------------------------------------- Modificadores ------------------------------------------------------------- + */

  obtenerDatosElementos(index:string):any{

    // Obtener los datos de los inputs y sus etiquetas del div actual
    const divElement = document.getElementById(`item-${index}`);

    if (divElement) {

      const inputElements = divElement.getElementsByTagName('input');
      const dataObject: { [key: string]: string } = {}; // Objeto para almacenar los datos

      for (let i = 0; i < inputElements.length; i++) {
        const inputValue = (inputElements[i] as HTMLInputElement).value;

        // Obtener la etiqueta 'strong' asociada al input
        const labelElement = inputElements[i].closest('p')?.querySelector('strong');
        const labelValue = labelElement?.textContent;
        const cleanedLabelValue = labelValue?.replace(':', '');

        // Almacenar en el objeto solo si labelValue no es nulo
        if (cleanedLabelValue !== null && cleanedLabelValue !== undefined) {
          dataObject[cleanedLabelValue] = inputValue;
        }
      }

      // Imprimir el objeto en la consola
      return dataObject;

    }
  
  }

  generateTable(): void {

    if (this.data) {
      
      let divGenerado = "";
      let indexG = 0;
      
      Object.keys(this.data).forEach((key, index) => {
        divGenerado = this.generateSingleDiv(this.data[key], index);
        this.tables.push(this.sanitizer.bypassSecurityTrustHtml(divGenerado));
        divGenerado = this.generateSingleDivVoid(this.data[key], index+1);
      });

      this.tables.push(this.sanitizer.bypassSecurityTrustHtml(divGenerado));

    }

  }

  enableInputs(index: number) {

    const divId = `item-${index}`;
    const divElement = document.getElementById(divId);
  
    if (divElement) {
      const inputs = Array.from(divElement.getElementsByTagName('input'));
      for (const input of inputs) {
        if(input.disabled == false){
          input.disabled = true;
        }else{
          input.disabled = false;
        }
      }
    }

  }
  
  generateSingleDiv(tableData: GenericObject, index: number): string {
    let divHTML = `<div id="item-${index}">`;
    
    const entries = Object.entries(tableData);
  
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      divHTML += `<p><strong id="strongwhite">${key}:</strong> <input disabled type="text" name="" id="" value="${value}"></p>`;
    }
  
    divHTML += `<button class="update-button" data-index="${index}">Actualizar</button>`;
    divHTML += `<button>Eliminar</button>`;
    
    divHTML += '</div>';
    return divHTML;
  }

  generateSingleDivVoid(tableData: GenericObject, index: number): string {

    let divHTML = `<div id="item-${index}">`;
  
    const entries = Object.entries(tableData);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      divHTML += `<p><strong id="strongwhite">${key}:</strong> <input type="text" name="" id=""></p>`;
    }
  
    divHTML += `<button class="update-button" data-index="${index}">Crear</button>`;
    divHTML += `<button>Limpiar</button>`;
  
    divHTML += '</div>';
    return divHTML;

  }
  
  onOptionChange(event: Event): void {

    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
    this.tables = [];
    
    if(this.selectedOption=="Categorias"){
      this.getCategorias();
    }
    
    if(this.selectedOption=="Credenciales"){
      this.getCredenciales();
    }
    
    if(this.selectedOption=="Detalle Factura"){
      this.getDetalleFactura();
    }
    
    if(this.selectedOption=="Facturas"){
      this.getFactura();
    }
    
    if(this.selectedOption=="Ingresos logs"){
      this.getIngresosLogs();
    }
    
    if(this.selectedOption=="Metodo Pago"){
      this.getMetodoPago();
    }
    
    if(this.selectedOption=="Productos"){
      this.getProductos();
    }

    if(this.selectedOption=="Roles"){
      this.getRoles();
    }

    if(this.selectedOption=="Usuarios"){
      this.getUsuarios();
    }

    if(this.selectedOption=="Videos artesanos"){
      this.getVideoArtesano();
    }

  }

  createMethod(body:any){
    
    this.tables = [];

    if(this.selectedOption=="Categorias"){
      this.postCategorias(body);
      location.reload()
    }
    
    if(this.selectedOption=="Credenciales"){
      this.getCredenciales();
    }
    
    if(this.selectedOption=="Detalle Factura"){
      this.getDetalleFactura();
    }
    
    if(this.selectedOption=="Facturas"){
      this.getFactura();
    }
    
    if(this.selectedOption=="Ingresos logs"){
      this.getIngresosLogs();
    }
    
    if(this.selectedOption=="Metodo Pago"){
      this.getMetodoPago();
    }
    
    if(this.selectedOption=="Productos"){
      this.getProductos();
    }

    if(this.selectedOption=="Roles"){
      this.getRoles();
    }

    if(this.selectedOption=="Usuarios"){
      this.getUsuarios();
    }

    if(this.selectedOption=="Videos artesanos"){
      this.getVideoArtesano();
    }

  }

  /* + ------------------------------------------------------------- CRUD - Categorias ------------------------------------------------------------- + */

  getCategorias(){
    this.$categoriasService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  postCategorias(body:any){
    this.$categoriasService.post(body).subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  putCategorias(id:any, body:any){
    this.$categoriasService.put(id, body).subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  deleteCategorias(id:any){
    this.$categoriasService.delete(id).subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  /* + ------------------------------------------------------------- CRUD - Credenciales ------------------------------------------------------------- + */

  getCredenciales(){
    this.$credencialesService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  /* + ------------------------------------------------------------- CRUD - Detalle factura ------------------------------------------------------------- + */

  getDetalleFactura(){
    this.$detalleFacturaService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  /* + ------------------------------------------------------------- CRUD - factura ------------------------------------------------------------- + */

  getFactura(){
    this.$facturaService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  /* + ------------------------------------------------------------- CRUD - Ingresos logs ------------------------------------------------------------- + */

  getIngresosLogs(){
    this.$ingresosLogsService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  /* + ------------------------------------------------------------- CRUD - Metodo Pago ------------------------------------------------------------- + */

  getMetodoPago(){
    this.$metodopagoService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  /* + ------------------------------------------------------------- CRUD - Productos ------------------------------------------------------------- + */

  getProductos(){
    this.$productosService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }  

  /* + ------------------------------------------------------------- CRUD - Roles ------------------------------------------------------------- + */

  getRoles(){
    this.$roleService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }

  /* + ------------------------------------------------------------- CRUD - Usuarios ------------------------------------------------------------- + */

  getUsuarios(){
    this.$userService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }

  /* + ------------------------------------------------------------- CRUD - Video Artesano ------------------------------------------------------------- + */

  getVideoArtesano(){
    this.$videoArtesanoService.get().subscribe((data: any) => {
      this.data = data;
      this.generateTable();
    });
  }

}
