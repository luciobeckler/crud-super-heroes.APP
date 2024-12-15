import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { HeroiService } from 'src/app/services/heroi/heroi.service';
import { SuperpoderService } from 'src/app/services/superpoder/superpoder.service';
import { Heroi } from 'src/app/interfaces/Heroi';
import { SuperPoderes } from 'src/app/interfaces/SuperPoderes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, IonicModule],
})
export class HomeComponent implements OnInit {
  herois: Heroi[] = [];
  heroiForm: FormGroup;
  superPoderes: SuperPoderes[] = [];

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev: any, heroi: Heroi) {
    if (ev.detail.role == 'confirm') this.deleteHeroi(heroi.id);
  }
  constructor(
    private heroiService: HeroiService,
    private superPoderService: SuperpoderService,
    private formBuilder: FormBuilder
  ) {
    this.heroiForm = this.formBuilder.group({
      Nome: ['', [Validators.required, Validators.minLength(3)]],
      NomeHeroi: ['', [Validators.required, Validators.minLength(3)]],
      DataNascimento: [null, [Validators.required]],
      Altura: [0, [Validators.required]],
      Peso: [0, [Validators.required]],
      SuperPoderIds: [[], [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadHerois();
    this.loadSuperPoderes();
  }

  loadHerois() {
    this.heroiService.listarHerois().subscribe((herois) => {
      this.herois = herois;
    });
  }

  loadSuperPoderes() {
    this.superPoderService.listarSuperpoderes().subscribe((superPoderes) => {
      this.superPoderes = superPoderes;
    });
  }

  submitForm() {
    if (this.heroiForm.valid) {
      const payload = {
        nome: this.heroiForm.value.Nome,
        nomeHeroi: this.heroiForm.value.NomeHeroi,
        dataNascimento: this.heroiForm.value.DataNascimento,
        altura: this.heroiForm.value.Altura,
        peso: this.heroiForm.value.Peso,
        superPoderIds: [this.heroiForm.value.SuperPoderIds],
      };

      this.heroiService.criarHeroi(payload).subscribe((novoHeroi) => {
        this.herois.push(novoHeroi);
        this.resetForm();
      });
    }
  }

  deleteHeroi(id: number) {
    this.heroiService.excluirHeroi(id).subscribe(() => {
      this.herois = this.herois.filter((heroi) => heroi.id != id);
    });
  }

  updateHeroi() {}

  resetForm() {
    this.heroiForm.reset({
      Nome: '',
      NomeHeroi: '',
      DataNascimento: null,
      Altura: 0,
      Peso: 0,
      SuperPoderIds: [],
    });
  }
}