function main() {
  const kp_reg = /https:\/\/www\.kinopoisk\.ru\/(film|series)\/(\d{1,9})\/.*/g
  const kphd_reg = /https:\/\/hd\.kinopoisk\.ru.*/g

  var url = window.location.toString()
  if (kp_reg.test(url)) { kp_parse() }
  else if (kphd_reg.test(url)) { kphd_parse() }
  else unknown_parse();
}

main();

// - разные методы парсинга - //

function kphd_parse() { // парсим кинопоиск хд
  if (get_button("Детали") === undefined) { alert("Сначала выберите фильм") }
  else {
    get_button("Детали").click(); // программно кликаем на кнопку
    setTimeout(function () {
      var urls = get_urls();
      if (urls === []) { alert("Очень странно, но наши лучшие котики-сыщики не смогли найти ни одной поддерживаемой ссылки"); } else {
        window.open(url_replace(urls[0]), "_blank");
      }
    }, 500);
  }
}

function kp_parse() { // парсим обычный кинопоиск
  window.open('https://4h0y.gitlab.io/#' + get_url_id(window.location.toString()), "_blank");
}

async function unknown_parse() { // неизвестная страница
  let urls = get_urls();
  let ids = [];
  for (let i = 0; i < urls.length; ++i) {
    let id = get_url_id(urls[i]);
    if (ids.indexOf(id) == -1) ids.push(id);
  }
  ids.reverse();

  if (ids.length == 0) {
    alert("Упс! Наши лучшие котики-сыщики не смогли найти ни одну поддерживаемую ссылку на этом сайте :(")

  } else if (ids.length == 1) {
    window.open('https://4h0y.gitlab.io/#' + ids[0]);

  } else {
    document.body.style.cursor = 'wait'; // меняем курсор на лоадинг
    let names = await get_names(ids);
    alert("Найденные фильмы: " + names.join(", "));
    document.body.style.cursor = 'default'; // возвращаем обычный курсор
  }
}

// - полезные функции - //

async function get_names(ids) {
  const timer = ms => new Promise(res => setTimeout(res, ms))

  var data;
  const output = [];
  for (var i = 0; i < ids.length; i++) {
    await timer(50); // - 20 requests/sec
    data = await get_film_data(ids[i])
    output.push(data.nameRu);
  }
  return output;
}

// - получаем информацию о фильме - //
async function get_film_data(id) {
  var output;
  await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + id, {
    method: 'GET',
    headers: {
      // if you are reading this please change this key to avoid limit overuse
      'X-API-KEY': '72511645-7690-43f7-a959-0308d26defa5',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .then(json => output = json).catch(err => console.log(err));
  return output;
}

function get_urls() { //- получаем все ссылки на странице -//
  var urls = [];
  for (var i = document.links.length; i-- > 0;)
    if (document.links[i].href.startsWith("https://www.kinopoisk.ru/film/") || document.links[i].href.startsWith("https://www.kinopoisk.ru/series/"))
      urls.push(document.links[i].href);
  return urls
}

function has_urls() {
  for (var i = document.links.length; i-- > 0;)
    if (document.links[i].href.startsWith("https://www.kinopoisk.ru/film/") || document.links[i].href.startsWith("https://www.kinopoisk.ru/series/")) return 1;
  return 0;
}

function get_url_id(url) {
  return url.match(/https:\/\/www\.kinopoisk\.ru\/(film|series)\/(\d{1,9})\/.*/)[2];
}

function get_button(text) {
  return Array.from(document.querySelectorAll('button')).find(e => e.textContent === text);
}

function url_replace(url) {
  return url.replace(/www\.kinopoisk\.ru\/(film|series)\//gi, '4h0y.gitlab.io/#');
}