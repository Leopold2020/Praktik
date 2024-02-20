
if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const date = e.target.result;
        const workbook = XLSX.read(date, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        reader.readAsBinaryString(file);
    };
}
