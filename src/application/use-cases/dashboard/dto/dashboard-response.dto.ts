import { ApiProperty } from "@nestjs/swagger";

export class DashboardResponseDto {
  @ApiProperty({
    example: 100,
    type: Number,
    description: "The total number of producers",
  })
  totalProducers: number;

  @ApiProperty({
    example: 100,
    type: Number,
    description: "The total number of farms",
  })
  totalFarms: number;

  @ApiProperty({
    example: 100,
    type: Number,
    description: "The total number of hectares",
  })
  totalHectares: number;

  @ApiProperty({
    example: [{ state: "SP", count: 50 }],
    type: [Object],
    description: "The number of farms by state",
  })
  farmsByState: { state: string; count: number }[];

  @ApiProperty({
    example: [{ crop: "Soy", count: 50 }],
    type: [Object],
    description: "The distribution of crops",
  })
  cropsDistribution: { crop: string; count: number }[];

  @ApiProperty({
    example: [{ type: "Arable Area", area: 50 }],
    type: [Object],
    description: "The land usage",
  })
  landUsage: { type: string; area: number }[];
}
