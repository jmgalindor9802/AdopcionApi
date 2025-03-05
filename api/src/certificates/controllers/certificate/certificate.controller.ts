import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CertificadoService } from './../../services/certificate/certificate.service';
import { RegistrarCertificadoDto } from 'certificates/dtos/certificado.dto';

@ApiTags('Certificados')
@Controller('estudiante/certificado')
export class CertificadoController {
  constructor(private readonly certificadoService: CertificadoService) {}

  
  @Get('id/:id/:pk_grupo') 
  @ApiOperation({ summary: 'Verificar la existencia de un certificado' })
  @ApiParam({ name: 'id', type: 'string', description: 'Documento de identidad del estudiante' })
  @ApiParam({ name: 'pk_grupo', type: 'string', description: 'Identificador del grupo' }) 
  @ApiResponse({ 
    status: 200, 
    description: 'Certificado encontrado o arreglo vacío si no existe', 
    schema: {
      example: [
        { PK_CERTIFICADO: 470, FECHA: "2017-04-10T00:00:00.000Z" }
      ]
    } 
  })
  async verificarIdCertificado(
    @Param('id') id: string,
    @Param('pk_grupo') pk_grupo: string, 
  ) {
    const pkGrupoParsed = parseInt(pk_grupo.trim(), 10);

    if (isNaN(pkGrupoParsed)) {
      throw new BadRequestException(`El parámetro pk_grupo (${pk_grupo}) no es un número válido.`);
    }

    const certificado = await this.certificadoService.verificarIdCertificado(id, pkGrupoParsed);

    return certificado.length > 0 ? certificado : [];
  }


  @Get(':id/:pk_grupo') 
  @ApiOperation({ summary: 'Obtener los datos completos de un certificado' })
  @ApiParam({ name: 'id', type: 'string', example: '126784449', description: 'Documento de identidad del estudiante' })
  @ApiParam({ name: 'pk_grupo', type: 'string', example: '1', description: 'Identificador del grupo en la tabla Certificado' }) 
  @ApiResponse({
    status: 200,
    description: 'Certificado encontrado',
    schema: {
      type: 'object',
      properties: {
        estudiante_tipo_doc: { type: 'string', nullable: true, example: null },
        estudiante_doc_identidad: { type: 'string', example: '1020745698' },
        estudiante_nombre: { type: 'string', example: 'Javier Andrés' },
        estudiante_apellido: { type: 'string', example: 'Nossa Calderón' },
        clase_estado_certificado: { type: 'boolean', example: true },
        clase_pais_orden_venta: { type: 'string', example: 'Colombia' },
        curso_intensidad: { type: 'number', example: 24 },
        curso_nombre: { type: 'string', example: 'Developing Web Applications Using the ArcGIS API for JavaScript' },
        ubicacion_nombre: { type: 'string', example: 'Bogotá' },
        grupo_id: { type: 'number', example: 37 },
        grupo_tipo: { type: 'string', example: 'Presencial' },
        grupo_fecha_inicio: { type: 'string', format: 'date-time', example: '2017-04-10T00:00:00.000Z' },
        grupo_fecha_fin: { type: 'string', format: 'date-time', example: '2017-04-12T00:00:00.000Z' },
        instructor_nombre: { type: 'string', example: 'Juan Manuel' },
        instructor_doc_identidad: { type: 'string', example: '1053824131' },
        instructor_apellido: { type: 'string', example: 'Angel Cuartas' },
        instructor_titulo: { type: 'string', example: 'Esp.' },
        ubicacion_pais: { type: 'string', example: 'Colombia' },
      },
    },
  })
 
  async verificarCertificado(@Param('id') id: string, @Param('pk_grupo') pk_grupo: string) {
    const pkGrupoLimpio = parseInt(pk_grupo.trim(), 10);

    if (isNaN(pkGrupoLimpio)) {
      throw new BadRequestException('Parámetro pk_grupo inválido');
    }

    const certificado = await this.certificadoService.verificarCertificado(id, pkGrupoLimpio);

    if (!certificado || certificado.length === 0) {
      throw new NotFoundException('Certificado no encontrado');
    }

    return certificado;
  }

   /**
   * Registra un certificado verificando que el estudiante y grupo existen
   */
   @Post()
   @ApiOperation({ summary: 'Registrar certificado' })
   @ApiResponse({ status: 201, description: 'Certificado registrado exitosamente', schema: { example: true } })
   @ApiResponse({ 
     status: 400, 
     description: 'Error en la solicitud', 
     schema: { 
       example: { statusCode: 400, error: 'Bad Request', message: 'El estudiante con documento 126784449 no existe' } 
     }
   })
   async registrarCertificado(@Body() datos: RegistrarCertificadoDto) {
    try {
      const { doc_estudiante, fk_grupo, fecha } = datos; // Extraer valores del DTO
  
      await this.certificadoService.registrarCertificado(doc_estudiante, fk_grupo, new Date(fecha)); // ✅ Ahora se pasan los 3 argumentos correctamente
  
      return true; // Devuelve true si todo está bien (igual que en Hapi.js)
    } catch (error) {
      throw new BadRequestException(error.message); // Devuelve error en el mismo formato que Hapi.js
    }
   }
   
  
}
