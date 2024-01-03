const createNewProduct = async (
  productName,
  productPrice,
  productDescription,
) => {
  const res = await fetch(
    `http://localhost:2000/createProduct.php?name=${productName}&price=${productPrice}&desc=${productDescription}`,
  );

  const json = await res.json();
  console.log(JSON.stringify(json));
};
