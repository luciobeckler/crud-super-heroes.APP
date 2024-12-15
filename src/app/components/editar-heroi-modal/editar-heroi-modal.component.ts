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

@Component({
  selector: 'app-editar-heroi-modal',
  templateUrl: './editar-heroi-modal.component.html',
  styleUrls: ['./editar-heroi-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class EditarHeroiModalComponent implements OnInit {
  @Input() heroi: any;
  @Input() superPoderesHeroi: any[] = [];

  heroiForm: FormGroup;

  constructor(
    private heroiService: HeroiService,
    private formBuilder: FormBuilder,
    private modalControler: ModalController
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
    if (this.heroi) {
      this.heroiForm.patchValue(this.heroi);
      console.log(this.heroi);
      console.log(this.superPoderesHeroi);
    }
  }

  fechaModal(save = false) {
    if (save && this.heroiForm.valid) {
      this.modalControler.dismiss(this.heroiForm.value);
    } else {
      this.modalControler.dismiss();
    }
  }

  putLivro(heroi: Heroi) {
    if (this.heroiForm.valid) {
      var heroiData: Heroi = this.heroiForm.value;
      heroiData.id = heroi.id;

      this.heroiService.atualizarHeroi(heroi.id, heroiData).subscribe(
        (updatedLivro) => {
          this.modalControler.dismiss(updatedLivro);
          alert('Heroi ' + heroi.nomeHeroi + ' atualizado com sucesso.');
        },
        (error) => {
          alert('Erro ao editar o livro' + heroi.nomeHeroi);
        }
      );
    } else {
      alert('Dados inválidos');
    }
  }
}
