---
title: "Game of Thrones - NFT"
excerpt: "Game of Thrones is a popular American fantasy television series that aired from 2011 to 2019. In this article, we will explore how the world of Game of Thrones is being brought to the world of non-fungible tokens (NFTs). Non-fungible tokens, or NFTs, are digital assets that are unique and cannot be replicated or exchanged for other assets on a one-to-one basis. NFTs are built on blockchain technology and they are increasingly being used to represent and trade digital collectibles, such as artwork, music, and other forms of media."
coverImage: "https://images.unsplash.com/photo-1512510002561-b32d0f7dcab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=893&q=80"
date: "2021-12-19T12:04:07.322Z"
author:
  name: Harshit Singhai
  picture: "/images/profile.jpg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

A web app to mint game of thrones NFT in Rinkeby Network.

# What is the app about

Users connect their Ethereum wallet, and mint Game of Thrones quote NFT to their wallet so they actually own it. They'll even be able to re-sell the NFT on OpenSea.

# Smart Contract

```javascript
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract ShadowNFT is ERC721URIStorage {
    // Using OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewNFTMinted(address sender, uint256 tokenId);

    // We need to pass the name of our NFTs token and it's symbol.
    constructor() ERC721("ShadowNFT", "SNFT") {
        console.log("This is my NFT Contract. Yeah!!");
    }

    // A function our user will hit to get their NFT.
    function makeAnEpicNFT(string memory metadata) public {
        // Get the current tokenId, this starts at 0.
        uint256 newItemId = _tokenIds.current();

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);
        // Set the NFTs data
        _setTokenURI(newItemId, metadata);
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

        emit NewNFTMinted(msg.sender, newItemId);
    }
}
```

Writing smart contract is more or less like javascript but with some extra magic thanks to Solidity. Solidity is basically converted to byte code by the compiler. The byte code generated by the compiler is what lives in the blockchain.

We can use web3.py, web3.js or ether.js to interact with the smart contract which resides in the blockchain.

## Running Locally with local blockchain

```javascript
const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("ShadowNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.makeAnEpicNFT(
    "data:application/json;base64,eyJkZXNjcmlwdGlvbiI6IkFuIE5GVCBmcm9tIHRoZSBoaWdobHkgYWNjbGFpbWVkIGdhbWUgb2YgdGhyb25lcyBjb2xsZWN0aW9uIiwicXVvdGUiOiJNeSBzd29yZCBpcyB5b3VycywgaW4gdmljdG9yeSBhbmQgZGVmZWF0LCBmcm9tIHRoaXMgZGF5IHVudGlsIG15IGxhc3QgZGF5LiIsInF1b3RlQnkiOiJUaGVvbiBHcmV5am95IiwiaG91c2UiOiJIb3VzZSBHcmV5am95IG9mIFB5a2UiLCJpbWFnZSI6ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QnBaRDBpYlhsemRtY2lJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdjSEpsYzJWeWRtVkJjM0JsWTNSU1lYUnBiejBpZUUxcGJsbE5hVzRnYldWbGRDSWdkbWxsZDBKdmVEMGlNQ0F3SURNMU1DQXpOVEFpSUdacGJHdzlJbmRvYVhSbElpQmpiR0Z6Y3owaWMzWm5MWFJsZUhRaVBqeHlaV04wSUhkcFpIUm9QU0l4TURBbElpQm9aV2xuYUhROUlqY3dKU0lnWm1sc2JEMGlZbXhoWTJzaUx6NDhkR1Y0ZENCNFBTSTFNQ1VpSUhrOUlqSTFKU0lnWTJ4aGMzTTlJbUpoYzJVaUlIUmxlSFF0WVc1amFHOXlQU0p0YVdSa2JHVWlQangwYzNCaGJpQjRQU0kxTUNVaUlHUjVQU0l4TGpKbGJTSStUWGtnYzNkdmNtUWdhWE1nZVc5MWNuTXNJR2x1SUhacFkzUnZjbmtnWVc1a0lHUmxabVZoZEN3OEwzUnpjR0Z1UGp4MGMzQmhiaUI0UFNJMU1DVWlJR1I1UFNJeExqSmxiU0krWm5KdmJTQjBhR2x6SUdSaGVTQjFiblJwYkNCdGVTQnNZWE4wSUdSaGVTNDhMM1J6Y0dGdVBqeDBjM0JoYmlCNFBTSTFNQ1VpSUdSNVBTSXhMakpsYlNJK0lEd3ZkSE53WVc0K1BIUnpjR0Z1SUhnOUlqY3dKU0lnWkhrOUlqRXVNbVZ0SWo0dElGUm9aVzl1SUVkeVpYbHFiM2s4TDNSemNHRnVQand2ZEdWNGRENDhMM04yWno0PSJ9"
  );
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #1");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
```

## Github

[https://github.com/harshitsinghai77/web3-game-of-thrones-nft](https://github.com/harshitsinghai77/web3-game-of-thrones-nft)

## Demo

[https://game-of-thrones-nft.netlify.app/](https://game-of-thrones-nft.netlify.app/)

## Rarible Collection

[Click here to see the collection](https://rinkeby.rarible.com/collection/0x2Ab703e0b960698215AFd3Ec55c33A6CDcf31823)

That’s it for today, see you soon. :)
