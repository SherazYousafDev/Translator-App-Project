// Variables....
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#translate");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const icons = document.querySelectorAll("img");

// All Countries Object:
const countries = {
  "af-ZA": "Afrikaans",
  "sq-AL": "Albanian",
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "hy-AM": "Armenian",
  "az-AZ": "Azerbaijani",
  "eu-ES": "Basque",
  "be-BY": "Belarusian",
  "bn-BD": "Bengali",
  "bs-BA": "Bosnian",
  "bg-BG": "Bulgarian",
  "ca-ES": "Catalan",
  "ceb-PH": "Cebuano",
  "ny-MW": "Chichewa",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  "co-FR": "Corsican",
  "hr-HR": "Croatian",
  "cs-CZ": "Czech",
  "da-DK": "Danish",
  "nl-NL": "Dutch",
  "en-US": "English",
  "eo-EO": "Esperanto",
  "et-EE": "Estonian",
  "tl-PH": "Filipino",
  "fi-FI": "Finnish",
  "fr-FR": "French",
  "fy-NL": "Frisian",
  "gl-ES": "Galician",
  "ka-GE": "Georgian",
  "de-DE": "German",
  "el-GR": "Greek",
  "gu-IN": "Gujarati",
  "ht-HT": "Haitian Creole",
  "ha-NG": "Hausa",
  "haw-US": "Hawaiian",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hmn-CN": "Hmong",
  "hu-HU": "Hungarian",
  "is-IS": "Icelandic",
  "ig-NG": "Igbo",
  "id-ID": "Indonesian",
  "ga-IE": "Irish",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "jw-ID": "Javanese",
  "kn-IN": "Kannada",
  "kk-KZ": "Kazakh",
  "km-KH": "Khmer",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish (Kurmanji)",
  "ky-KG": "Kyrgyz",
  "lo-LA": "Lao",
  "la-VA": "Latin",
  "lv-LV": "Latvian",
  "lt-LT": "Lithuanian",
  "lb-LU": "Luxembourgish",
  "mk-MK": "Macedonian",
  "mg-MG": "Malagasy",
  "ms-MY": "Malay",
  "ml-IN": "Malayalam",
  "mt-MT": "Maltese",
  "mi-NZ": "Maori",
  "mr-IN": "Marathi",
  "mn-MN": "Mongolian",
  "my-MM": "Myanmar (Burmese)",
  "ne-NP": "Nepali",
  "no-NO": "Norwegian",
  "ps-AF": "Pashto",
  "fa-IR": "Persian",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "pa-IN": "Punjabi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sm-WS": "Samoan",
  "gd-GB": "Scots Gaelic",
  "sr-RS": "Serbian",
  "st-ZA": "Sesotho",
  "sn-ZW": "Shona",
  "sd-PK": "Sindhi",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sl-SI": "Slovenian",
  "so-SO": "Somali",
  "es-ES": "Spanish",
  "su-ID": "Sundanese",
  "sw-KE": "Swahili",
  "sv-SE": "Swedish",
  "tg-TJ": "Tajik",
  "ta-IN": "Tamil",
  "te-IN": "Telugu",
  "th-TH": "Thai",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "ur-PK": "Urdu",
  "ug-CN": "Uyghur",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "cy-GB": "Welsh",
  "xh-ZA": "Xhosa",
  "yi-UA": "Yiddish",
  "yo-NG": "Yoruba",
  "zu-ZA": "Zulu",
};

selectTag.forEach((tag, id) => {
  for (const countriesCode in countries) {
    // For Default Language...
    let selected;
    if (id == 0 && countriesCode == "en-US") {
      selected = "selected";
    } else if (id == 1 && countriesCode == "ur-PK") {
      selected = "selected";
    }

    // For Options....
    let option = ` <option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

// Translate Btn:
translateBtn.addEventListener("click", () => {
  let text = fromText.value;
  translateFrom = selectTag[0].value;
  translateTo = selectTag[1].value;

  let api_Url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  fetch(api_Url)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });
});

// Copy / Speaker Functionality:
icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("copy")) {
      if (target.id === "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id === "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
