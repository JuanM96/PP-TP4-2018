export class usuario{
    usuario:string;
    cantImg:string;
    constructor(usuario:string,cantImg:string){
      this.usuario=usuario;
      this.cantImg = cantImg;
    }
    dameJSON(){
      return JSON.parse( JSON.stringify(this));
    }
  }