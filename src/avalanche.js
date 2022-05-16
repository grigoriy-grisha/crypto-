//Выбор кошелька
export async function Accept(id, callback) {
	if (id === 1) {
		web3providerMetamask(callback);
	} else {
		if (id === 2) {
		web3providerWalletConnect(callback);
		}
	}
}

let web3;
async function web3providerMetamask(callback){
	//Connectmetamask
	const WEB3_PROVIDER = "https://api.avax.network/ext/bc/C/rpc"
	// https://blog.polygon.technology/polygon-rpc-gateway-will-provide-a-free-high-performance-connection-to-the-polygon-pos-blockchain/
	if (typeof web3 !== 'undefined') {
			web3 = new window.Web3(web3.currentProvider);
			console.log("web3 already initialized.");
	} else {
			// set the provider you want from Web3.providers
			web3 = new window.Web3(new window.Web3.providers.HttpProvider(WEB3_PROVIDER));
			console.log("New web3 object initialized.");
	}
	getAccount(callback);
}

async function web3providerWalletConnect(callback){
	//An infura ID, or custom ETH node is required for Ethereum, for Binance Smart Chain you can just use their public endpoint
	var provider = new window.WalletConnectProvider.default(
	  {
			rpc: {43114: "https://api.avax.network/ext/bc/C/rpc"}
	  });
	//to set it to BSC, uncomment the following line
	//provider.chainId = 56;
	//present the Wallet Connect QR code
	provider.enable().then(function(res){
	  //get wallet addrs and then wrap this into the window.Web3 JS
	  let web3 = new window.Web3(provider);
	  //now do all the web3 stuff you want...
	  //awesome web3 application goes here
		var account0;
		web3.eth.getAccounts().then(function(result){
			account0 = result;
			console.log(account0);
			callback(account0);
		})
	});
}

async function disconnectWalletConnect(){
	var provider = new window.WalletConnectProvider.default(
	  {
			rpc: {43114: "https://api.avax.network/ext/bc/C/rpc"}
	  });
	provider.disconnect();
	window.location.reload();
}

async function getAccount(callback) {
	ToPolygonNet();
	window.ethereum
			.request({ method: 'eth_requestAccounts'})
			.then(callback)
			.catch((err) => {
					if (err.code === 4001) {
							console.log('Please connect to MetaMask.');
					} else {
							console.error(err);
					}
			});
}

async function PostAddressAccount() {
	window.ethereum
			.request({ method: 'eth_accounts' })
			.then(handleAccountsChanged)
			.catch(console.error);
  // Вывод количества нфт пользователю при загрузке страницы
  let total = parseInt(col.value) * costOneToken;
  document.getElementById('total').innerHTML = total;
}
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
				document.getElementById('result').innerHTML = 'CONNECT';
    } else {
				document.getElementById('result').innerHTML = accounts[0].slice (0, 6)+'..'+accounts[0].slice (38, 42);
    }
}
function AddPolygonNet(){
	window.ethereum.request({
	    method: 'wallet_addEthereumChain',
	    params: [{
	        chainId: web3.utils.toHex('43114'),
	        chainName: 'Avalanche Network',
	        nativeCurrency: {
	            name: 'AVAX',
	            symbol: 'AVAX',
	            decimals: 18
	        },
	        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
	        blockExplorerUrls: ['https://snowtrace.io']
	    }],
	})
	.then(() => console.log('network added'))
	.catch(() => console.log('could not add network'))
}
function ToPolygonNet() {
	window.ethereum.request({
	    method: 'wallet_switchEthereumChain',
	    params: [{ chainId: web3.utils.toHex('43114') }],
	})
	.then(() => console.log('network has been set'))
	.catch((e) => {
	    if (e.code === 4902) {
	       console.log('network is not available, add it');
				 AddPolygonNet();
	    } else {
	       console.log('could not set network');
	    }
	})
}

//eth_sendTransaction
export function transaction(id, amountOfBoxes,callback){
	if (id === 1) {
		web3providerMetamask(callback);
		const yourNetworkId = '43114'
		web3.eth.net.getId()
		.then((networkId) => {
		  if (networkId != yourNetworkId) {
		    // MetaMask network is wrong
				ToPolygonNet();
		  }
			else {
				transaction2(amountOfBoxes)
			}
		})
		.catch((err) => {
			// unable to retrieve network id
		});
	} else {
		transactionWalletConnect(amountOfBoxes,callback);
	}
}
//функция для транзакции в метамаск
export async function transaction2(amountOfBoxes) {
	const ethereum1 = window.ethereum

  const accounts = await ethereum1.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  var valueInWei = web3.utils.toWei(String(parseInt(amountOfBoxes) * costOneToken), 'ether');
	var value = web3.utils.toHex(valueInWei);
	await ethereum1.request({
		method: 'eth_sendTransaction',
		params: [
			{
				from: account, //Адрес счета с которого отправляюся токены - по умолчанию подключенный к сайте счет
				to: '0x79001190956dCb346E96a15F3716DD4E1f659cdF', //Адрес счета на который отправляются токены
				value: value //количество отправляемых токенов в зависимости от выбранного количества нфт
			},
		],
	});
}
//функция для транзакции WalletConnect
export async function transactionWalletConnect(amountOfBoxes,callback) {
		var provider = new window.WalletConnectProvider.default(
		  {
				rpc: {43114: "https://api.avax.network/ext/bc/C/rpc"}
		  });
		provider.enable().then(async function(res){
		  web3 = new window.Web3(provider);
			var account0;
	    web3.eth.getAccounts().then(function(result){
	      account0 = result[0];
				console.log(account0);
				callback(result)
				// handleAccountsChanged(account0);
				var valueInWei = web3.utils.toWei(String(parseInt(amountOfBoxes) * costOneToken), 'ether');
				var value = web3.utils.toHex(valueInWei);
				web3.eth.sendTransaction({
					from: account0, //Адрес счета с которого отправляюся токены - по умолчанию подключенный к сайте счет
					to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', //Адрес счета на который отправляются токены
					value: value //количество отправляемых токенов в зависимости от выбранного количества нфт
				});
	    });
		});
}
/*
// Отображение количества токенов и цены на странице
const maxQuantity = 10; //Максимальное количество нфт которое можно купить
const minQuantity = 1; // Минимальное количество нфт которое можно купить
document.getElementById('maxQuantity').innerHTML = maxQuantity;*/


let col = document.getElementById('col');
let plus = document.getElementById('plus');
let minus = document.getElementById('minus');
let costOneToken = 9;// Цена одного нфт
/*
plus.onclick = function() {
  var currentQuantity = parseInt(col.value);
  if (currentQuantity < maxQuantity){
    col.value = parseInt(col.value) + 1;
    let total = parseInt(col.value) * costOneToken;
    document.getElementById('total').innerHTML = total;
  };
}

minus.onclick = function() {
  var currentQuantity = parseInt(col.value);
  if (currentQuantity > minQuantity){
    col.value = parseInt(col.value) - 1;
    let total = parseInt(col.value) * costOneToken;
    document.getElementById('total').innerHTML = total;
  };
}
*/
