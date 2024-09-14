import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Platform, Linking, Dimensions } from 'react-native';
// import RNFS from 'react-native-fs';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color } from '../../../styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getItems } from '../../../database/services/itemServices';
import { getCategory } from '../../../database/services/categoryServices.js';
import { RNFS, Base64 } from 'react-native-fs';
import { PDFDocument, Text as PDFText, View as PDFView } from 'react-native-pdf'; // Renaming the imports from react-native-pdf
import i18n from '../../../language/i18n';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProductReport = () => {
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState([]);
  const [pdfFilePath, setPdfFilePath] = useState('');
  console.log("/////////")
  const excludeProperty = (obj, propertyToExclude) => {
    const newObj = { ...obj }; // Create a shallow copy of the original object
  
    // Check if the property to exclude exists in the new object
    if (propertyToExclude in newObj) {
      delete newObj[propertyToExclude]; // Delete the property from the new object
    }
  
    return newObj; // Return the modified object
  };
  const checkProduct = getItems()?.map((product,index)=>{
    
    return excludeProperty(product,'image')
  })
  const filteredItems = getItems()?.map((product,index)=>{
    return {name:product.name,soldQuantity:product.sales ,onHandQuantity:product.quantity, id:index}
  })
  console.log(getCategory());
  console.log("/////////")

  // Example data for products
  const exampleProducts = [
    { id: 1, name: 'Laptop', soldQuantity: 20, onHandQuantity: 5, category: 'Electronics' },
    { id: 2, name: 'TV', soldQuantity: 15, onHandQuantity: 10, category: 'Electronics' },
    { id: 3, name: 'Chair', soldQuantity: 30, onHandQuantity: 20, category: 'Furniture' },
    
    // Add more example products as needed
  ];

  // Function to fetch products based on filter
  const fetchProducts = () => {
    // Filter products based on the filter text
    const filteredProducts = filteredItems.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  // Function to handle changes in the filter input
  const handleFilterChange = (text) => {
    setFilter(text);
    // Fetch products based on filter
    fetchProducts();
  };

  // Function to handle filtering products by category
  const handleCategoryFilter = (category) => {
    const filteredProducts = exampleProducts.filter(product =>
      category === 'all' || product.category.toLowerCase() === category.toLowerCase()
    );
    setProducts(filteredProducts);
  };
 
  useEffect(()=>{
    setTimeout(() => {
      setPdfFilePath('')
    }, 2000);
  },[pdfFilePath])
  // Function to handle exporting products to PDF
  const handleExportToPDF = async () => {
    try {
      const pdfPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
      const pdfName = 'product_report1.pdf';
      const pdfFilePath = `${pdfPath}/${pdfName}`;
      console.log("here is file path", pdfFilePath);
  
      // Generate PDF content
      let pdfContent = `Product Report\n\n`;
      products.forEach(product => {
        pdfContent += `Name: ${product.name}\n`;
        pdfContent += `Sold Quantity: ${product.soldQuantity}\n`;
        pdfContent += `On Hand Quantity: ${product.onHandQuantity}\n\n`;
      });
  
      // Encode content in Base64 format using react-native-base64
      const base64PdfContent = await Base64.encode(pdfContent);
  
      // Write Base64 content to PDF file
      await RNFS.writeFile(pdfFilePath, base64PdfContent, 'base64');
  
      console.log(`PDF saved at: ${pdfFilePath}`);
      setPdfFilePath(pdfFilePath);
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  };
  
  // Function to handle opening the exported PDF file
  const handleOpenPDF = async () => {
    try {
      if (pdfFilePath) {
        const sourceUri = pdfFilePath;
        const destUri = `${RNFS.DocumentDirectoryPath}/product_report.pdf`;
  
        // Copy the PDF file to the app's sandboxed storage
        await RNFS.copyFile(sourceUri, destUri);
  
        // Get the URI for the copied file
        const uri = Platform.OS === 'android' ? `file://${destUri}` : destUri;
  
        // Check if the URL can be opened
        const supported = await Linking.canOpenURL(uri);
        if (supported) {
          // Open the URL
          await Linking.openURL(uri);
        } else {
          console.error('Cannot open PDF');
        }
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };
  
  // useEffect to fetch products initially
  useEffect(() => {
    fetchProducts();
  }, []);

  // Render item function for FlatList
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.quantity}> {item.soldQuantity}</Text>
      <Text style={styles.quantity}> {item.onHandQuantity}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{i18n.t("name")}</Text>
      <Text style={styles.headerText}>{i18n.t("sold")}</Text>
      <Text style={styles.headerText}>{i18n.t("on_hand")}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View>
        <TopNavigationBar
        NavigationTitle={i18n.t("report")}
        backIcon={false}
        IsSetting={false}
        
        />
      </View>
      <View style={{flex:1, padding:10}} >
      <Text style={styles.header}>{i18n.t("report")}</Text>
      <TextInput
        style={styles.input}
        placeholder={`${i18n.t("product")} ${i18n.t("filter")}`}
        value={filter}
        onChangeText={handleFilterChange}
      />
      <View style={styles.filterButtons}>
        <TouchableOpacity  style={{backgroundColor:color.primary, padding:5, paddingHorizontal:10, borderRadius:5}} onPress={() => handleCategoryFilter('all')} >
          <Text style={{color:color.white}}>All</Text>
        </TouchableOpacity>
        {/* Add buttons for other categories */}
      </View>
      <FlatList
        data={filteredItems}
        style={{borderWidth:1,borderColor:color.deepLightGray,marginBottom:10,overflow:"hidden",borderRadius:10,}}
        ListHeaderComponent={renderHeader} 
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={products.length === 0 && styles.emptyList}
      />
      <TouchableOpacity style={styles.exportButton} onPress={handleExportToPDF}>
        <Text style={styles.exportText}>{i18n.t("export_to_PDF")}</Text>
      </TouchableOpacity>
      {pdfFilePath ? (
        <View style={styles.savedCard}>
          <Text style={styles.savedText}>PDF Saved Successfully!</Text>
            <MaterialIcons name="done-outline" size={24} color="black" />     
        </View>
      ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.black, // green color
  },
  input: {
    height: 40,
    borderColor: color.deepLightGray,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:10
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap:10,
    justifyContent:"flex-start"
    
  },
  productItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
    flex:1
  },
  quantity: {
    fontSize: 14,
    color: '#666666',
    textAlign:"center",
    flex:1
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  exportButton: {
    backgroundColor: color.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  exportText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyList: {
    alignItems: 'center',
  },
  savedCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    position:"absolute",
    top:'40%',
    left:"20%"
  },
  savedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  
  openButton: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', // Background color for headers
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderTopEndRadius: 10,
    borderTopStartRadius:10,
    marginBottom: 10, // Add some margin bottom
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.black, // Use the primary color for headers
    flex: 1, // Equal width for each header
    textAlign: 'center', // Center align text
  },
});

export default ProductReport;
