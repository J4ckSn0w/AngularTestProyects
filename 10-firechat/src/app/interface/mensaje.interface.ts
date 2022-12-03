import { map } from 'rxjs/operators';

export interface Mensaje {
    nombre: string;
    mensaje: string;
    fecha?: number;
    uid?: string;
}