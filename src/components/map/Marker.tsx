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

  function toggleInfoWindowHanlder() {
    setIsSelected((prev) => !prev);
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
        onMouseOver={toggleInfoWindowHanlder}
        onClick={toggleInfoWindowHanlder}
      >
        {/* NOTE (1) */}
        {isSelected && (
          <InfoWindowF
            position={{ lat, lng }}
            // "onCloseClick" event not triggering the callback !?
            // onCloseClick={closeInfoWindowHandler}
          >
            <div
              className={styles.inner_info_window}
              onMouseLeave={closeInfoWindowHandler}
            >
              <div>{companyName}</div>
              <div>{title}</div>
              <div>{salary !== "0" && `salary: $${salary}`}</div>
              <button onClick={onDetailClickHandler}>details</button>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
    </>
  );
}

export default memo(Marker);

// ---------- NOTE ------------ //
/*
  (1) The old "InfoWindow" has to be replaced with the "InfoWindowF"
      otherwise, a empty duplicated window will be rendered the same positon
      of the "InfoWindow"

      Also, "InfoWindowF" has a bug in the "onCloseClick" event!
      Even though the window will be closed, the callback won't be 
      trigger in such event! if the callback is not triggered, the 
      infoWindow is stilled "isSelected", when I hover on the marker again,
      the window won't be re-rendered

      I have to add the "onMouseLeave" event in the inner_info_window in
      order to close and re-open the same window properly
*/
