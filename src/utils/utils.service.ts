import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  formatCPF(cpf: string) {
    return cpf.replace(/[^\d]/g, '');
  }

  validateCPF(cpf: string) {
    let sum: number;
    let remainder: number;
    sum = 0;

    cpf = this.formatCPF(cpf);

    if (cpf == '00000000000') return false;

    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(cpf.substring(9, 10))) return false;
    sum = 0;

    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    return false;
  }
}
