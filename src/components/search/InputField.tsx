import {
  ChangeEvent,
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useState,
  FocusEvent,
  useEffect,
  useRef,
} from "react";
import {
  InputFields,
  onBlurCheck,
  onChangeCheck,
  onFocusCheck,
} from "../../utils";

import styles from "./InputField.module.css";

interface Props {
  children: ReactNode;
  name: string;
  value: string;
  error: string;
  valueChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  setErrors: Dispatch<SetStateAction<InputFields>>;
  isDisabled?: boolean;
}

function InputField({
  children,
  name,
  value,
  error,
  valueChangeHandler,
  setErrors,
}: Props): JSX.Element {
  const [touched, setTouched] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onFocusHandler() {
    onFocusCheck(setTouched);
  }

  function onBlurHandler(e: FocusEvent<HTMLInputElement>) {
    onBlurCheck(name, value, touched, setErrors);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const hasError = onChangeCheck(name, value, setErrors);
    if (hasError) return;

    valueChangeHandler(e);
  }

  let input_box = styles.input_box;
  if (showError) input_box += " " + styles.error_box;

  useEffect(() => {
    if (error !== "") {
      inputRef.current?.setCustomValidity("invalid");
      setShowError(true);
    } else {
      inputRef.current?.setCustomValidity("");
      setShowError(false);
    }
  }, [error]);

  return (
    <div className={styles.input_field_wrapper}>
      <div className={input_box}>
        <input
          ref={inputRef}
          type="text"
          name={name}
          placeholder=" "
          value={value}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
        />
        <span>{children}</span>
      </div>
      <div className={styles.error_text}>{error}</div>
    </div>
  );
}

export default memo(InputField);
