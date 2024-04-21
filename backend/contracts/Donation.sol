// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract DonationDApp {
    address public owner; // ADDRESS OF THE CONTRACT DEPLOYER
    uint256 public totalDonations; // TOTAL AMOUNT OF DONATIONS RECEIVED BY THE CONTRACT

    struct Donation {
        address donar;
        uint256 amount;
    }

    mapping(uint256 => Donation) public donations; // MAPPING TO STORE DONATIONS
    uint256 public donationIndex; // INDEX TO TRACK DONATIONS

    constructor() {
        owner = msg.sender;
    }

    function receiveDonation() external payable {
        // RECEIVE A DONATION
        donations[donationIndex] = Donation(msg.sender, msg.value);

        // INCREASE TOTAL DONATIONS
        totalDonations += msg.value;
        
        // INCREMENT DONATION INDEX FOR THE NEXT DONATION
        donationIndex++;
    }

    function getTotalDonations() external view returns (uint256) {
        // RETURN TOTAL AMOUNT OF DONATIONS
        return totalDonations;
    }

    // function getDonation(uint256 index) external view returns (address, uint256) {
    //     // RETURN DONATION DETAILS BY INDEX
    //     Donation memory donation = donations[index];
    //     return (donation.donar, donation.amount);
    // }

    function getAllDonations() external view returns (Donation[] memory) {
        // CREATE A NEW DYNAMIC ARRAY TO STORE ALL DONATIONS
        Donation[] memory allDonations = new Donation[](donationIndex);
        
        // RETRIEVE AND STORE ALL DONATIONS INTO THE ARRAY
        for (uint256 i = 0; i < donationIndex; i++) {
            allDonations[i] = donations[i];
        }
        
        // RETURN THE ARRAY OF ALL DONATIONS
        return allDonations;
    }

    // Function to withdraw funds from the contract
    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds");
        require(amount <= address(this).balance, "Insufficient funds in the contract");
        payable(owner).transfer(amount);
    }
}