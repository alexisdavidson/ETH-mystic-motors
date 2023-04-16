const { expect } = require("chai")
const keccak256 = require("keccak256")
const { MerkleTree } = require("merkletreejs")

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

// getMerkleProof(allowList, addr1.address)
const getMerkleProof = (whitelist, acc) => {
    const accHashed = keccak256(acc.toString())
    const leafNodes = whitelist.map(e => keccak256(e.toString()));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    const hexProof = merkleTree.getHexProof(accHashed);

    return hexProof
}

describe("NFT", async function() {
    let deployer, addr1, addr2, nft
    let teamWallet = ""
    let allowList = []
    let primeList = []
    let allowListRoot = "0x343750465941b29921f50a28e0e43050e5e1c2611a3ea8d7fe1001090d5e1436"
    let primeListRoot = "0x343750465941b29921f50a28e0e43050e5e1c2611a3ea8d7fe1001090d5e1436"

    beforeEach(async function() {
        const NFT = await ethers.getContractFactory("NFT");

        [deployer, addr1, addr2] = await ethers.getSigners();
        teamWallet = deployer.address
        allowList = [addr1.address, addr2.address]

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

})