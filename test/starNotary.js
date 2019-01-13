//import 'babel-polyfill';
const StarNotary = artifacts.require('./StarNotary.sol')

let instance;
let accounts;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
    
  });

  it('can Create a Star', async() => {
    await sleep(200);
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    let resultedstar = await instance.tokenIdToStarInfo(tokenId);
    assert.equal(resultedstar, 'Awesome Star!')
  });

  it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    
    let starPrice = web3.utils.toWei(".01", "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
  });

  
  it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    
    let starPrice = web3.utils.toWei(".01", "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1)
    assert.equal(Number(balanceOfUser1BeforeTransaction) + Number(starPrice), Number(balanceOfUser1AfterTransaction));
  });

  it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    
    let starPrice = web3.utils.toWei(".01", "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    
    let starPrice = web3.utils.toWei(".01", "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2)
    assert.equal(Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar), starPrice);
  });
  it('token name and symbol are added properly', async() => {
    let symbol = await instance.symbol.call()
    let name = await instance.name.call()
    assert.equal(name+symbol,"StarNotarySTN")
  });
  it('can retrieve a star obj with the tokenID', async() => {
    let starId = 6;
    
    await instance.createStar('Awesome Star2!', starId, {from: accounts[5]})
    let StarInfo = await instance.lookUptokenIdToStarInfo.call(starId);
    assert.equal(StarInfo, 'Awesome Star2!')
  });
  
  it('can exchange two star', async() => {
    let StarAdress0 = await instance.ownerOf(6);
    await instance.exchangeStars(5,6);
    let StarAddress1 = await instance.ownerOf(5);
    assert.equal(StarAdress0, StarAddress1)
  });

  it('can transfer star', async() => {
    let user1 = accounts[9]
    let user2 = accounts[8]
    let starId = 7;
    
    await instance.createStar('AAA', starId, {from: user1})
    await instance.transferStar(user2,7);
    assert.equal(await instance.ownerOf(7), user2)
  });
  // Write Tests for:

// 1) The token name and token symbol are added properly.
// 2) 2 users can exchange their stars.
// 3) Stars Tokens can be transferred from one address to another.
