
export class Formater {

  constructor() { }

  public formatValue(value: any, column: any): string {
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } else if (column.type === 'currency') {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: column.format }).format(value);
    } else if (column.type === 'cnpj') {
      return this.formatCnpj(value);
    } else if (column.type === 'cpf') {
      return this.formatCpf(value);
    } else {
      return value;
    }
  }

  private formatCnpj(value: string): string {
    if (!value) return '';

    const cnpj = value.replace(/\D/g, '');
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
  }

  private formatCpf(value: string): string {
    if (!value) return '';

    const cpf = value.replace(/\D/g, '');
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;
  }
}
