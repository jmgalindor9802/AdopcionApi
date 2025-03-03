/**
 * Filtro global de excepciones para unificar respuestas de error, evitar exposición de información sensible 
 * y prevenir que errores inesperados detengan el servidor. Captura todas las excepciones, asegurando que la API 
 * devuelva respuestas consistentes y manejables. También permite registrar errores para monitoreo y debugging.
 */


import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Error interno del servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();
      message = typeof responseMessage === 'string' ? responseMessage : (responseMessage as any).message;
    } else if (exception instanceof Error) {
      console.error('Error inesperado:', exception.message);
      message = exception.message; // Mostrar el mensaje real del error
    } else {
      console.error('Error desconocido:', exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
