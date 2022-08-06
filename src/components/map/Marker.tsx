import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { memo, useState } from "react";

import { useAppDispatch } from "../../redux/hooks";
import { setOpenModal, setTargetJobId } from "../../redux/map/mapSlice";

import styles from "./Marker.module.css";

interface Props {
  lat: number;
  lng: number;
  companyName: string;
  title: string;
  salary: string;
  id: string;
}

function Marker({
  lat,
  lng,
  companyName,
  title,
  salary,
  id,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const [isSelected, setIsSelected] = useState<boolean>(false);

  function openInfoWindowHandler() {
    setIsSelected(true);
  }
  function closeInfoWindowHandler() {
    setIsSelected(false);
  }

  function onDetailClickHandler() {
    // set the job as seleected Job using ID in the store
    dispatch(setTargetJobId(id));
    setIsSelected(false);
    dispatch(setOpenModal(true));
  }

  return (
    <>
      {/* need to use "MarkerF" in react 18 or above */}
      <MarkerF
        position={{ lat, lng }}
        //   onClick={() => handleActiveMarkerF(id)}
        onMouseOver={openInfoWindowHandler}
      />
      {isSelected && (
        // react strictMode will make the InfoWdindow render twice in develepment mode
        // need to use the "InfoWindowF" instead
        <InfoWindowF
          position={{ lat, lng }}
          onCloseClick={closeInfoWindowHandler}
        >
          <div className={styles.inner_info_window}>
            <div>{companyName}</div>
            <div>{title}</div>
            <div>{salary !== "0" && `salary: $${salary}`}</div>
            <button onClick={onDetailClickHandler}>details</button>
          </div>
        </InfoWindowF>
      )}
    </>
  );
}

export default memo(Marker);
