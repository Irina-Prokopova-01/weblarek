# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

#### Данные

##### Интерфейсы товаров которые будут использоваться в приложении:

interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

Интерфейс покупателя:

interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

##### Модели данных:

Для хранения товаров, которые можно купить в приложении

class Products {
    items: IProduct[];
    selectItem: IProduct | null;
}

  Поля класса:
      * хранит массив всех товаров
      * хранит товар, выбранный для подробного отображения

  Методы класса:
      * получение массива товаров из модели
      getProducts(): IProduct [],
      * сохранение массива товаров полученного в параметрах метода
      saveProducts(products: IProduct[]): void,
      * получение одного товара по его id;
      getProductById(id:string): IProduct | undefined,
      * сохранение товара для подробного отображения
      saveSelectProduct(product: IProduct): void
      * получение товара для подробного отображения
      getSelectProduct(): IProduct | null

Для хранения товаров, которые пользователь выбрал для покупки

class Basket{
    products: IProduct[];
}

  Поля класса:
      * хранит массив всех товаров выбранных покупателем

  Методы класса:
      * получение массива товаров, которые находятся в корзине
      getBasketProducts(): IProduct[]
      * добавление товара, который был получен в параметре, в массив корзины
      addBasketProduct(product: IProduct): void
      * удаление товара, полученного в параметре из массива корзины
      deleteBasketProduct(product: IProduct): void
      * очистка корзины
      clearBasket(): void
      * получение стоимости всех товаров в корзине
      getBasketTotal(): number
      * получение количества товаров в корзине
      getBasketProductsCount(): number
      * проверка наличия товара в корзине по его id, полученного в параметр метода
      getBasketProductById(id: string): boolean

Данные покупателя, которые тот должен указать при оформлении заказа

class Buyer() {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}

  Поля класса:
      * хранит вид оплаты
      * почтовый адреc
      * электронный адрес
      * телефон

  Методы класса:
      * получение всех данных покупателя
      getBuyerData(): IBuyer,
      * сохранение данных об адресе в моделе
      saveBuyerAddress(address: string): void,
      * сохранение данных об электронном адресе в моделе
      saveBuyerEmail(email: string): void,
      * сохранение данных о телефоне в моделе
      saveBuyerPhone(phone: string): void,
      * метод который проверяет данные покупателя и возвращает результат проверки
      validateBuyer(): boolean | {},
      * очистка данных покупателя
      clearBuyer(): void,


#### Слой коммуникации

##### Класс Api

Kласс, который представляет коммуникационный слой — он отвечает за получение данных
с сервера и отправку данных на сервер.

   Методы класса:
      * get запрос на эндпоинт /product/ и возвращает объект, полученный от сервера, 
        в котором находится массив товаров
        get<T extends object>(uri: string)
      * post запрос на эндпоинт /order/ и передаёт в него данные, полученные в 
        параметрах метода, а возвращает объект, подтверждающий покупку на определенную сумму
        post<T extends object>(uri: string, data: object, method: ApiPostMethods = 'POST')


#### Слой View

Базовый класс для форм, содержит общий функционал.

class BaseForm () {
    submitFormButton: HTMLButtonElement;
    errorFormElement: HTMLElement;
}

    Поля класса:
        * хранит кнопку формы
        * текст ошибки

    Методы класса:
        * информация об ошибке
        set error (value: string),
        * переключатель отправки формы
        set valid(value: boolean)

    constructor(container: HTMLElement) - Передает контейнер (HTML-элемент) блока order в родительский класс Component

Класс для отображения спика товаров, стоимости в корзине и кнопку оформления заказа.

class BasketViews () {
    basketButtonOrder: HTMLButtonElement;
    basketPrice: HTMLElement;
    basketList: HTMLElement;
}

    Поля класса:
        * хранит кнопку "Оформить" заказ
        * инфо о сумме заказа в карзине
        * список товаров в корзине

    Методы класса:
        * деактивирует кнопку
        set buttonDisabled(value: boolean),
        * инфо о стоимости товаров
        set price(value: string)
        * отрисовка списка товаров в корзине
        set items(values: HTMLElement[])

    constructor(container: HTMLElement) - Передает контейнер (HTML-элемент) блока basket в родительский класс Component

Базовый класс с общим для всех карточек функционалом.

class Card () {
    cardTitleElement: HTMLElement;
    cardPriceElement: HTMLElement;
}

    Поля класса:
        * хранит наименование товара
        * цена товара

    Методы класса:
        * устанавливает наименование товара
        set title(value: string),
        * устанавливает цену товара
        set price(value: number | null) 

    constructor(container: HTMLElement) - Передает контейнер (HTML-элемент) блока card в родительский класс Component


Класс для отрисовки товара внутри корзины.

class CardBasket () {
    cardBasketDelete: HTMLButtonElement;
    cardBasketIndex: HTMLElement;
}

    Поля класса:
        * хранит номер товара в корзине
        * хранит кнопку удаления товара из корзины

    Методы класса:
        * отвечает за изменение номера товара в корзине
        set index(value: string)

    constructor(container: HTMLElement, actions?: ICardBasketActions) - Привязывает событие удаления к переданному колбэку и передает контейнер (HTML-элемент) блока card в родительский класс Component

Класс для отрисовки КАРТОЧКИ ТОВАРА в каталоге (котегория, фото).

class CardCatalog () {
    imageElement: HTMLImageElement;
    categoryElement: HTMLElement;
}

    Поля класса:
        * хранит категорию товара
        * хранит изображение товара

    Методы класса:
        * отвечает за изменение категории товара
        set category(value: string)
        * отвечает за изменение изображения товара
        set image(value: string)

    constructor(container: HTMLElement, actions?: ICardActions) - Привязывает клик для открытия карточки и передает контейнер (HTML-элемент) блока card в родительский класс Component


Класс для отрисовки подробной инфо. о товаре (категория, фото).

class class CardPreview () {
    imageElement: HTMLImageElement;
    categoryElement: HTMLElement;
    descriptionElement: HTMLElement;
    buttonElement: HTMLButtonElement;
}

    Поля класса:
        * хранит категорию товара
        * хранит изображение товара
        * хранит описание товара
        * хранит кнопку товара

    Методы класса:
        * отвечает за изменение категории товара
        set category(value: string)
        * отвечает за изменение изображения товара
        set image (value: string)
        * отвечает за изменение кнопки карточки товара
        set buttonText(value: string) 
        * отвечает за изменение состояние кнопки действия товара
        set buttonDisabled(value: boolean) 

    constructor(container: HTMLElement, action?:ICardPreviewActions ) - Проверяет, передан ли обработчик onToggle в объекте action и принимает корневой HTML-элемент блока card

Класс содержит контактные данные покупателя (телефон, адрес).

class ContactForm () {
    emailInputContactForm: HTMLInputElement;
    phoneInputContactForm: HTMLInputElement;
}

    Поля класса:
        * хранит адрес эл. почты
        * хранит номер телефона

    Методы класса:
        * отвечает за поле ввода email
         set email (value: string) 
        * отвечает за поле ввода номер телефона
        set phone (value: string) 

    constructor(container: HTMLElement, actions?: IContactFormActions) - Привязывает клик для открытия карточки и передает контейнер (HTML-элемент) блока order в родительский класс Component

Класс для отрисовки списка карточек товаров.

class Gallery () {
    catalogElement: HTMLElement;
}

    Поля класса:
        * хранит каталог (карточки товаров)
  

    Методы класса:
        * отвечает за отображение списка карточек товаров
         set catalog(items: HTMLElement[])

    constructor(container: HTMLElement) - Передает контейнер (HTML-элемент) блока gallery в родительский класс Component


Класс отрисовки корзины (кнопка открытия корзины и колличество товаров в ней)

class Header() {
    counterElement: HTMLElement;
    basketButton: HTMLButtonElement;
}

    Поля класса:
        * хранит кнопку открытия корзины
        * хранит 

    Методы класса:
        * отвечает за устанавливку количества товаров в корзине и обновляет отображение счетчика
         set counter(value: number)  

    constructor(container: HTMLElement, protected events: IEvents) - Привязывает клик для открытия корзины и передает контейнер (HTML-элемент) блока header в родительский класс Component

Класс отвечает за отображение модального окна и его содержимого. 
Управляет открытием, закрытием и отображением содержимого модального окна.

class Modal () {
    contentModal: HTMLElement;
    closeModal: HTMLElement;
}

    Поля класса:
        * хранит кнопку закрытия модального окна
        * хранит контейнер для отображения содержимого модального окна

    Методы класса:
        * отвечает за устанавку содержимого модального окна
         set content(value: HTMLElement)

    constructor(container: HTMLElement) - Хранит контейнер для отображения содержимого модального окна.


Класс отрисовывает форму выбора способа оплаты и ввода адреса доставки.

class OrderForm  () {
    cardOrderButton: HTMLButtonElement;
    cashOrderButton: HTMLButtonElement;
    addressOrderInput: HTMLInputElement;
}

    Поля класса:
        * хранит кнопку выбора оплаты банковской картой
        * хранит кнопку выбора оплаты при получении

    Методы класса:
        * отвечает за устанавку выбранного способ оплаты.
         set payment(value: TPayment | "") 
        * отвечает за устанавливку адрес доставки
        set address(value: string)

    constructor(container: HTMLElement, actions?: IOrderFormActions)  - Принимает корневой HTML-элемент блока order и привязывает ввод

Класс отвечает за отрисовку окна подтверждения успешного заказа.

class OrderSuccess () {
    successOrderCheck: HTMLElement;
    successOrderButton: HTMLButtonElement;
}

    Поля класса:
        * хранит кнопку перенаправляющую в каталог товаров
        * хранит элемент с текстом и суммой заказа

    Методы класса:
        * отвечает за устанавку суммы заказа
         set description(value: string) 

    constructor(container: HTMLElement, actions?: ISuccessActions) - Принимает корневой HTML-элемент блока success и привязывает клик onClose


#### Список событий:

- изменение данных:
 * catalog: changed;
 * basket: changed;
 * buyer: changed;

- взаимодействие пользователя с интерфуйсом:
 * card: select;
 * basket: toggle;
 * basket: remove;
 * basket: open;
 * order: open;
 * contacts: open;

- события отрисовки:
 * preview: changed;
