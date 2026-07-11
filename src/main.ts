import './scss/styles.scss';
import { apiProducts} from "./utils/data.ts";
import { Products } from "./components/Models/Products.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { Basket } from "./components/Models/Basket.ts";

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

// import { Api } from './components/base/Api'
// import { API_URL } from './utils/constants';
//
// const api = new Api(API_URL);