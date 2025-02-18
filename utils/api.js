async function fetchRules() {
    try {
        const url = "https://script.google.com/macros/s/AKfycbwydyV_ZNXM124qgdAk9MAcxeUayiMox5xVLNUW2bz8PVbP86RbUHKmWyyWeD17ZaA8/exec?action=read";
        const response = await fetch(url);
        const data = await response.text();
        const rows = data.split('\n').slice(1);

        return rows.map(row => {
            const columns = row.split(',');
            if (columns.length < 6) return null;

            return {
                id: columns[0]?.trim(),
                title: columns[1]?.trim(),
                description: columns[2]?.trim(),
                paragraphs: columns.slice(3, 7).map(p => p.trim()).filter(p => p)
            };
        }).filter(item => item !== null);
    } catch (error) {
        reportError(error);
        return [];
    }
}
