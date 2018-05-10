import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera , CameraOptions} from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { ImageProvider } from '../../providers/image/image';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { usuario } from '../../clases/usuario';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the CosasLindasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-cosas-feas',
  templateUrl: 'cosas-feas.html',
})
export class CosasFeasPage {
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  private images = [];
  imagesLenght:number;
  usuariosUrls = [];
  usuario:string
  coleccionTipadaFirebase:AngularFirestoreCollection<usuario>;
  ListadoDeUsuariosObservable:Observable<usuario[]>;
  ListaDeUsuarios:Array<usuario>;
  constructor(public navCtrl: NavController,public toast:Toast,private objFirebase: AngularFirestore,private af: AngularFireAuth,private camera: Camera, public navParams: NavParams,private imageSrv: ImageProvider) {
    this.usuario = this.navParams.get('data');
    this.ListaDeUsuarios = new Array();
  }
  ionViewDidEnter(){
    this.coleccionTipadaFirebase= this.objFirebase.collection<usuario>('RelevamientoVisualCf'); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeUsuariosObservable=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeUsuariosObservable.subscribe(x => {
        console.info("conexión correcta con Firebase",x);
        this.ListaDeUsuarios = new Array();
        x.forEach(usu => {
          this.ListaDeUsuarios.push(usu);
        });
        this.downloadImageUrls();
    })
    
     console.log("fin de ionViewDidEnter");
    }//fin ionViewDidEnter

    public revisarBase(user:string):number{
      let crearDocumento:boolean = true;
      let aux:number = 0;
      console.info("this.listaDeUsuarios = "+this.ListaDeUsuarios);
      this.ListaDeUsuarios.forEach(usu => {
        if (usu.usuario == user) {
          crearDocumento = false;
          aux = Number(usu.cantImg);
        }
      });
      if (crearDocumento) {
        this.crearDocumentoUsuario(user);
      }
      return aux + 1;
    }
    setImagesLenght(user:string){
      this.ListaDeUsuarios.forEach(usu => {
        if (usu.usuario == user) {
          console.log("usu.cantImg = "+usu.cantImg);
          this.imagesLenght = Number(usu.cantImg);
        }
        else{
          console.log("usu.usuario = "+usu.usuario);
        }
      });
    }
    public crearDocumentoUsuario(user){
      let nuevoUsuario:usuario;
      nuevoUsuario= new usuario(user,"0");
      let objetoJsonGenerico= nuevoUsuario.dameJSON();
      console.log ("se guardara: "+objetoJsonGenerico );
      this.objFirebase.collection<usuario>('RelevamientoVisualCf').doc(user).set(objetoJsonGenerico).then(
       Retorno=>
       {
         //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
         console.log(`id= ${user} ,  usuario= ${user}`);
       }
       ).catch( error=>{
         console.error(error);
       });
    }


  takePicture() {
    this.camera.getPicture(this.cameraOptions)
      .then(data => {
        let base64Image = 'data:image/jpeg;base64,' + data;
        let imgName = this.dameUnNombreImg();
        if (imgName != "4") {
          this.imageSrv.uploadImage(base64Image, this.usuario+"cf",imgName);
          this.downloadImageUrls();
          this.updateUsuario();
        }
        else{
          this.showToast("Usted alcanzo el limite de imagenes (3)")
        }

      })
  }
  showToast(msg){
    this.toast.show(msg, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
  downloadImageUrls() {
    this.usuariosUrls = [];
    this.ListaDeUsuarios.forEach(usu => {
      let promiseList = [];
      this.setImagesLenght(usu.usuario);
      for (let i = 0; i < this.imagesLenght ; i++) {
        let aux = String(i+1);
        console.log ("aux = "+aux);
        let promise = this.imageSrv.getImage(usu.usuario+"cf", ""+aux+".jpg");
        promiseList.push(promise);
      }
      Promise.all(promiseList)
        .then(urls => {
          console.log(urls);
          this.usuariosUrls.push({
            usuario:usu.usuario,
            imageUrls: urls
          })
        });
    });

  }
  dameUnNombreImg():string{
    return ""+this.revisarBase(this.usuario);
  }
  updateUsuario(){
    this.coleccionTipadaFirebase.doc(this.usuario).update({ 
      usuario: this.usuario,
      cantImg: String(this.imagesLenght + 1) });
  }
}
