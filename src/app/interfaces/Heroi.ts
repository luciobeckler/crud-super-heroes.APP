import { SuperPoderes } from './SuperPoderes';

export interface Heroi {
  id: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: Date;
  altura: number;
  peso: number;

  superPoderes: SuperPoderes[];
}
