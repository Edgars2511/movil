export interface TopLevel {
  id_rut?: number;
  nombre_rutina?: string;
  progreso?: string;
  objetivos?: string;
}
export interface User {
  id_usuario: string;
  nombre?: string;
  contrasena?: string;
  num_tel?: string;
  correo: string;
}