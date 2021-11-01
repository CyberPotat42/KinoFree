# KinoFree Extension

Расширение, которое поможет вам смотреть любые фильмы с Кинопоиска бесплатно

Для онлайн просмотра фильмов используется агрегатор [Yohoho](https://github.com/4h0y/4h0y.github.io) - yohoho.cc

## Алгоритм работы

### На сайте kinopoisk.ru
* Если мы находимся на странице фильма и сериала:
  + Просто открываем этот фильм на пиратском сайте
* Если мы на другой странице:
  + Парсим все поддерживаемые ссылки на странице и показываем пользователю это список
  + Если найдена всего одна ссылка то сразу открываем
* Если ничего не можем найти, то просто игнорируем
  + Но если пользователь делает 3 попытки, то показываем предупреждение, что фильмов не найдено

### На сайте hd.kinopoisk.ru
> Здесь получить прямую ссылку на фильм можно только на вкладке `О фильме > Детали`

* Если на странице есть кнопка "Детали"
  + Нажимаем её
  + Ждем окончания анимации
  + Находим ссылку и открываем её
* Если нет ни кнопки не прямых ссылок:
  + Говорим пользователю что нужно выбрать фильм

### На любом другом сайте
* Пытаемся найти поддерживаемые ссылки
* Если реально смогли найти:
  + Нашли несколько ссылок - показываем пользователю
  + Нашли всего одну - сразу открываем
* Если ничего не нашли:
  + Говорим юзеру что фильмов не найдено
