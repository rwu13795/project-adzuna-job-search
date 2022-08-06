export function searchResultTransition(showForm: boolean) {
  const form = document.getElementById("form");
  const result = document.getElementById("result");

  const isSmall = window.innerWidth < 765;
  const formHeight = isSmall ? "150px" : "120px";

  if (form && result) {
    if (showForm) {
      form.style.height = formHeight;
      result.style.height = "0px";
    } else {
      form.style.height = "0px";
      result.style.height = "120px";
    }
  }
}
