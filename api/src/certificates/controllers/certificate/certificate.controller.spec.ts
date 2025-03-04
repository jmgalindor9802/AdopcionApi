import { Test, TestingModule } from '@nestjs/testing';
import { CertificadoController } from './certificate.controller';

describe('CertificateController', () => {
  let controller: CertificadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificadoController],
    }).compile();

    controller = module.get<CertificadoController>(CertificadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
