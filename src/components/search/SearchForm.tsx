import {
  ChangeEvent,
  FormEvent,
  memo,
  useState,
  MouseEvent,
  useEffect,
} from "react";
import Button from "react-bootstrap/Button";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { adzunaSearch } from "../../redux/map/extra-reducers/adzunaSearch";
import {
  selectLoadingStatus,
  setLoadingStatus,
  setCurrentSearch,
} from "../../redux/map/mapSlice";
import {
  getLocation,
  InputFields,
  InputNames,
  LoadingStatus,
  onSubmitCheck,
  searchResultTransition,
} from "../../utils";
import InputField from "./InputField";

import styles from "./SearchForm.module.css";

interface Props {
  showForm: boolean;
  showFormHandler: (show: boolean) => void;
}

function SearchForm({ showForm, showFormHandler }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const loadingStatus = useAppSelector(selectLoadingStatus);

  const [values, setValues] = useState<InputFields>({
    [InputNames.title]: "",
    [InputNames.zipCode]: "",
  });
  const [errors, setErrors] = useState<InputFields>({
    [InputNames.title]: "",
    [InputNames.zipCode]: "",
  });

  async function onSubmitHandler(
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    const hasError = onSubmitCheck(values, setErrors);
    if (hasError) return;

    dispatch(setLoadingStatus(LoadingStatus.loading));
    const { city, lat, lng } = await getLocation(values[InputNames.zipCode]);

    dispatch(
      setCurrentSearch({
        city,
        lat,
        lng,
        zipCode: values[InputNames.zipCode],
        title: values[InputNames.title],
      })
    );
    dispatch(adzunaSearch({ pageNum: 1 }));
  }

  function valueChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (loadingStatus === LoadingStatus.succeeded) {
      searchResultTransition(false, false);
      dispatch(setLoadingStatus(LoadingStatus.idle));
    }
  }, [loadingStatus, dispatch]);

  return (
    <div className={styles.container} id="form">
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <div className={styles.input_fields}>
          <InputField
            name={InputNames.title}
            value={values[InputNames.title]}
            error={errors[InputNames.title]}
            setErrors={setErrors}
            valueChangeHandler={valueChangeHandler}
          >
            Job Title
          </InputField>
          <InputField
            name={InputNames.zipCode}
            value={values[InputNames.zipCode]}
            error={errors[InputNames.zipCode]}
            setErrors={setErrors}
            valueChangeHandler={valueChangeHandler}
          >
            Zip Code
          </InputField>
        </div>

        <Button variant="success" type="submit" onClick={onSubmitHandler}>
          Search
        </Button>
      </form>
    </div>
  );
}

export default memo(SearchForm);
