document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const resolution = document.getElementById('resolution').value;
    const format = document.getElementById('format').value;
    const messageDiv = document.getElementById('message');
    const downloadLinkContainer = document.getElementById('downloadLinkContainer');
    const downloadLink = document.getElementById('downloadLink');

    messageDiv.textContent = '';
    downloadLinkContainer.style.display = 'none';
    downloadLink.removeAttribute('href');
    downloadLink.removeAttribute('download');
    downloadLink.textContent = '';

    if (!videoUrl) {
        messageDiv.textContent = 'Kérlek, adj meg egy videó URL-t.';
        messageDiv.style.color = 'red';
        return;
    }

    messageDiv.textContent = 'Kérés küldése a szervernek...';
    messageDiv.style.color = 'blue';

    try {
        const response = await fetch(`/download?url=${encodeURIComponent(videoUrl)}&res=${encodeURIComponent(resolution)}&fmt=${encodeURIComponent(format)}`);

        if (!response.ok) {
            throw new Error(`HTTP hiba! Státusz: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            messageDiv.textContent = data.message;
            messageDiv.style.color = 'green';
            if (data.download_url) {
                downloadLink.href = data.download_url;
                // A download attribútumot a szervernek kellene megfelelően beállítania
                // Jelenleg egy általános fájlnév, a Flask app adja majd a valódit.
                downloadLink.download = `video_download.${format}`;
                downloadLink.textContent = 'Kattintson ide a letöltéshez';
                downloadLinkContainer.style.display = 'block';
            } else {
                 messageDiv.textContent = 'Sikeres kérés, de nincs letöltési link a válaszban.';
                 messageDiv.style.color = 'orange';
            }

        } else {
            messageDiv.textContent = `Hiba a szerverről: ${data.error}`;
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.textContent = `Hiba történt a kérés során: ${error.message}. Győződjön meg róla, hogy a Flask szerver fut!`;
        messageDiv.style.color = 'red';
        console.error('Fetch error:', error);
    }
});
"""

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_code)
print("A 'script.js' sikeresen frissült.")