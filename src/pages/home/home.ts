import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { CosasLindasPage } from '../cosas-lindas/cosas-lindas';
import { CosasFeasPage } from '../cosas-feas/cosas-feas';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario:string
  constructor(public navCtrl: NavController,public navParams:NavParams,public app:App,private auth: AuthService) {
    this.usuario = this.armarUsuario();
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  public cosasLindas(){
    this.navCtrl.push(CosasLindasPage,{data:this.usuario});
  }
  public cosasFeas(){
    this.navCtrl.push(CosasFeasPage,{data:this.usuario});
  }
  public armarUsuario(){
    let usuario = this.navParams.get('data');
    let usuarioCortado = "";
    for (let i = 0; i < usuario.length; i++) {
      if (usuario[i] == "@") {
        break;
      }
      else{
        usuarioCortado = usuarioCortado + usuario[i];
      }
    }
    return usuarioCortado;
  }
}
