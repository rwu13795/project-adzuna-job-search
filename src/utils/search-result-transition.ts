export function searchResultTransition(showForm: boolean, isSmall: boolean) {
  const form = document.getElementById("form");
  const result = document.getElementById("result");
  const height = isSmall ? "60px" : "120px";

  if (form && result) {
    if (showForm) {
      form.style.height = height;
      result.style.height = "0px";
    } else {
      form.blur();
      form.style.height = "0px";
      result.style.height = height;
    }
  }
}
