import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export interface SearchParams {
  searchParams: Promise<{
    source: string;
    destination: string;
  }>;
}

export interface CreateOrStartRouteProps {
  isCreate?: boolean;
  children: React.ReactNode;
}

export type CreateOrStartRoute = {
  error?: string;
  success?: boolean;
} | null;

export type MapNewRouteProps = {
  directionsData?: DirectionsData;
  routeIdElementId?: string;
  isDriver?: boolean;
  isAdmin?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DirectionsData = DirectionsResponseData & { request: any };

export type RouteModel = {
  id: string;
  name: string;
  source: { name: string; location: { lat: number; lng: number } };
  destination: { name: string; location: { lat: number; lng: number } };
  distance: number;
  duration: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  directions: DirectionsResponseData & { request: any };
  created_at: Date;
  updated_at: Date;
};
