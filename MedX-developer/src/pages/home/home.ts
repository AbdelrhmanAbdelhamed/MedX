import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { StatisticsPage } from '../statistics/statistics';
import { HistoryPage } from '../history/history';
import { Query } from './query';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private query: string;
  private queryCost: number;

  public queries: Query[] = new Array();
  private statisticsPage: any;
  private historyPage: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.statisticsPage = StatisticsPage;
    this.historyPage = HistoryPage;
  }

  logForm() {

    HistoryPage.queries.push(new Query(this.query, this.queryCost));
    this.navCtrl.push(this.statisticsPage);

    this.query = '';


  }


  showConfirm() {

    if (this.query === undefined || this.query.length === 0) {
      return;
    }
    else if (this.query.length < 20) {
      this.queryCost = 20;
    } else if (this.query.length > 20) {
      this.queryCost = 50;
    }

    let confirm = this.alertCtrl.create({
      title: `Are you sure you want to execute this query?`,
      message: `This service will cost you <span calss="costText">${this.queryCost} LE</span>`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.logForm();
          }
        },
        {
          text: 'Cancel',
          handler: () => {}
        }
      ]
    });
    confirm.present();
  }

}
