// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UploadEhr {
    struct PatientRecord {
        string timeStamp;
        string medicalRecordHash;
    }

    // Store records per patient (mapped by HH Number)
    mapping(string => PatientRecord[]) private patientRecords;

    function addRecord(string memory _hhNumber, string memory _timeStamp, string memory _medicalRecordHash) public {
        patientRecords[_hhNumber].push(PatientRecord(_timeStamp, _medicalRecordHash));
    }

    function getRecords(string memory _hhNumber) public view returns (PatientRecord[] memory) {
        return patientRecords[_hhNumber];
    }
}
