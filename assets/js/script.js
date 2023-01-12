
document.setTitle = (title = '') => {
  if (document.title != title) document.title = title;
}

const setPageBasedOnLang = () => {

  window.addEventListener("storage", event => {
    if (event.key === "is_lang_fa") setPageBasedOnLang();
  });

  const _setPageBasedOnLang = is_lang_fa => {
    if (is_lang_fa) {
      document.setTitle("محاسبه طول دوره قاعدگی - ابزاری آنلاین و رایگان برای محاسبه طول دوره قاعدگی");
      document.querySelector("#en_box").classList.add("hide");
      document.querySelector("#fa_box").classList.remove("hide");

      document.querySelector("#about-period").classList.add("lang_fa");
    } else {
      document.setTitle("Period Calculator - a free online tool to Period length calculator");
      document.querySelector("#fa_box").classList.add("hide");
      document.querySelector("#en_box").classList.remove("hide");

      document.querySelector("#about-period").classList.remove("lang_fa");
    }
  }

  let is_lang_fa = false;

  const get_lang = () => {

    const _get_lang = () => {

      document.body.classList.add("show_dialog");

      const
        yes_btn = document.getElementById("y_lang_fa"),
        no_btn = document.getElementById("n_lang_fa");

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

const main = main_event => {

  setPageBasedOnLang();

}

document.addEventListener("DOMContentLoaded", main);

document.addEventListener("contextmenu", event => event.preventDefault());