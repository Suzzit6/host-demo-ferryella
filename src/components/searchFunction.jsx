// Import a library for string similarity (you'll need to install this)
import stringSimilarity from 'string-similarity';

export const searchProducts = (products, searchTerm) => {
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  function getUniqueNewArrivals(products, limit = 3) {
    if (typeof products !== 'object' || products === null) {
      return [];
    }
  
    let allProducts = Array.isArray(products) ? products : (Array.isArray(products.products) ? products.products : []);
  
    // Use a Map to keep track of unique products by their ID
    const uniqueProductsMap = new Map();
  
    // Sort products by creation date and add to the map
    allProducts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
      .forEach(product => uniqueProductsMap.set(product._id, product));
  
    // Add products marked as "isNew_" to the map (if not already present)
    allProducts
      .filter(product => product.isNew_)
      .forEach(product => {
        if (!uniqueProductsMap.has(product._id)) {
          uniqueProductsMap.set(product._id, product);
        }
      });
  
    // Convert the map values back to an array
    return Array.from(uniqueProductsMap.values());
  }
  
  // Usage:
  if (lowercasedSearchTerm === 'newarrivals') {
    const uniqueNewArrivals = getUniqueNewArrivals(products);
    console.log("Unique New Arrivals:", uniqueNewArrivals);
    return uniqueNewArrivals;
  }
  const filteredproduct =  products.filter(product => {
    if(lowercasedSearchTerm !== 'newarrivals'){
    // Fields to search in
    console.log("in search product filter ");
    const fieldsToSearch = [
      product.name,
      product.description,
      product.Brand,
      product.Color,
      product.detail,
      ...(product.ProductTags || []),
      ...(product.subCategory ? Object.values(product.subCategory[0]) : []),
      ...(product.category ? Object.values(product.category[0]) : []),
    ];

    // Combine all searchable text
    const searchableText = fieldsToSearch.join(' ').toLowerCase();

    // Check for exact matches or includes
    if (searchableText.includes(lowercasedSearchTerm)) {
      return true;
    }

    // Check individual words in the search term
    const searchWords = lowercasedSearchTerm.split(/\s+/);
    for (const word of searchWords) {
      if (searchableText.includes(word)) {
        return true;
      }
    }

    // Fuzzy matching for each field
    for (const field of fieldsToSearch) {
      if (typeof field === 'string') {
        const similarity = stringSimilarity.compareTwoStrings(lowercasedSearchTerm, field.toLowerCase());
        if (similarity > 0.4) { // You can adjust this threshold
          return true;
        }
      }
    }

    // Price range check
    if (lowercasedSearchTerm.includes('under') || lowercasedSearchTerm.includes('below')) {
      const priceMatch = lowercasedSearchTerm.match(/\d+/);
      if (priceMatch && product.currentprice <= parseInt(priceMatch[0])) {
        return true;
      }
    }

    return false;
  }
  }
);
console.log("filteredproduct", filteredproduct);
console.log("in search product filter test");
  return filteredproduct;
};


