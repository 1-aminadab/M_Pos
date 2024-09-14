import realm from '../../index';
import { Printer } from '../../schema/schemas';

export const getPrinterSetting = () => {
    const Printer = realm.objects('Printer');
    if (Printer) {
        return Printer;
    }

    return '0'; // Return 0 if the category object doesn't exist or the amount is not set
};

export const addPrinterSetting = newPrinter => {
    realm.write(() => {
        realm.create('Printer', newPrinter);
    });
};
// export const updatePrinterSetting = (printerID, UPDATED_DATA) => {
//     realm.write(() => {
//         let categoryName = realm.objectForPrimaryKey('Category', prevName);
//         if (categoryName) {
//             categoryName.name = newName ? newName : prevName;
//         }
//     });
// };

export const updatePrinterSetting = (settingId, UPDATED_DATA) => {
    realm.write(() => {
        const settingUpdate = realm.objectForPrimaryKey('Printer', settingId);
        if (settingUpdate) {
            // settingUpdate._id = settingUpdate._id;
            settingUpdate.selected_preference = UPDATED_DATA?.hasOwnProperty('selected_preference')
                ? UPDATED_DATA.selected_preference
                : settingUpdate.selected_preference;
            settingUpdate.printer_ip = UPDATED_DATA?.hasOwnProperty('printer_ip')
                ? UPDATED_DATA.printer_ip
                : settingUpdate.printer_ip;
            settingUpdate.printer_port = UPDATED_DATA?.hasOwnProperty('printer_port')
                ? UPDATED_DATA.printer_port
                : settingUpdate.printer_port;
            settingUpdate.paper_width = UPDATED_DATA?.hasOwnProperty('paper_width')
                ? UPDATED_DATA.paper_width
                : settingUpdate.paper_width;

        }
    });
};

export const deletePrinterSetting = settingId => {
    return new Promise((resolve, reject) => {
        realm.write(() => {
            const itemToBeDeleted = realm.objectForPrimaryKey('Printer', settingId);
            if (itemToBeDeleted) {
                realm.delete(itemToBeDeleted);
                resolve();
            } else {
                reject(new Error('Item not found'));
            }
        });
    });
};