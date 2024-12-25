import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoutesDriverGateway } from './routes-driver.gateway';

interface ProcessRouteDto {
  route_id: string;
  lat: number;
  lng: number;
}

@Injectable()
export class RoutesDriverService {
  constructor(
    private prismaService: PrismaService,
    private routesGateway: RoutesDriverGateway,
  ) {}

  async processRoute(dto: ProcessRouteDto) {
    const routeDriver = await this.prismaService.routeDriver.upsert({
      include: {
        route: true, //Eager loading
      },
      where: { route_id: dto.route_id },
      create: {
        route_id: dto.route_id,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
    });

    this.routesGateway.emitNewPoints({
      route_id: dto.route_id,
      lat: dto.lat,
      lng: dto.lng,
    });

    return routeDriver;
  }
}
