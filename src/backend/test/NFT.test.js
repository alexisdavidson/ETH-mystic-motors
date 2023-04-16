const { expect } = require("chai")
const keccak256 = require("keccak256")
const { MerkleTree } = require("merkletreejs")

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const getMerkleProof = (whitelist, acc) => {
    const accHashed = keccak256(acc.toString())
    const leafNodes = whitelist.map(e => keccak256(e.toString()));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    const hexProof = merkleTree.getHexProof(accHashed);

    return hexProof
}

describe("NFT", async function() {
    let deployer, addr1, addr2, addr3, addr4, addr5, nft
    let price = 0.025
    let pricePrimeList = 0.02375
    let unrevealedUri = 'unrevealedUri'
    let revealedUri = 'ipfs://bafybeiahekcekq7zqnft2wcbknbk6ysfms6dj57uskiltgbva4cfidemcq/'
    let teamWallet = ""
    let allowList = ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'] // addr1, addr2
    let primeList = ['0x90F79bf6EB2c4f870365E785982E1f101E93b906', '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'] // addr3, addr4
    let allowListRoot = "0x343750465941b29921f50a28e0e43050e5e1c2611a3ea8d7fe1001090d5e1436"
    let primeListRoot = "0x28ee50ccca7572e60f382e915d3cc323c3cb713b263673ba830ab179d0e5d57f"

    beforeEach(async function() {
        const NFT = await ethers.getContractFactory("NFT");

        [deployer, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
        teamWallet = deployer.address

        nft = await NFT.deploy(teamWallet, allowListRoot, primeListRoot);
    });

    describe("Deployment", function() {
        it("Should track name and symbol of the nft collection", async function() {
            expect(await nft.name()).to.equal("Mystic Motors")
            expect(await nft.symbol()).to.equal("MYSTIC")
        })
    })

    describe("Aidrop NFTs", function() {
        it("Should track each airdop NFT", async function() {
            await nft.connect(deployer).airdrop(addr1.address, 1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
        })
    })

    describe("Reveal NFTs", function() {
        it("Should reveal and update URI of NFTs", async function() {
            await nft.connect(deployer).airdrop(addr1.address, 1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);

            expect(await nft.tokenURI(1)).to.equal(unrevealedUri);
            await nft.connect(deployer).setRevealed(true);
            
            expect(await nft.tokenURI(1)).to.equal(revealedUri + '1.json');
        })
    })

    describe("Mint NFTs", function() {
        it("Should track minting NFTs for allowList", async function() {
            const allowListProof = getMerkleProof(allowList, addr1.address)

            await expect(nft.connect(addr1).mint(5, allowListProof)).to.be.revertedWith('Minting is not enabled');
            await nft.connect(deployer).setMintEnabled(true);

            await expect(nft.connect(addr1).mint(4001, allowListProof)).to.be.revertedWith("Can't mint more than total supply");
            await expect(nft.connect(addr5).mint(1, [])).to.be.revertedWith("You are not whitelisted");
            await expect(nft.connect(addr1).mint(1, [])).to.be.revertedWith("You are not whitelisted");
            
            await expect(nft.connect(addr1).mint(1, allowListProof)).to.be.revertedWith("Not enough ETH sent; check price!");
            
            await nft.connect(addr1).mint(5, allowListProof, {value: toWei(price * 5)})
            expect(await nft.balanceOf(addr1.address)).to.equal(5);

            await expect(nft.connect(addr1).mint(1, allowListProof)).to.be.revertedWith("Each address may only mint x NFTs!");
        })

        it("Should track minting NFTs for primeList", async function() {
            const primeListProof = getMerkleProof(primeList, addr3.address)

            await expect(nft.connect(addr3).mint(5, primeListProof)).to.be.revertedWith('Minting is not enabled');
            await nft.connect(deployer).setMintEnabled(true);

            await expect(nft.connect(addr3).mint(4001, primeListProof)).to.be.revertedWith("Can't mint more than total supply");
            await expect(nft.connect(addr5).mint(1, [])).to.be.revertedWith("You are not whitelisted");
            await expect(nft.connect(addr3).mint(1, [])).to.be.revertedWith("You are not whitelisted");
            
            await expect(nft.connect(addr3).mint(1, primeListProof)).to.be.revertedWith("Not enough ETH sent; check price!");
            
            await nft.connect(addr3).mint(10, primeListProof, {value: toWei(pricePrimeList * 10)})
            expect(await nft.balanceOf(addr3.address)).to.equal(10);

            await expect(nft.connect(addr3).mint(1, primeListProof)).to.be.revertedWith("Each address may only mint x NFTs!");
        })

        it("Should track minting NFTs for no list", async function() {

            await expect(nft.connect(addr5).mint(5, [])).to.be.revertedWith('Minting is not enabled');
            await nft.connect(deployer).setMintEnabled(true);

            await expect(nft.connect(addr5).mint(1, [])).to.be.revertedWith("You are not whitelisted");
            await expect(nft.connect(addr3).mint(1, [])).to.be.revertedWith("You are not whitelisted");
            await nft.connect(deployer).setPublicSaleEnabled(true);
            
            await expect(nft.connect(addr5).mint(1, [])).to.be.revertedWith("Not enough ETH sent; check price!");
            
            await nft.connect(addr5).mint(5, [], {value: toWei(price * 5)})
            expect(await nft.balanceOf(addr5.address)).to.equal(5);

            await expect(nft.connect(addr5).mint(1, [], {value: toWei(price * 5)})).to.be.revertedWith("Each address may only mint x NFTs!");
        })
    })

})