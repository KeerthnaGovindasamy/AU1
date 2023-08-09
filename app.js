const HDWalletProvider = require('@truffle/hdwallet-provider');
const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');

const path = require('path');
const { Web3 } = require('web3');
const contractAbi = require('./src/abis/ProductDetails.json').abi;
const app = express();
const port = 4000;
let web3;
let contract;
let connection;
const mnemonic = 'rhythm muscle film warrior rally document feature aerobic cabbage burst crane orphan';
const contractAddress = '0x733d460a3E9283BE033388DA178107348aB3E0e5';
let provider;

provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic,
  },
  providerOrUrl: `https://rpc-mumbai.maticvigil.com/`,
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/manufacturer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
  });



  
app.post('/get-all-products', async (req, res) => {
  //const pid = req.params.pid;
  const pid1 = req.body.pid;
  let foundProduct = null;
  console.log(pid1);
  web3 = new Web3(provider); 
  contract = new web3.eth.Contract(contractAbi, contractAddress);
  try {
  
    const productCount = await contract.methods.productCount().call();

    const allProducts = [];
    for (let i = 1; i <= productCount; i++) {
      const product = await contract.methods.products(i).call();
      function formatTimestampToDateString(timestamp) {
        // const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        // return date.toDateString(); // OUTPUT -	Sat Feb 25 2023
        const date = new Date(timestamp * 1000); 
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      }
      
      const domDateString = formatTimestampToDateString(product.dom.toString());
      const doeDateString = formatTimestampToDateString(product.doe.toString());
      const dopDateString = formatTimestampToDateString(product.dop.toString());
      
      const serializedProduct = {
        id: product.id.toString(),
        product_name: product.product_name,
        mcompany_name: product.mcompany_name,
        mlocation: product.mlocation,
        //dom: product.dom.toString(),
        dom:domDateString,
        doe: doeDateString,
        rcompany_name: product.rcompany_name,
        rlocation: product.rlocation,
        dop: dopDateString,
      };
      //allProducts.push(serializedProduct);
      console.log(serializedProduct.id);
      console.log(typeof serializedProduct.id); // Check the data type of serializedProduct.id
console.log(typeof pid1);
//const serializedProductIdAsNumber = Number(serializedProduct.id);
      if (serializedProduct.id === pid1) {
        foundProduct = serializedProduct;
        break;
      }

     }
    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
    // const proId = 2
    // res.json(allProducts[proId]);
  } catch (error) {
    console.error('Error retrieving product information:', error.message);

    res.status(500).json({ error: 'Failed to retrieve product information' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/manufacturer`);
});
