import { ICropRepository } from "@domain/interfaces/crop.repository.interface";
import { Injectable } from "@nestjs/common";
import { GetAllCropsResponseDto } from "./dtos/getAll-crop-response.dto";

@Injectable()
export class GetAllCropsUseCase {
    constructor(
        private readonly cropRepository: ICropRepository
    ) {}
    async execute(): Promise<GetAllCropsResponseDto[]> {
        const crops = await this.cropRepository.getAllCrops();
        return crops;
    }
}