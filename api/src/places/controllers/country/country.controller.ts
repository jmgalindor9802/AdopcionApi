import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryService } from './../../services/country/country.service';

@ApiTags('Paises')
@Controller('pais')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  /**
   * Obtiene todos los países registrados en la base de datos.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener lista de países registrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de países obtenida exitosamente.',
    schema: {
      example: [
        { pk_pais: 1, nombre: 'Colombia' },
        { pk_pais: 2, nombre: 'México' },
      ],
    },
  })
  async obtenerPaises() {
    return await this.countryService.obtenerPaises();
  }
}