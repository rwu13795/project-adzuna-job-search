import { Dispatch, SetStateAction } from "react";
import { InputNames } from "../enums";
import { InputFields } from "../interfaces";

const regex_numbers = /^[0-9]*$/;

export function onChangeCheck(
  inputName: string,
  inputValue: string,
  setInputErrors: Dispatch<SetStateAction<InputFields>>
): boolean {
  let hasError = false;

  switch (inputName) {
    case InputNames.zipCode: {
      if (inputValue.length > 5 || !regex_numbers.test(inputValue)) {
        setInputErrors((prev) => {
          return {
            ...prev,
            [inputName]: "The zip code must a 5-digit number",
          };
        });
      } else {
        setInputErrors((prev) => {
          return { ...prev, [inputName]: "" };
        });
      }
      return (hasError = false);
    }

    default:
      break;
  }

  if (inputValue !== "" || inputValue !== undefined) {
    setInputErrors((prev) => {
      return { ...prev, [inputName]: "" };
    });
  }

  return hasError;
}
