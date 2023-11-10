export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
}

export interface IUserCount {
  totalRecords: number;
}

export interface IUserInformation {
  firstName: string;
  lastName: string;
  cedula: string;
  age: number;
  email: string;
  cellphone: string;
  thelephone: string;
  city: string;
  country: string;
  justification: string;
}

export interface IMedicalDiagnostic {
  VHIdiagnosis: string;
  CancerDiagnosis: string;
  kidneyDiagnosis: string;
  malnutritionDiagnosis: string;
  dose: string;
  frequencyadministration: string;
  duration: string;
  amount: string;
}

export interface IPrescriptionInformation {
  Prescription: string;
  identification: string;
  prescriptionDate: string;
  Affiliate: string;
  IPS: string;
  enablingCode: string;
  principalDX: string;
  orphanDisease: string;
  medicationType: string;
  stateBoard: string;
  refCounterReference: string;
  activeprinciple: string;
  Presentation: string;
  recomIndication: string;
  justification: string;
}
