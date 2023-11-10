export const environment = {
  production: false,
  //equivale a 4 horas, el tiempo de la cookie debe ser menor a este tiempo por ejemplo 3 horas y 30 minutos por el refreshtoken
  tiempoInactividad: 14400000,
  namecookie: 'token',
  principalSiteUrl: 'http://localhost:8080',
  apiURLUser: 'http://127.0.0.1:3000',
  apiURLMenu: 'http://localhost:9092',
};
