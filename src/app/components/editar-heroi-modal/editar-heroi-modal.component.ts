import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeroiService } from 'src/app/services/heroi/heroi.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { Heroi } from 'src/app/interfaces/Heroi';
import { CommonModule } from '@angular/common';
import { SuperPoderes } from 'src/app/interfaces/SuperPoderes';
import { SuperpoderService } from 'src/app/services/superpoder/superpoder.service';

@Component({
  selector: 'app-editar-heroi-modal',
  templateUrl: './editar-heroi-modal.component.html',
  styleUrls: ['./editar-heroi-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class EditarHeroiModalComponent implements OnInit {
  @Input() heroi: any;
  superPoderes: SuperPoderes[] = [];

  heroiForm: FormGroup;

  constructor(
    private heroiService: HeroiService,
    private formBuilder: FormBuilder,
    private modalControler: ModalController,
    private superPoderService: SuperpoderService
  ) {
    this.heroiForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      nomeHeroi: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: [null, [Validators.required]],
      altura: [0, [Validators.required]],
      peso: [0, [Validators.required]],
      superPoderIds: [[], [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.heroi) {
      this.heroiForm.patchValue({
        nome: this.heroi.nome,
        nomeHeroi: this.heroi.nomeHeroi,
        dataNascimento: this.heroi.dataNascimento,
        altura: this.heroi.altura,
        peso: this.heroi.peso,
        superPoderIds:
          this.heroi.superPoderes?.map((sp: SuperPoderes) => sp.id) || [],
      });
    }

    this.loadSuperPoderes();
  }

  loadSuperPoderes() {
    this.superPoderService.listarSuperpoderes().subscribe((superPoderes) => {
      this.superPoderes = superPoderes;
    });
  }

  fechaModal(save = false) {
    if (save && this.heroiForm.valid) {
      this.modalControler.dismiss(this.heroiForm.value);
    } else {
      this.modalControler.dismiss();
    }
  }

  salvarEdicaoHeroi(heroi: Heroi) {
    if (this.heroiForm.valid) {
      const heroiData: Heroi = {
        ...this.heroi,
        ...this.heroiForm.value,
      };

      this.heroiService.atualizarHeroi(heroi.id, heroiData).subscribe(
        (updateHeroi) => {
          this.modalControler.dismiss(updateHeroi);
          alert('Herói atualizado com sucesso.');
        },
        (error) => {
          alert('Erro ao editar o herói.');
        }
      );
    } else {
      alert('Dados inválidos');
    }
  }
}
