import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { FindByDocumentUseCase } from '@app/use-cases/producers/find-by-document.usecase';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import * as documentValidator from '@shared/helpers/is-valid-document';


jest.mock('@shared/helpers/is-valid-document', () => ({
    isValidDocument: jest.fn(),
  }));

describe('FindByDocumentUseCase', () => {
    let findByDocumentUseCase: FindByDocumentUseCase;
    let producerRepository: IProducerRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindByDocumentUseCase,
                {
                    provide: IProducerRepository,
                    useValue: {
                        findProducerByDocument: jest.fn(),
                    },
                },
            ],
        }).compile();

        findByDocumentUseCase = module.get<FindByDocumentUseCase>(FindByDocumentUseCase);
        producerRepository = module.get<IProducerRepository>(IProducerRepository);
    });

    it('should be defined', () => {
        expect(findByDocumentUseCase).toBeDefined();
    });

    it('should throw BadRequestException if document is invalid', async () => {
        jest.spyOn(documentValidator, 'isValidDocument').mockReturnValue(false);

        await expect(findByDocumentUseCase.execute('invalid-document')).rejects.toThrow(
            new BadRequestException('Document invalid-document is not valid')
        );
    });

    it('should call findProducerByDocument with correct document', async () => {
        jest.spyOn(documentValidator, 'isValidDocument').mockReturnValue(true);
        const document = 'valid-document';
        const producer = { id: 1, document };

        (producerRepository.findProducerByDocument as jest.Mock).mockResolvedValue(producer);

        const result = await findByDocumentUseCase.execute(document);

        expect(producerRepository.findProducerByDocument).toHaveBeenCalledWith(document);
        expect(result).toEqual(producer);
    });

    it('should return null if producer is not found', async () => {
        jest.spyOn(documentValidator, 'isValidDocument').mockReturnValue(true);
        const document = 'valid-document';

        (producerRepository.findProducerByDocument as jest.Mock).mockResolvedValue(null);

        const result = await findByDocumentUseCase.execute(document);

        expect(producerRepository.findProducerByDocument).toHaveBeenCalledWith(document);
        expect(result).toBeNull();
    });
});