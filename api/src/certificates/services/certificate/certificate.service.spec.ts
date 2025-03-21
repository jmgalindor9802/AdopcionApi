import { Test, TestingModule } from '@nestjs/testing';
import { CertificadoService } from './certificate.service';

describe('CertificateService', () => {
  let service: CertificadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificadoService],
    }).compile();

    service = module.get<CertificadoService>(CertificadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
