import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerUseCase } from '@app/use-cases/producers/create-producer.usecase';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { CreateProducerRequestDto } from '@app/use-cases/producers/dto/request/create-request.dto';
import { BadRequestException } from '@nestjs/common';

// Importação correta da função que precisa ser mockada
import * as documentValidator from '@shared/helpers/is-valid-document';

// Mock da função `isValidDocumentToProducer`
jest.mock('@shared/helpers/is-valid-document', () => ({
  isValidDocument: jest.fn(),
}));

describe('CreateProducerUseCase', () => {
  let useCase: CreateProducerUseCase;
  let producerRepository: jest.Mocked<IProducerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerUseCase,
        {
          provide: IProducerRepository,
          useValue: {
            findProducerByDocument: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateProducerUseCase>(CreateProducerUseCase);
    producerRepository = module.get<IProducerRepository>(IProducerRepository) as jest.Mocked<IProducerRepository>;
    jest.clearAllMocks();
  });

  it('should throw an error if document is not provided', async () => {
    const payload: CreateProducerRequestDto = { document: '', name: 'name' };

    await expect(useCase.execute(payload)).rejects.toThrow('Document is required');
  });

  it('should throw a BadRequestException if document is not valid', async () => {
    const payload: CreateProducerRequestDto = { document: 'invalid-document', name: 'name' };
    
    jest.spyOn(documentValidator, 'isValidDocument').mockReturnValue(false);
    
    await expect(useCase.execute(payload)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error if producer already exists', async () => {
    const payload: CreateProducerRequestDto = { document: 'valid-document', name: 'valid-name' };

    jest.spyOn(documentValidator, 'isValidDocument').mockReturnValue(true);
    
    producerRepository.findProducerByDocument.mockResolvedValue({});

    await expect(useCase.execute(payload)).rejects.toThrow('Producer already exists');
  });

  it('should create a producer if document is valid and producer does not exist', async () => {
    const payload: CreateProducerRequestDto = { document: 'valid-document', name: 'valid-name' };

    jest.spyOn(documentValidator, 'isValidDocument').mockReturnValue(true);
    producerRepository.findProducerByDocument.mockResolvedValue(null);
    producerRepository.create.mockResolvedValue({ id: '1', ...payload });

    const result = await useCase.execute(payload);

    expect(result).toEqual({ id: '1', ...payload });
    expect(producerRepository.create).toHaveBeenCalledWith(payload);
  });
});
