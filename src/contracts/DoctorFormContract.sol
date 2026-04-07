// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DoctorFormContract {
    struct Record {
        string recordId;
        string patientName;
        address doctorAddress;
        string gender;
        string diagnosis;
        string prescription;
    }

    Record[] private records;

    function createEHR(
        string memory _recordId,
        string memory _patientName,
        address _doctorAddress,
        string memory _gender,
        string memory _diagnosis,
        string memory _prescription
    ) public {
        records.push(Record(
            _recordId,
            _patientName,
            _doctorAddress,
            _gender,
            _diagnosis,
            _prescription
        ));
    }

    function getRecords() public view returns (Record[] memory) {
        return records;
    }
}
