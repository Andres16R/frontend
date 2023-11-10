export interface IMenu {
  opcIdentificador: string;
  opcOpcIdentificador?: string |null;
  opcNombre: string;
  opcRuta?: string |null;
  children?: IMenu[];
}
