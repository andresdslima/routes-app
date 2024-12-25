import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteDto } from './create-route.dto';

export class UpdateRouteDto extends PartialType(CreateRouteDto) {
  source?: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  destination?: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  duration?: number;
  distance?: number;
  directions?: {
    available_travel_modes: string[];
    geocoded_waypoints: string[];
    routes: string[];
    request: string;
  };
  freight?: number;
}
