pragma solidity ^0.8.10;

contract Contacts {
  uint public count = 0; // state variable

  struct Contact {
    uint id;
    string name;
    string phone;
  }

  mapping(uint => Contact) public contacts;

  constructor() {
    createContact('Lucy', '555-555-5555');
  }

  function getContact(uint _id) public view returns (Contact memory) {
    return contacts[_id];
  }

  function getContacts() public view returns (Contact[] memory) {
    Contact[] memory ret = new Contact[](count);
    for (uint i = 0; i < count; i++) {
      ret[i] = contacts[i];
    }
    return ret;
  }

  function createContact(string memory _name, string memory _phone) public {
    Contact memory contact = Contact(count, _name, _phone);
    contacts[count] = contact;
    count++;
  }

  function updateContact(uint _id, string memory _name, string memory _phone) public {
    contacts[_id].name = _name;
    contacts[_id].phone = _phone;
  }

  function deleteContact(uint _id) public {
    delete contacts[_id];
  }
}
