import { Farm } from "src/domain/farms/farm.entity";
import { IFarmRepository } from "./farms.interface";
import { FindAllFarmQueryRequestDto } from "./dto/request/findAll-request.dto";
import { FindAllFarmResponseDto } from "./dto/response/findAll-response.dto";

export class FindAllFarmUseCase {
    constructor(private farmRepository: IFarmRepository) {}

    async execute(findAllFarmQueryRequestDto: FindAllFarmQueryRequestDto): Promise<FindAllFarmResponseDto> {
        return await this.farmRepository.findAll(findAllFarmQueryRequestDto);
    }
}