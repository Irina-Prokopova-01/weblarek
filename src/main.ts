import './scss/styles.scss';
import { apiProducts} from "./utils/data.ts";
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
// import { Modal } from "./components/Views/Modal.ts";
import { CardCatalog } from "./components/Views/CardCatalog.ts";
import { cloneTemplate } from "./utils/utils";

const buyerModel = new Buyer();
console.log(`Данные покупателя`, {buyerModel});

const basketModel = new Basket();
console.log(`Корзина создана`, {basketModel});

const productsModel = new Products();
productsModel.saveProducts(apiProducts.items);
console.log(`Массив товаров из каталога:`, productsModel.getProducts());
console.log(`Находим товар по id:`, productsModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));

const selectProduct1 = productsModel.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
const selectProduct2 = productsModel.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
if (selectProduct1 && selectProduct2) {
    productsModel.saveSelectProduct(selectProduct1);
    productsModel.saveSelectProduct(selectProduct2);

    basketModel.addBasketProduct(selectProduct1);
    basketModel.addBasketProduct(selectProduct2);
    console.log(`Товары добавленные в корзину`, basketModel.getBasketProducts());
    console.log(`Получаем выбранные товары`, productsModel.getSelectProduct());
    console.log(`Получаем общую сумму выбранных товаров`, basketModel.getBasketTotal());
    console.log(`Получаем колличество выбранных товаров`, basketModel.getBasketProductsCount());
    basketModel.deleteBasketProduct(selectProduct1);
    console.log(`Получаем выбранный товар после удаления`, productsModel.getSelectProduct());
    console.log(`Получаем общую сумму выбранных товаров после удаления товара`, basketModel.getBasketTotal());
    console.log(`Проверяем есть ли товар в корзине по id`, basketModel.getBasketProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));

}

buyerModel.saveBuyerAddress("г.Истра, пл.Революции, 5");
buyerModel.saveBuyerEmail("irina-prokopova.style@yandex.ru");
buyerModel.saveBuyerPhone("+79139397935");
buyerModel.saveBuyerPayment("");

console.log(`Информация о покупателе`, buyerModel. getBuyerData());
console.log(`Валидация данных покупателя`, buyerModel. validateBuyer());
buyerModel.clearBuyer()
console.log(`Информация о покупателе после удаления`, buyerModel. getBuyerData());


const api = new Api(API_URL);
const server = new Server(api);

server.getProduct()
    .then((products) => {
        productsModel.saveProducts(products.items);
        console.log(`Список товаров с сервера`, productsModel.getProducts());
    })
    .catch((err) => {
        console.error(`Товары не загружены:`, err);
    });

const events = new EventEmitter();
const headerContainer = ensureElement<HTMLElement>('.header')
const header = new Header(headerContainer, events);

header.counter = 5;
console.log('Счетчик установлен в 5');

events.on('basket:open', () => {
    console.log('✅ Событие basket:open сработало!');
});

const galleryContainer = ensureElement<HTMLElement>(".gallery");

const gallery = new Gallery(galleryContainer);

server.getProduct()
    .then((products) => {
        productsModel.saveProducts(products.items);
        console.log(`Список товаров с сервера`, productsModel.getProducts());
        const testCardElements = productsModel.getProducts().map(card => {
            const div = document.createElement('div');
            div.className = 'card';
            div.textContent = card.title;
            return div;
        });

        // gallery.render({ catalog: testCardElements });
        console.log(`Галерея обновлена данными с сервера`, gallery.render({ catalog: testCardElements }));
        console.log(`Количество карточек:`, galleryContainer.children.length);
    })
    .catch((err) => {
        console.error(`Товары не загружены:`, err);
    });

// const modalContainer = ensureElement<HTMLElement>("#modal-container");
//
// const modal = new Modal(modalContainer);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");

events.on("products:changed", () => {
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

