# Лабораторная работа №3. Создание карточек

## Содержание

1. [Постановка задачи](#постановка-задачи)
2. [Тема](#тема)
3. [Сайт, выбранный за основу](#сайт-выбранный-за-основу)
4. [Результат работы](#результат-работы)
5. [Дополнительное задание](#дополнительное-задание)

## Постановка задачи

**Цель** данной лабораторной работы - знакомство с node, npm, написание простого приложения на JavaScript. В ходе выполнения работы, предстоит реализовать рендеринг карточек с продуктом, причём должно быть возмодно открыть каждую карточку для прост=мотра детальной информации.

## Тема

**Сборка ракетоносителей Ангара разных типов**

В соответствии с темой, карточки содержат информацию у разных ракетоносителях.


## Сайт, выбранный за основу

Российский сайт компании "Роскосмос", вкладка "Новости": https://www.roscosmos.ru/102/.

![Фото 1](assets/readme/roscosmos_website.png)

## Результат работы

![Фото 2](assets/readme/sign_operation_before.png)
![Фото 3](assets/readme/sign_operation_after.png)
![Фото 4](assets/readme/sign_operation_after.png)
![Фото 5](assets/readme/sign_operation_after.png)

## Дополнительное задание

При открытии подробной информации о ракетоносителе пользователя встречает **слайдер** с возможностью навигации по изображениям с помощью точек-индикаторов.

Для реализации используется библиотека Slick Carousel. Необходимо подключить необходимые файлы со стилями в ```<head>```:
```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
```
и скрипты для создания слайдера в ```<body>```:
```javascript
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
```
После успешного подключения всех необходимых файлов, достаточно поместить простой удобочитаемый html код в проект:
```html
<div class="my-slider">
    <div><img src="${data.src1}"></div>
    <div><img src="${data.src2}"></div>
    <div><img src="${data.src3}"></div>
</div>
```
и JavaScript код:
```javascript
$('.my-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
});
```
Скрипт получает элемент с классом "my-slider" и преобразовывает его в сложный, но отзывчивый слайдер с помощью метода ```slick()```. На вход метод принимает кортеж с параметрами слайдера, который необходимо создать. 

![Фото 6](assets/readme/sign_operation_after.png)
![Фото 7](assets/readme/sign_operation_after.png)
