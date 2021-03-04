export default class ServerUtility {
    static getBlocks = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const res = await fetch('http://localhost:5000/blocks/list', settings);
        let json = await res.json();
        if (res.status === 200) {
            return json;
        }
        else {
            throw new Error(res.status + ' ' + json);
        }
    }
    static getLastBlockHash = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const res = await fetch('http://localhost:5000/blocks/last-hash', settings);
        const json = await res.json();
        console.info('last hash: ', json);

        if (res.status === 200) {
            return json.hash;
        }
        else {
            throw new Error(res.status + ' ' + json);
        }
    }
    // localhost:5000/blocks/propose
    static propose = async (data) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        const res = await fetch('http://localhost:5000/blocks/propose', settings);
        const json = await res.json();

        if (res.status === 200) {
            return {success: true};
        }
        else {
            throw new Error(json.message);
        }
    }

    static isBlockchainValid = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const res = await fetch('http://localhost:5000/blocks/is-blockchain-valid', settings);
        let json = await res.json();
        if (res.status === 200) {
            return json;
        }
        else {
            throw new Error(res.status + ' ' + json);
        }
    }
}

window.api = ServerUtility;
