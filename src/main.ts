import './scss/styles.scss';
// import { apiProducts} from "./utils/data.ts";
import { Products } from "./components/Models/Products.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { Basket } from "./components/Models/Basket.ts";
import {Api} from "./components/base/Api.ts";
import {API_URL} from "./utils/constants.ts";
import { Server } from "./components/Models/Server.ts";
import {Header} from "./components/Views/Header.ts";
import {ensureElement} from "./utils/utils.ts";
import {EventEmitter} from "./components/base/Events.ts";
import { Gallery} from "./components/Views/Gallery.ts";
import { Modal } from "./components/Views/Modal.ts";
import { CardCatalog } from "./components/Views/CardCatalog.ts";
import { cloneTemplate } from "./utils/utils";
// import {Card} from "./components/Views/Card.ts";
import { IProduct } from "./types";
import { CardPreview} from "./components/Views/CardPreview.ts";
import { BasketViews } from "./components/Views/Basket";
import {CardBasket} from "./components/Views/CardBasket.ts";
import { OrderSuccess } from "./components/Views/OrderSuccess";
import { ContactForm } from "./components/Views/ContactForm.ts";
import { OrderForm} from "./components/Views/OrderForm.ts";
import { TPayment } from "./types";

// Создание экземпляров класса моделей (инициализация)
const events = new EventEmitter();
const buyerModel = new Buyer(events);
console.log(`Данные покупателя`, {buyerModel});
const basketModel = new Basket(events);
console.log(`Корзина создана`, {basketModel});
const productsModel = new Products(events);


// Настройка взаимодействия с сервером
const api = new Api(API_URL);
const server = new Server(api);

server
    .getProduct()
    .then((products) => {
        productsModel.saveProducts(products.items);
        console.log(`Список товаров с сервера`, productsModel.getProducts());
    })
    .catch((err) => {
        console.error(`Товары не загружены:`, err);
    });


// Получение ДОМ элементов (инициализация контейнеров)
const headerContainer = ensureElement<HTMLElement>('.header')
const galleryContainer = ensureElement<HTMLElement>(".gallery");
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const CatalogPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const modalContainer = ensureElement<HTMLElement>("#modal-container");
const basketViewsTemplate = ensureElement<HTMLTemplateElement>("#basket");
const basketCardTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const contactsFormTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const OrderSuccessTemplate = ensureElement<HTMLTemplateElement>("#success");
const OrderFormTemplate = ensureElement<HTMLTemplateElement>("#order");

// Создание экземпляров классов Views (инициализация)
const header = new Header(headerContainer, events);
const gallery = new Gallery(galleryContainer);
const modal = new Modal(modalContainer);
const orderSuccess = new OrderSuccess(cloneTemplate(OrderSuccessTemplate), {
    onClose: () => {
        modal.close();
    },
});

const basket = new BasketViews(cloneTemplate(basketViewsTemplate), {
    onOrder: () => {console.log('Order clicked!');
        events.emit("order:open")
}});

// Обновление галереи товаров при изменении каталога. Обработка клика по товарной карточке.
events.on("catalog:changed", () => {
    const itemCards = productsModel.getProducts().map((item) => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
            onClick: () => {
                events.emit("card:select", item);
            },
        });
        return card.render(item);
    });
    gallery.render({
        catalog: itemCards,
    });
});

events.on<IProduct>("card:select", (item) => {
    console.log('Событие получено:', item);
    productsModel.saveSelectProduct(item);
});

const preview = new CardPreview(cloneTemplate(CatalogPreviewTemplate), {
    onToggle: () => {
        const product = productsModel.getSelectProduct();

        if (product) {
            events.emit("basket:toggle", product);
            modal.close();
        }
    },
});

// Обновление модального окна с деталями товара.
events.on("preview:changed", () => {
    const item = productsModel.getSelectProduct();

    if (!item) {
        console.log("Товар не выбран для предпросмотра");
        return;
    }

    if (item.price === null) {
        preview.buttonText = "Недоступно";
        preview.buttonDisabled = true;
    } else if (basketModel.getBasketProductById(item.id)) {
        preview.buttonText = "Удалить из корзины";
        preview.buttonDisabled = false;
    } else {
        preview.buttonText = "Купить";
        preview.buttonDisabled = false;
    }

    modal.content = preview.render(item);
    modal.open();
});

// Переключение состояния товара в корзине.
events.on<IProduct>("basket:toggle", (item) => {
    if (basketModel.getBasketProductById(item.id)) {
        basketModel.deleteBasketProduct(item);
    } else {
        basketModel.addBasketProduct(item);
    }
});

// Начальная инициализация корзины.
basket.buttonDisabled = true;
basket.price = '0';

// Обновление корзины при изменении.
events.on("basket:changed", () => {
    basket.buttonDisabled = basketModel.getBasketProducts().length === 0;
    basket.price = String(basketModel.getBasketTotal());
    //Создание карточек товаров
    const basketCardItems = basketModel.getBasketProducts().map((item, index) => {
        const basketCard = new CardBasket(cloneTemplate(basketCardTemplate), {
            onDelete: () => events.emit("basket:remove", item),
        });
        return basketCard.render({
            ...item,
            index: index + 1
        });
    });
    // Обновление UI
    basket.items = basketCardItems;
    header.counter = basketCardItems.length;
})

events.on<IProduct>("basket:remove", (product) => {
    basketModel.deleteBasketProduct(product);
});

/// Открытие корзины.
events.on("basket:open", () => {
    modal.content = basket.render();
    modal.open();
});

const order = new OrderForm(cloneTemplate(OrderFormTemplate), {
    onPayment: (payment) => {
        // эмитим событие, а не напрямую вызываем метод модели
        events.emit("buyer:payment", payment);
    },
    onAddress: (address) => {
        events.emit("buyer:address", address);
    },
    onSubmit: () => {
        events.emit("contacts:open");
    },
});

// Обработчики для сохранения данных покупателя
events.on("buyer:payment", (payment) => {
    buyerModel.saveBuyerPayment(payment);
});

events.on("buyer:address", (address) => {
    buyerModel.saveBuyerAddress(address);
});

// Обработчик события order:open:
events.on("order:open", () => {
    console.log('Событие order:open получено!');
    modal.content = order.render();
    modal.open();
});

// Функция показа успешного заказа
function viewOrderSuccess(data: { total: number }) {
    orderSuccess.description = `Списано ${data.total} синапсов`;
    // Очищаем модели перед показом успешного заказа
    basketModel.clearBasket();
    buyerModel.clearBuyer();
    modal.content = orderSuccess.render();
    modal.open();
}

// Инициализация формы и сбор данных покупателя.
const contacts = new ContactForm(cloneTemplate(contactsFormTemplate), {
    onEmail(email) {
        buyerModel.saveBuyerEmail(email);
    },

    onPhone(phone) {
        buyerModel.saveBuyerPhone(phone);
    },

    onSubmit() {
        const buyerData = buyerModel.getBuyerData();

        const orderData = {
            ...buyerData,
            total: basketModel.getBasketTotal(),
            items: basketModel.getBasketProducts().map((item) => item.id),
        };
        // Отправка заказа на сервер.
        server
            .postOrder(orderData)
            .then((result) => {
                viewOrderSuccess(result);
            })
            .catch((err) => {
                console.error(err);
            });
    },
});

// Открываем модальное окно и динамически рендерим форму.
events.on("contacts:open", () => {
    modal.content = contacts.render();
    modal.open();
});


// Валидируем данные и обновляем форму.
events.on("buyer:changed", () => {
    const buyerData = buyerModel.getBuyerData();
    const errors = buyerModel.validateBuyer();

    order.payment = buyerData.payment as TPayment | "";
    order.address = buyerData.address;

    contacts.email = buyerData.email;
    contacts.phone = buyerData.phone;

    // Улучшенная валидация для order
    const orderErrors = [errors.address, errors.payment].filter(Boolean).join('; ');
    order.valid = orderErrors.length === 0;
    order.error = orderErrors;

    // Улучшенная валидация для contacts
    const contactErrors = [errors.email, errors.phone].filter(Boolean).join('; ');
    contacts.valid = contactErrors.length === 0;
    contacts.error = contactErrors;
});

