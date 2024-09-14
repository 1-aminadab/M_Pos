import Realm from 'realm';
import {
  Product,
  CategoryList,
  myProfileData,
  Customer,
  Image,
  Sold_Items,
  Stock_History,
  Profile,
  Finance,
  Intro,
  Sale_Draft,
  Printer,
  Post,
  Notification,
  StoreManagements,
  Variant,
  Payment,
  Ordered_items,
  PassedDataSchema,
  persistDatas
} from './schema/schemas';
const schemaVersion = 36;

const realm = new Realm({
  schema: [
    Product,
    Sold_Items,
    CategoryList,
    Image,
    myProfileData,
    Customer,
    Stock_History,
    Profile,
    Finance,
    Intro,
    Sale_Draft,
    Printer,
    Post,
    Notification,
    StoreManagements,
    Variant,
    Payment,
    Ordered_items,
    PassedDataSchema,
    persistDatas,

  ],
  deleteRealmIfMigrationNeeded: false,
  schemaVersion: schemaVersion, // Use the updated schema version

  // Other configuration options (encryption, migration, etc.)
});
export default realm;
