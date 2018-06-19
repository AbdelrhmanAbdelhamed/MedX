import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonicPage, MenuController, LoadingController, Loading, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientListPage } from '../patient-list/patient-list';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  practitionerForm: FormGroup;
  practitionerFormValueChangeSub: any;

  organizationForm: FormGroup;
  organizationFormValueChangeSub: any;


  @ViewChild('registerSlider') registerSlider: Slides;
  registerSliderBegin: boolean = true;
  registerSliderEnd: boolean = false;

  isReadyToRegister: boolean;
  loading: Loading;
  createSuccess = false;

  roles: any = [{
    title: 'Practitioner'
  }, {
    title: 'Organization'
  }];

  selectedRole: any;

  constructor(
    private nav: NavController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public menu: MenuController
  ) { }

  setPractitionerForm() {
    this.practitionerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      telecom: this.formBuilder.group({
        phone: ['', Validators.required],
        email: ['', Validators.required]
      }),
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      // photo: ['', Validators.required],
      qualification: this.formBuilder.group({
        title: ['', Validators.required],
        issuer: ['', Validators.required],
        period: this.formBuilder.group({
          from: ['', Validators.required],
          to: ['', Validators.required]
        }),
      }),
      communication: this.formBuilder.group({
        language: ['', Validators.required]
      })
    });

    this.practitionerFormValueChangeSub = this.practitionerForm.valueChanges.subscribe(() => {
      this.isReadyToRegister = this.practitionerForm.valid;
    });
  }

  setOrganizationForm() {
    this.organizationForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      telecom: this.formBuilder.group({
        phone: ['', Validators.required],
        email: ['', Validators.required]
      }),
      address: ['', [Validators.required]],
      services: ['', Validators.required]
    });

    this.organizationFormValueChangeSub = this.organizationForm.valueChanges.subscribe(() => {
      this.isReadyToRegister = this.organizationForm.valid;
    });
  }

  onCardSlideClicked(selectedRole) {
    this.selectedRole = selectedRole;
    if (this.selectedRole == this.roles[0]) {
      this.setPractitionerForm();

      if (this.organizationForm || this.organizationFormValueChangeSub) {
        this.organizationFormValueChangeSub.unsubscribe();
        this.organizationForm = null;
      }
    }
    else if (this.selectedRole == this.roles[1]) {
      this.setOrganizationForm();

      if (this.practitionerForm || this.practitionerFormValueChangeSub) {
        this.practitionerFormValueChangeSub.unsubscribe();
        this.practitionerForm = null;
      }
    }
    this.onNextSlide();
  }


  onSlideChange() {
    this.registerSliderBegin = this.registerSlider.isBeginning();
    this.registerSliderEnd = this.registerSlider.isEnd();
  }

  onPrevSlide() {
    this.registerSlider.lockSwipes(false);
    this.registerSlider.slidePrev();
    this.registerSlider.lockSwipes(true);
  }

  onNextSlide() {
    this.registerSlider.lockSwipes(false);
    this.registerSlider.slideNext();
    this.registerSlider.lockSwipes(true);
  }

  public onRegister() {
    this.nav.setRoot(PatientListPage, { data: this.selectedRole == this.roles[0] ? this.practitionerForm.value : this.organizationForm.value });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }
  // https://github.com/ionic-team/ionic/issues/8164
  ionViewDidEnter() {
    setTimeout(() => {
      if (this.registerSlider) {
        this.registerSlider.update();
        this.registerSlider.lockSwipes(true);
      }
    }, 300);
  }

}