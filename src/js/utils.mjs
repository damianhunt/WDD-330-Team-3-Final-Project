export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
  ) {
    const htmlStrings = list.map(templateFn);
    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
  
  export function renderWithTemplate(
    template,
    parentElement,
    data,
    callback,
    position = "afterbegin",
    clear = false
  ) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
  }
  
  export async function loadHeaderFooter() {
    const templateForHeader = await loadTemplate("../partials/header.html");
    const elementForHeader = document.querySelector("#main-header");
    const templateForFooter = await loadTemplate("../partials/footer.html");
    const elementForFooter = document.querySelector("#main-footer");
  
    renderWithTemplate(templateForHeader, elementForHeader);
    renderWithTemplate(templateForFooter, elementForFooter);
  }