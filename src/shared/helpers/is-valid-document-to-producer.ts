import { cnpj, cpf } from 'cpf-cnpj-validator';

export function isValidDocumentToProducer(document: string): boolean {
  if (document.length === 11) {
    return cpf.isValid(document);
  } else if (document.length === 14) {
    return cnpj.isValid(document);
  }
  return false;
}
