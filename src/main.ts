import './scss/styles.scss';
import { apiProducts} from "./utils/data.ts";
import { Products } from "./components/Models/Products.ts";

const productsModel = new Products();
productsModel.saveProducts(apiProducts.items);
console.log(`Массив товаров из каталога:`, productsModel.getProducts())
// import { Api } from './components/base/Api'
// import { API_URL } from './utils/constants';
//
// const api = new Api(API_URL);