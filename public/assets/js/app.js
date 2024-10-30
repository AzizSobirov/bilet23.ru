document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenuToggle = document.querySelector("#hamburgerMenuToggle");
  const hamburgerMenu = document.querySelector("#hamburgerMenu");
  const datePickerToggle = document.getElementById("datePickerToggle");
  const closeCalendarModal = document.getElementById("closeCalendarModal");
  const priceButton = document.getElementById("priceButton");
  const closePriceRangeModal = document.getElementById("closePriceRangeModal");
  const calendar = document.getElementById("calendar");
  const price = document.getElementById("price");
  const priceImg = document.querySelector("#priceButton img");
  const dataImg = document.querySelector("#datePickerToggle img");
  const nextMonth = document.getElementById("nextMonth");
  const prevMonth = document.getElementById("prevMonth");
  const nextYear = document.getElementById("nextYear");
  const prevYear = document.getElementById("prevYear");
  const monthYear = document.getElementById("monthYear");
  const calendarDays = document.getElementById("calendarDays");
  const calendarModal = document.getElementById("calendar");
  const searchToggle = document.getElementById("searchToggle");
  const searchMenu = document.getElementById("searchMenu");
  const closeSearch = document.getElementById("closeSearch");

  const debouncedFilterItems = debounce(filterItems, 100); // 300ms delay

  let currentDate = new Date();
  let today = new Date();
  let selectedDay = null;
  let selectedMonth = null;
  let selectedYear = null;

  if (datePickerToggle) {
    datePickerToggle.addEventListener("click", function () {
      calendar.classList.toggle("hidden");
      calendar.classList.add("is-open");
      const isDataActive = datePickerToggle.classList.toggle("active");
      const dataSrc = isDataActive
        ? "./assets/images/active-data.png"
        : "./assets/images/date.svg";
      dataImg.src = dataSrc;

      if (price.classList.contains("is-open")) {
        price.classList.add("hidden");
        price.classList.remove("is-open");
        priceButton.classList.remove("active");
        priceImg.classList.remove("active");
        priceImg.src = "./assets/images/price.svg";
      }
    });
  }

  closeCalendarModal &&
    closeCalendarModal.addEventListener("click", function () {
      calendar.classList.add("hidden");
      calendar.classList.remove("is-open");
      datePickerToggle.classList.remove("active");
      dataImg.src = "./assets/images/date.svg";
    });

  if (priceButton) {
    priceButton.addEventListener("click", function () {
      price.classList.toggle("hidden");
      price.classList.add("is-open");
      const isActive = priceButton.classList.toggle("active");
      const imgSrc = isActive
        ? "./assets/images/active-price.png"
        : "./assets/images/price.svg";
      priceImg.src = imgSrc;

      if (calendar.classList.contains("is-open")) {
        calendar.classList.add("hidden");
        calendar.classList.remove("is-open");
        datePickerToggle.classList.remove("active");
        dataImg.src = "./assets/images/date.svg";
      }
    });

    closePriceRangeModal &&
      closePriceRangeModal.addEventListener("click", function () {
        price.classList.add("hidden");
        price.classList.remove("is-open");
        priceButton.classList.remove("active");
        priceImg.classList.remove("active");
        priceImg.src = "./assets/images/price.svg";
      });
  }

  searchToggle.addEventListener("click", function () {
    searchMenu.classList.toggle("hidden");
    hamburgerMenu.classList.remove("open");
    hamburgerMenuToggle.classList.remove("close");
  });

  closeSearch.addEventListener("click", function () {
    searchMenu.classList.add("hidden");
  });

  hamburgerMenuToggle.addEventListener("click", function () {
    hamburgerMenu.classList.toggle("open");
    hamburgerMenuToggle.classList.toggle("close");
    searchMenu.classList.add("hidden");
  });

  const chbx = document.getElementById("promo-checkbox");
  chbx &&
    chbx.addEventListener("change", function () {
      const textAksii = document.getElementById("text_aksii");
      textAksii.classList.toggle("check_color", this.checked);
    });

  const fromSlider = document.getElementById("fromSlider");
  const toSlider = document.getElementById("toSlider");
  const fromInput = document.getElementById("fromInput");
  const toInput = document.getElementById("toInput");

  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, "#F71313", "#F71313", controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, "#F71313", "#F71313", controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, "#909090", "#F71313", toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, "#909090", "#F71313", toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);

    // Debounced filterItems call
    debouncedFilterItems({
      price: {
        from: fromInput.value,
        to: toInput.value,
      },
    });

    return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${
      (fromPosition / rangeDistance) * 100
    }%, ${rangeColor} ${(fromPosition / rangeDistance) * 100}%, ${rangeColor} ${
      (toPosition / rangeDistance) * 100
    }%, ${sliderColor} ${
      (toPosition / rangeDistance) * 100
    }%, ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector("#toSlider");
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }

  fromSlider &&
    fromSlider.addEventListener("input", () =>
      controlFromSlider(fromSlider, toSlider, fromInput)
    );
  toSlider &&
    toSlider.addEventListener("input", () =>
      controlToSlider(fromSlider, toSlider, toInput)
    );
  fromInput &&
    fromInput.addEventListener("input", () =>
      controlFromInput(fromSlider, fromInput, toInput, toSlider)
    );
  toInput &&
    toInput.addEventListener("input", () =>
      controlToInput(toSlider, fromInput, toInput, toSlider)
    );

  function handleDateSelection(day) {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthName = currentDate.toLocaleString("default", { month: "short" });
    const selectedDate = `${monthName} ${day}`;
    localStorage.setItem("selectedDay", JSON.stringify({ day, month, year }));
    datePickerToggle.textContent = `Дата: ${selectedDate}`;
    selectedDay = day;
    selectedMonth = month;
    selectedYear = year;
    calendarModal.classList.add("hidden");
    datePickerToggle.classList.remove("active");
    dataImg.src = "./assets/images/date.svg";
    renderCalendar();
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${currentDate.toLocaleString("default", {
      month: "long",
    })} ${year}`;

    calendarDays.innerHTML = "";

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push("<li></li>");
    }
    for (let i = 1; i <= lastDate; i++) {
      const dayOfWeek = (firstDay + i - 1) % 7;
      let dayClass = "cursor-pointer";
      if (
        month === today.getMonth() &&
        i === today.getDate() &&
        year === today.getFullYear()
      ) {
        dayClass += " today";
      } else if (
        i == selectedDay &&
        month === selectedMonth &&
        year === selectedYear
      ) {
        dayClass += " selected-day";
      }
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        dayClass += " weekend";
      }
      days.push(`<li class="${dayClass}" data-day="${i}">${i}</li>`);
    }

    while (days.length % 7 !== 0) {
      days.push("<li></li>");
    }
    if (days.length < 32) {
      while (days.length < 32) {
        days.push("<li></li>");
      }
    }

    let weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        `<ul class="flex items-center justify-between md:px-[15px] w-full">${days
          .slice(i, i + 7)
          .join("")}</ul>`
      );
    }

    filterItems({
      date: `${year}-${month + 1}-${selectedDay}`,
    });
    calendarDays.innerHTML = weeks.join("");

    document
      .querySelectorAll("#calendarDays li[data-day]")
      .forEach((dayElement) => {
        dayElement.addEventListener("click", function () {
          const day = this.getAttribute("data-day");
          handleDateSelection(day);
        });
      });
  }

  nextMonth &&
    nextMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

  prevMonth &&
    prevMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

  nextYear &&
    nextYear.addEventListener("click", () => {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      renderCalendar();
    });

  prevYear &&
    prevYear.addEventListener("click", () => {
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      renderCalendar();
    });

  closeCalendarModal &&
    closeCalendarModal.addEventListener("click", () => {
      calendarModal.classList.add("hidden");
    });

  datePickerToggle &&
    datePickerToggle.addEventListener("click", () => {
      calendarModal.classList.remove("hidden");
    });

  const storedDay = localStorage.getItem("selectedDay");

  if (datePickerToggle) {
    if (storedDay) {
      const { day, month, year } = JSON.parse(storedDay);
      const monthName = new Date(year, month).toLocaleString("default", {
        month: "short",
      });
      datePickerToggle.textContent = `Дата: ${monthName} ${day}`;
      selectedDay = day;
      selectedMonth = month;
      selectedYear = year;
    }

    renderCalendar();
  }

  const filterSearch = document.querySelectorAll("#filter-search");
  filterSearch.forEach((item) => {
    item.addEventListener("input", () => {
      debouncedFilterItems({
        search: item.value,
      });
    });
  });

  const promoChbx = document.querySelector("#promo-checkbox");
  if (promoChbx) {
    promoChbx.addEventListener("change", () => {
      debouncedFilterItems({
        discount: promoChbx.checked,
      });
    });
  }

  const sortByDate = document.querySelector("#sortByDate");
  if (sortByDate) {
    const icon = sortByDate.querySelector("img");

    sortByDate.addEventListener("click", () => {
      sortByDate.classList.toggle("active");
      icon.classList.toggle("rotate-180");

      debouncedFilterItems({
        sortByDate: sortByDate.classList.contains("active") ? true : false,
      });
    });
  }

  const sortByPrice = document.querySelector("#sortByPrice");
  if (sortByPrice) {
    const icon = sortByPrice.querySelector("img");

    sortByPrice.addEventListener("click", () => {
      sortByPrice.classList.toggle("active");
      icon.classList.toggle("rotate-180");

      debouncedFilterItems({
        sortByPrice: sortByPrice.classList.contains("active") ? true : false,
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdownHeaders = document.querySelectorAll("[id^='dropdown']");
  dropdownHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const contentId = header.id.replace("dropdown", "dropdownContent");
      const content = document.getElementById(contentId);
      const isHidden = content.classList.contains("hidden");

      document.querySelectorAll("[id^='dropdownContent']").forEach((item) => {
        item.classList.add("hidden");
        item.previousElementSibling.querySelector("img").src =
          "./assets/images/plus.png";
        item.previousElementSibling
          .querySelector("h3")
          .classList.remove("text-[#F71313]");
        item.previousElementSibling
          .querySelector("h3")
          .classList.add("text-black");
      });

      if (isHidden) {
        content.classList.remove("hidden");
        header.querySelector("img").src = "./assets/images/minus.png";
        header.querySelector("h3").classList.add("text-[#F71313]");
        header.querySelector("h3").classList.remove("text-black");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const span = document.getElementsByClassName("closeK")[0];

  const images = document.querySelectorAll(".gallery-img");
  images.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  });

  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

const swiper = new Swiper("#intro-swiper .swiper", {
  navigation: {
    nextEl: "#intro-swiper .swiper-button-next",
    prevEl: "#intro-swiper .swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: "#intro-swiper .swiper-pagination",
    clickable: true,
    renderBullet: function (index, className, length) {
      var totalSlides = document.querySelectorAll(
        "#intro-swiper .swiper-slide"
      );

      return `<span style='width: ${100 / totalSlides.length}%;' class='${className}'></span>`;
    },
  },
  breakpoints: {
    660: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: "auto",
      spaceBetween: 35,
    },
  },
});

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

let filter = {};
/*
  Example:
  filter: { 
    date: "2023-01-01", 
    price: {
      from: 200,
      to: 300
    },
    discount: true || false
    sortByPrice: true || false
    sortByDate: true || false
    search: "test"
  }
*/

function filterItems(params) {
  filter = { ...filter, ...params };
  console.log(filter);
  // your filter logic here.
}
