import axios from 'axios';

const checkUptime = async (url: string, interval: number, maxRequests: number): Promise<void> => {
    let uptime = 0;
    let downtime = 0;
    let requestCount = 0;

    const intervalId = setInterval(async () => {
        if (requestCount >= maxRequests) {
            clearInterval(intervalId); 
            console.log(`Parou após ${requestCount} requisições.`);
            return;
        }

        try {
            const response = await axios.get(url, { timeout: 5000 });

            if (response.status === 200) {
                console.log(`${url} está online.`);
                uptime += interval;
            } else {
                console.log(`${url} está offline. Status: ${response.status}`);
                downtime += interval;
            }
        } catch (error) {
            console.log(`${url} não está acessível.`);
            downtime += interval;
        }

        const totalTime = uptime + downtime;
        const uptimePercent = (uptime / totalTime) * 100;

        console.log(`Uptime: ${uptimePercent.toFixed(2)}%`);

        requestCount++;
    }, interval * 1000);
};

checkUptime('https://www.youtube.com', 5, 5); 
