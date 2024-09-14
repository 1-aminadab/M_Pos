import generateUniqueID from '../../utilities/uniqueIDGenerator';

export const Product = {
  name: 'Items', 
  properties: {
    name: 'string',
    _id: 'string',
    oddo_template_id: {type: 'int', optional: true},
    profileId: {type: 'int', optional: true},
    desc: {type: 'string', optional: true},
    price: {type: 'float', optional: true},
    quantity: 'int',
    image: {type: 'string', optional: true},
    category_id: {type: 'int', optional: true},
    item_variant: {type: 'string', optional: true},
    isFavourite: {type: 'bool',default:false, optional: true},
    store: {type: 'int', optional: true},
    tag: {type: 'string', optional: true},
    cost: {type: 'float', optional: true},
    internal_reference: {type: 'string', optional: true},
    tax: {type: 'float', optional: true},
    vendor: {type: 'string', optional: true},
    sales: 'int', 
    timestamp: {type: 'string', optional: true}
  },
  primaryKey: '_id',
};

export const Variant = {
  name: 'Variant',
  properties: {
    _id: 'string',
    option_name: 'string',
    option_value: {type: 'string', optional: true},
  },
  primaryKey: '_id',
};
export const Payment = {
  name: 'Payment',
  properties: {
    _id: 'string',
    bank: 'string',
    full_name:{type: 'string', optional: true},
    account_num: 'int',

  },
  primaryKey: '_id',
};

export const Finance = {
  name: 'Finance',
  properties: {
    VAT: {type: 'float', optional: true},
    CURRENCY: {type: 'string', optional: true},
  },
};

export const  persistDatas = {
  name:'Persist',
  properties: {
    lockPin:{type:'string', optional:true, default:undefined},
    currentLanguage:{type:'string',default:"en", optional:true}
  }
}

export const Intro = {
  name: 'Intro',
  properties: {
    started: 'bool',
    loginConfetti: {type: 'bool', optional: true},
    addProductConfetti: {type: 'bool', optional: true},
    transactionConfetti: {type: 'bool', optional: true},
    paymentConfetti: {type: 'bool', optional: true},
    syncProduct: {type: 'bool', optional: true},
  },
};

export const Post = {
  name: 'Post',
  properties: {
    post_number: 'int',
    total_likes: 'int',
    total_comments: 'int',
  },
};

export const Notification = {
  name: 'Notification',
  properties: {
    id:'string',
    sender_id:'string?',
    recepient_id: 'string',
    title: 'string',
    body: 'string',
    action: 'string?',
    link:'string',
    seen: 'bool',
    time:'date',
    type:'string',
    product_name:'string?',
  },
  primaryKey: 'id',
};

export const Sold_Items = {
  name: 'Sold_Items',
  properties: {
    _sold_id: 'int',
    order_no: {type: 'string', optional: true},
    total_price: 'float',
    tax_rate: 'float',
    sub_total: 'float',
    discount_amount: 'float',
    sold_date: 'date',
    buyer_id: {type: 'string', optional: true},
    buyer_name: {type: 'string', optional: true},
    buyer_tin: {type: 'string', optional: true},
    payment_method: {type: 'string', optional: true},
    payment_status: {type: 'bool', optional: true},
    acknowledged : {type: 'bool', optional: true},
    payment_date: {type: 'string', optional: true},
    sold_items: 'string[]', //For storing sold_items in a way of String array like [id # name # price # quantity]
  },
  primaryKey: '_sold_id',
};

export const PassedDataSchema = {
  name: 'PassedData',
  properties: {
    oddo_template_id: 'int?',
    quantity: 'int',
  },
};
export const Ordered_items = {
name:'Ordered_items',
properties: {
  soldItemID: 'int', // Assuming soldItemID is of type number
  passedData: 'PassedData[]', // Define an array of PassedData objects
},
primaryKey: 'soldItemID',
}

export const Sale_Draft = {
  name: 'Sale_Draft',
  properties: {
    draft_id: 'int',
    items: 'string[]',
    customer_id: {type: 'int', optional: true},
    discount: {type: 'int', optional: true},
    sub_total: 'float',
    tax_rate: {type: 'float', optional: true},
    total: 'float',
    date: {type: 'string', optional: true},
  },
  primaryKey: 'draft_id',
};

export const Stock_History = {
  name: 'Stock_History',
  properties: {
    _stock_history_id: 'int',
    status: 'string',
    customer_id: {type: 'int', optional: true},
    stock_items: 'string[]',
    stock_in_qty: {type: 'int', optional: true},
    time: 'date',
  },
  primaryKey: '_stock_history_id',
};

export const CategoryList = {
  name: 'Category',
  properties: {
    id: 'int',
    name: 'string',
    profileId: {type: 'int', optional: true},
  },
  primaryKey: 'id',
};

export const StoreManagements = {
  name: 'StoreManagement',
  properties: {
    id: 'int',
    name: 'string',
    license: {type: 'string', optional: true},
    address: {type: 'string', optional: true},
    profileId: {type: 'int', optional: true},
  },
  primaryKey: 'id',
};

export const myProfileData = {
  name: 'MyProfileData',
  properties: {
    _id: 'int',
    fullname: 'string',
    email: 'string?',
    phone: 'string?',
    license: 'string?',
    organization: 'string?',
    tin: 'string?',
    phonecode: 'string?',
  },
  primaryKey: '_id',
};
export const Customer = {
  name: 'Customer',
  properties: {
    _id: 'int',
    fullname: 'string',
    email: 'string?',
    phonecode: 'string',
    phone: 'string',
    address: 'string?',
    tin: 'string?',
  },
  primaryKey: '_id',
};
export const Image = {
  name: 'Image',
  properties: {
    _id: 'int',
    name: 'string',
    type: 'string',
    uri: 'string',
  },
  primaryKey: '_id',
};

export const Profile = {
  name: 'Profile',
  properties: {
    _id: 'string',
    fullname: 'string',
    password: 'string',
    email: 'string?',
    phone: 'string?',
    license: 'string?',
    organization: 'string?',
    tin: 'string?',
    phonecode: 'string?',
  },
  primaryKey: '_id',
};
export const Printer = {
  name: 'Printer',
  properties: {
    _id: 'int',
    selected_preference: 'string',
    printer_ip: 'string',
    printer_port: 'string',
    paper_width: 'string',
  },
  primaryKey: '_id',
};
