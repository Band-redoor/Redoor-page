(function () {
  const namespace = "band-redoor.github.io";
  const action = "visit";
  const key = "redoor-page";
  const endpoint = `https://counterapi.com/api/${namespace}/${action}/${key}`;
  const todayElements = document.querySelectorAll("[data-visitor-today]");
  const totalElements = document.querySelectorAll("[data-visitor-total]");

  function show(elements, value) {
    const formatted = Number(value).toLocaleString("ko-KR");
    elements.forEach((element) => {
      element.textContent = formatted;
    });
  }

  function hideCounter() {
    document.querySelectorAll(".visitor-counter").forEach((element) => {
      element.hidden = true;
    });
  }

  Promise.all([
    fetch(`${endpoint}?unique=true&timeline=1d`).then((response) => {
      if (!response.ok) throw new Error("Today counter request failed");
      return response.json();
    }),
    fetch(`${endpoint}?unique=true&readOnly=true`).then((response) => {
      if (!response.ok) throw new Error("Total counter request failed");
      return response.json();
    })
  ])
    .then(([today, total]) => {
      show(todayElements, today.value);
      show(totalElements, Math.max(Number(today.value), Number(total.value)));
    })
    .catch(hideCounter);
})();
