
// This is a placeholder ABI. In a real implementation, you would replace this 
// with the actual ABI of your deployed smart contract
export const hrContractABI = [
  {
    "inputs": [],
    "name": "getEmployeeCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "getEmployeeData",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"},
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "bool", "name": "", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Replace with the actual contract address once deployed
export const hrContractAddress = "0x0000000000000000000000000000000000000000";

// Solidity Smart Contract Example (not used in the app directly, for reference)
export const solidityContractExample = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HRManagement {
    address public owner;
    
    struct Employee {
        address walletAddress;
        string name;
        string position;
        uint256 salary;
        uint256 joiningDate;
        bool isActive;
    }
    
    Employee[] public employees;
    mapping(address => bool) public isEmployee;
    
    event EmployeeAdded(address indexed employeeAddress, string name, uint256 timestamp);
    event SalaryPaid(address indexed employeeAddress, uint256 amount, uint256 timestamp);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function addEmployee(
        address _walletAddress,
        string memory _name,
        string memory _position,
        uint256 _salary
    ) public onlyOwner {
        require(!isEmployee[_walletAddress], "Employee already exists");
        
        employees.push(Employee({
            walletAddress: _walletAddress,
            name: _name,
            position: _position,
            salary: _salary,
            joiningDate: block.timestamp,
            isActive: true
        }));
        
        isEmployee[_walletAddress] = true;
        
        emit EmployeeAdded(_walletAddress, _name, block.timestamp);
    }
    
    function getEmployeeCount() public view returns (uint256) {
        return employees.length;
    }
    
    function getEmployeeData(uint256 index) public view returns (
        address, string memory, string memory, uint256, uint256, bool
    ) {
        require(index < employees.length, "Employee does not exist");
        Employee memory emp = employees[index];
        return (
            emp.walletAddress,
            emp.name,
            emp.position,
            emp.salary,
            emp.joiningDate,
            emp.isActive
        );
    }
    
    function paySalary(address payable _employeeAddress) public payable onlyOwner {
        require(isEmployee[_employeeAddress], "Not an employee");
        
        // Transfer salary to employee
        _employeeAddress.transfer(msg.value);
        
        emit SalaryPaid(_employeeAddress, msg.value, block.timestamp);
    }
}
`;
