## Тестовое задание Aviasales

> Ссылка на задание: [https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend](https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend)


## Используемые технологии
* **React** для реактивного манипулирования DOM деревом
* **Redux** для логики состояния приложения
* **Redux-thunk** для ассинхронных _actions_
* **React-redux** биндинг для redux
* **Reselect** для мемоизации и простоты использования селекторов

## Запуск

    git clone https://github.com/ValeriiMakhniuk/Aviasales_task.git
    cd Aviasales_task
    npm install
    npm start

## Суть задания

1. GET запрос для получения `searchId`
2. GET запрос c имеющимся `searchId` для получения `tickets` пока в ответе не придет поле `{..., stop: true}`. 
	> сервер может на один из запросов ответить ошибкой: 
	**решено с помощью рекурсивных вызовов функции выполняющей запрос**

3. Рендер первых 5-ти билетов
4. Возможность фильтрации как по кол-ву пересадок так и по критериям (_самый быстрый_, _самый дешевый_)
5. Возможность комбинированного фильтра
