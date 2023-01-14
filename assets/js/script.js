// taking care of forEach object problem in FireFox, Internet Explorer, WaterFox
if (typeof NodeList.prototype.forEach !== 'function') NodeList.prototype.forEach = Array.prototype.forEach;

/**
 * @param {String} element
 * @return {HTMLElement}
 */
const $ = (element) => {
  if (element.trim() === '') return undefined;
  var elements = document.querySelectorAll(element);
  return (elements.length > 0) ? ((elements.length === 1) ? elements[0] : elements) : undefined;
}

// Sequence generator function 
const range = (start = 0, stop = 0, step = 0) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

document.setTitle = (title = '') => {
  if (document.title != title) document.title = title;
}

const setDefaultTimeFDLP = () => {
  const getCurrentDate = (isJalali = false) => {
    var date = new Date().toLocaleDateString(`${isJalali ? "fa-IR" : "en-US"}-u-nu-latn`).split('/');
    return {
      year: +(date[isJalali ? 0 : 2]),
      month: +(date[isJalali ? 1 : 0]),
      day: +(date[isJalali ? 2 : 1]),
    };
  }

  const date = getCurrentDate();
  const dateJalali = getCurrentDate(true);

  (dates => {
    const dates_keys = Object.keys(dates);
    dates_keys.forEach(dates_key => (
      (dates_box, dates_name) => {
        let value_q_index = true;
        var lastChar = dates_box.substring(dates_box.length - 1);
        if (lastChar === '?') {
          dates_box = dates_box.substring(0, dates_box.length - 1);
          value_q_index = false;
        }
        for (let index = 0; index < dates_name.length; index++) {
          var option = document.createElement("option");
          option.innerText = dates_name[index];
          option.value = (value_q_index ? (index + 1) : dates_name[index]).toString();
          $(dates_box).appendChild(option);
        }
      }
    )(dates_key, dates[dates_key]));
  })({
    "#date_year_en?": [date.year, date.year - 1],
    "#date_month_en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "#date_day_en": range(1, 31, 1),

    "#date_year_fa?": [dateJalali.year, dateJalali.year - 1],
    "#date_month_fa": ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
    "#date_day_fa": range(1, 31, 1),
  });

  $("#date_year_en").options[0].setAttribute("selected", "true");
  $("#date_month_en").options[date.month - 1].setAttribute("selected", "true");
  $("#date_day_en").options[date.day - 1].setAttribute("selected", "true");

  $("#date_year_fa").options[0].setAttribute("selected", "true");
  $("#date_month_fa").options[dateJalali.month - 1].setAttribute("selected", "true");
  $("#date_day_fa").options[dateJalali.day - 1].setAttribute("selected", "true");

}

const setPageBasedOnLang = () => {

  window.addEventListener("storage", event => {
    if (event.key === "is_lang_fa") setPageBasedOnLang();
  });

  const _setPageBasedOnLang = is_lang_fa => {
    if (is_lang_fa) {
      document.setTitle("محاسبه طول دوره قاعدگی - ابزاری آنلاین و رایگان برای محاسبه طول دوره قاعدگی");
      $("#en_box").classList.add("hide");
      $("#fa_box").classList.remove("hide");

      $("#about-period").classList.add("lang_fa");
    } else {
      document.setTitle("Period Calculator - a free online tool to Period length calculator");
      $("#fa_box").classList.add("hide");
      $("#en_box").classList.remove("hide");

      $("#about-period").classList.remove("lang_fa");
    }
  }

  let is_lang_fa = false;

  const get_lang = () => {

    const _get_lang = () => {

      document.body.classList.add("show_dialog");

      const
        yes_btn = $("#y_lang_fa"),
        no_btn = $("#n_lang_fa");

      yes_btn.addEventListener("click", event => [document.body.classList.remove("show_dialog"), window.localStorage.setItem("is_lang_fa", "true"), _setPageBasedOnLang(true)]);
      no_btn.addEventListener("click", event => [document.body.classList.remove("show_dialog"), window.localStorage.setItem("is_lang_fa", "false"), _setPageBasedOnLang(false)]);

    }

    setTimeout(_get_lang, 500);
    
  }

  if (!!window.localStorage.getItem("is_lang_fa")) {
    const _is_lang_fa = window.localStorage.getItem("is_lang_fa").toLowerCase();
      if (_is_lang_fa === "true") is_lang_fa = true;
      else if (_is_lang_fa === "false") { }
      else {
        window.localStorage.removeItem("is_lang_fa");
        get_lang();
    }
  } else get_lang();

  _setPageBasedOnLang(is_lang_fa);

}

const getSelectValue = element => {
  var select = $(element);
  var value = select.options[select.selectedIndex].value.trim();
  return value;
}

const main = main_event => {

  setDefaultTimeFDLP();

  setPageBasedOnLang();
  
  const
    form_en = $("#form_en"),
    form_fa = $("#form_fa");
  
  const showComingSoon = () => {
    const is_lang_fa = () => {
      let is_lang_fa = window.localStorage.getItem("is_lang_fa").toLowerCase();
      return (is_lang_fa = (!!is_lang_fa) ? (is_lang_fa === "true") : false);
    }

    // This is temporary
    alert(!is_lang_fa() ? "Coming Soon ..." : "بزودی ...");
  }
  
  form_en.addEventListener("submit", event => {
    event.preventDefault();
    console.log("Submit: EN");
    const fdlp_en = {
      year: getSelectValue('select#date_year_en'),
      month: getSelectValue('select#date_month_en'),
      day: getSelectValue('select#date_day_en'),
    };
    const clength_en = getSelectValue('select#clength_en');
    const ccycle_en = getSelectValue('select#ccycle_en');
    console.log(fdlp_en, clength_en, ccycle_en);
    showComingSoon();
  });

  form_fa.addEventListener("submit", event => {
    event.preventDefault();
    console.log("Submit: FA");
    const fdlp_fa = {
      year: getSelectValue('select#date_year_fa'),
      month: getSelectValue('select#date_month_fa'),
      day: getSelectValue('select#date_day_fa'),
    };
    const clength_fa = getSelectValue('select#clength_fa');
    const ccycle_fa = getSelectValue('select#ccycle_fa');
    console.log(fdlp_fa, clength_fa, ccycle_fa);
    showComingSoon();
  });

}

document.addEventListener("DOMContentLoaded", main);

// document.addEventListener("contextmenu", event => event.preventDefault());