export interface Tipo {
  revisao: string;
  revisao_anterior: string;
  nome: string;
  idEndereco: string;
  banco_associado: string;
  dataAlteracao: Date;
}

export interface Detalhe{
    oldRev: Tipo;
    newRev: Tipo;
}
