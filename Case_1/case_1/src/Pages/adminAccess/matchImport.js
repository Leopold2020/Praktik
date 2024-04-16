import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import SingleMatch from "../../Components/converter/singleMatch";

function MatchImport({axiosJWT}) {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [teamImportWay, setTeamImportWay] = useState(false);
    const [keyValueName, setKeyValueName] = useState({
        date: "date",
        location: "location",
        field: "field",
        teams: "teams"
    });

    function handleInputChange(e) {
        setKeyValueName({
            ...keyValueName,
            [e.target.name]: e.target.value
        });
    }

    const handleConvert = () => {
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            if (teamImportWay) {
                const newJson = test(json, keyValueName.date, keyValueName.location, keyValueName.field, keyValueName.team_1, keyValueName.team_2);
                setData(newJson);
            } else if (!teamImportWay) {
                for (let i = 0; i < json.length; i++) {
                    let teams = json[i].team.split(" - ");
                    json[i].team_1 = teams[0];
                    json[i].team_2 = teams[1];
                }
            } else {
                alert("Please select a team import way.");
            }
        };
        reader.readAsBinaryString(file);
        }
    };

    function test(original, date, location, field, teams) {
        try {
            let newJson = [];
            for (let i = 0; i < original.length; i++) {
                newJson.push({
                    date: original[i][date],
                    location: original[i][location],
                    field: original[i][field],
                    teams: original[i][teams]
                })
            }
            return newJson;
        } catch (error) {
            console.log(error.message)
        }
    }

    async function uploadToDb() {
        try {
            if (data.length === 0) {
                alert("Please select a file to import before uploading.");
            } else {
                axiosJWT.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/match/import`, {
                    file: data
                }, {
                    headers: {
                        authorization: `${sessionStorage.getItem("accessToken")}`
                    }
                }).then((res) => {
                    console.log(res.data);
                })   
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    function changeData(index, key, value) {
        let newData = [...data];
        newData[index][key] = value;
        setData(newData);
        console.log(newData);
    }

    return (
        <>
        <h1>Excel to Json Converter</h1>
        <input
            type="date"
            value={keyValueName.date}
            name="date"
            placeholder="date"
            onChange={(e) => handleInputChange(e)}
        />
        <input
            type="text"
            value={keyValueName.location}
            name="location"
            placeholder="location"
            onChange={(e) => handleInputChange(e)}
        />
        <input
            type="text"
            value={keyValueName.field}
            name="field"
            placeholder="field"
            onChange={(e) => handleInputChange(e)}
        />
        <input
            type="text"
            value={keyValueName.teams}
            name="teams"
            placeholder="teams"
            onChange={(e) => handleInputChange(e)}
        />
        <br />
        <input
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleConvert}>Convert</button>
        <button onClick={() => setTeamImportWay(!teamImportWay)}>Team Import Way</button>
        {teamImportWay === true ? (<h2>true</h2>):(<h2>false</h2>)}
        <button onClick={uploadToDb}>upload into db</button>
        {data.map((match, index) => (
            <table key={index}>
            <tbody>
                <SingleMatch
                index={index}
                date={match.date}
                location={match.location}
                field={match.field}
                teams={match.teams}
                changeData={changeData}
                />
            </tbody>
            </table>
        ))}
        </>
    );
}

export default MatchImport;