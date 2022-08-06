import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCurrentSearch,
  selectLoadingStatus,
  selectResultsList,
  setLoadingStatus,
} from "../../redux/map/mapSlice";
import Marker from "./Marker";
import { Libraries, LoadingStatus } from "../../utils";

// UI //
import styles from "./Map.module.css";
import Spinner from "react-bootstrap/Spinner";

const center = {
  lat: 37.0902,
  lng: -95.7129,
};

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEYS!;

// const mapOptions: google.maps.MapOptions = {};

function Map(): JSX.Element {
  const dispatch = useAppDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries: Libraries.data,
  });
  const { items, ids } = useAppSelector(selectResultsList);

  const currentSearch = useAppSelector(selectCurrentSearch);
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const mapRef = useRef<google.maps.Map | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (
      currentSearch &&
      mapRef &&
      mapRef.current &&
      loadingStatus === LoadingStatus.succeeded
    ) {
      mapRef.current.panTo({ lat: currentSearch.lat, lng: currentSearch.lng });
      mapRef.current.setZoom(10);
      dispatch(setLoadingStatus(LoadingStatus.idle));

      if (overlayRef && overlayRef.current) {
        overlayRef.current.style.opacity = "0";
        overlayRef.current.style.zIndex = "-1";
      }
    }
  }, [mapRef, loadingStatus, currentSearch, dispatch]);

  useEffect(() => {
    if (
      loadingStatus === LoadingStatus.loading &&
      overlayRef &&
      overlayRef.current
    ) {
      overlayRef.current.style.opacity = "1";
      overlayRef.current.style.zIndex = "3";
    }
  }, [loadingStatus, overlayRef]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded)
    return <main className={styles.main}>loading place holder</main>;

  return (
    <div className={styles.main}>
      <GoogleMap
        // options={mapOptions}
        onLoad={onMapLoad}
        mapContainerClassName={styles.map_container}
        zoom={4}
        center={center}
      >
        {ids.map((id) => {
          const {
            salary_is_predicted,
            company: { display_name },
            title,
            latitude,
            longitude,
          } = items[id];
          return (
            <Marker
              key={id}
              salary={salary_is_predicted}
              companyName={display_name}
              title={title}
              lat={latitude}
              lng={longitude}
              id={id}
            />
          );
        })}
      </GoogleMap>

      <div className={styles.overlay} id="overlay" ref={overlayRef}>
        <Spinner animation="border" variant="success" />
      </div>
    </div>
  );
}

export default memo(Map);
