import { Dispatch, SetStateAction } from "react";
import { InputNames } from "../enums";
import { InputFields } from "../interfaces";

const regex_numbers = /^[0-9]*$/;

export function onBlurCheck(
  inputName: string,
  inputValue: string,
  touched: boolean,
  setInputErrors: Dispatch<SetStateAction<InputFields>>
): boolean {
  let hasError = false;
  if (touched && inputValue === "") {
    setInputErrors((prev) => {
      return { ...prev, [inputName]: "Required field" };
    });
    hasError = true;
  }

  if (touched && inputValue !== "") {
    switch (inputName) {
      case InputNames.zipCode: {
        if (inputValue.length !== 5 || !regex_numbers.test(inputValue)) {
          setInputErrors((prev) => {
            return {
              ...prev,
              [inputName]: "The zip code must a 5-digit number",
            };
          });
          hasError = true;
        }
        break;
      }

      default:
        break;
    }
  }

  return hasError;
}
