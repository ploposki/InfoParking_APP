import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import EscPosEncoder from 'esc-pos-encoder-ionic';
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  device:    any = null;
  auth:      any = null;
  login:     any = {};
  inputData: any = {};

  constructor(
    public  http:      Http,
    public  navCtrl:   NavController,
    private printer:   PrinterProvider,
    private alertCtrl: AlertController,
    private loadCtrl:  LoadingController
  ) {
    this.printAlert();
  }

  loginSubmit(data) {
    var link = 'http://45.15.24.171:8080/api/user/login';
    var json = {payload: {login: data.login, password: data.password}};

    this.http.post(link, json).subscribe(x => {
      const y = JSON.parse(x["_body"])

      if(!y.message){
        this.auth = y;

        this.printPrepare();
      }
      else {
        this.auth = null;

        this.alertCtrl.create({
          title: 'Usuário ou senha inválidos.',
          buttons: [{
            text: 'Ok'
          }, ],
        }).present();
      }
    });
  }

  printSubmit(device, data) {
    let load = this.loadCtrl.create({
      content: 'Imprimindo...',
    });
    load.present();

    this.printer.connectBluetooth(device).subscribe(
      () => {
        this.printer.printData(data).then(() => {
            this.alertCtrl.create({
              title: 'Sucesso na impressão.',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                  this.printer.disconnectBluetooth();
                },
              }, ],
            }).present();
          }).catch(() => {

            this.alertCtrl.create({
              title: 'Erro na impressão.',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                },
              }, ],
            }).present();
          });
      }, () => {

        this.alertCtrl.create({
          title: 'Erro de conexão na impressora.',
          buttons: [{
            text: 'Ok',
            handler: () => {
              load.dismiss();
            },
          }, ],
        }).present();
      },
    );
  }

  printPrepare() {
    const encoder = new EscPosEncoder();
    const result = encoder.initialize();

    result
      .codepage('cp936')
      .align('center')
      .raw(commands.TEXT_FORMAT.TXT_4SQUARE)
      .line(this.auth.user.name)
      .raw(commands.TEXT_FORMAT.TXT_NORMAL)
      .text(commands.HORIZONTAL_LINE.HR4_58MM)
      .text('bla bla bla')
      .newline()
      .raw(commands.TEXT_FORMAT.TXT_4SQUARE)
      .newline()
      .newline()
      .newline()

    this.printSubmit(this.device, result.encode());
  }

  printAlert() {
    this.device  = null;

    let alert = this.alertCtrl.create({
      title: 'Selecione uma impressora.',
      buttons: [{
          text: 'Ok',
          handler: (device) => {
            if (!device) {
              this.device = null;
            }
            this.device = device;
          },
        },
      ],
    });

    this.printer.enableBluetooth().then(() => {
        this.printer.searchBluetooth().then((devices) => {
            devices.forEach((device) => {

              alert.addInput({
                name: 'printer',
                value: device.address,
                label: device.name,
                type: 'radio',
              });
            });

            alert.present();
            alert.onDidDismiss(() => {
              if(!this.device) {
                this.printAlert();
              }
            })
          }).catch(() => {

            this.alertCtrl.create({
              title: 'Erro de conexão na impressora.',
              buttons: [{
                text: 'Ok'
              }, ],
            }).present();

            this.printAlert();
          });
      }).catch(() => {

        this.alertCtrl.create({
          title: 'Erro ao ativar o bluetooth.',
          buttons: [{
            text: 'Ok'
          }, ],
        }).present();

        this.printAlert();
      });
  }
}
