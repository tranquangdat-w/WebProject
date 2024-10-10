async function fetchData() {
  const apiURL = 'http://127.0.0.1:8000/products/';
  
  try {
    const response = await fetch(apiURL);
    
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    
    const data = await response.json(); // Chuyển đổi dữ liệu thành JSON

    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Gọi hàm
export const products = await fetchData();