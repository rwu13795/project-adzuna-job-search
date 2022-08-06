import { LoadingStatus } from "../../utils";

export interface CurrentSearch {
  city: string;
  lat: number;
  lng: number;
  zipCode: string;
  title: string;
}

export interface MapState {
  loadingStatus: LoadingStatus;
  currentSearch: CurrentSearch | null;
  resultsList: {
    items: { [id: string]: SearchResult };
    ids: string[];
    hasMore: boolean;
    // CANNOT use Set in redux store
    // set is considered a non-serializable value
    lat_lng_set: { [lat_lng: number]: boolean };
  };
  targetJobId: string | null;
  openModal: boolean;
}

export interface SearchResult {
  id: string;
  company: {
    display_name: string;
  };
  description: string;
  title: string;
  salary_is_predicted: string;
  latitude: number;
  longitude: number;
  redirect_url: string;
  category: {
    label: string;
    tag: string;
  };
  location: {
    display_name: string;
  };
  created: string;
  contract_time?: string;
}
