const postLinkInput = document.getElementById('postLink');
const submitButton = document.getElementById('submitButton');
const gallery = document.getElementById('gallery');

const ACCESS_TOKEN = 'IGQWRQVHRsdld4QXAyVTQzY0ZALY0lQMHllak5qeC1BcHV3SEFJb0lPX3ZA5XzlmMmQwSHVtcGcwOVB5S1JTUEtQT0lkVy1UbDVZAblVxYzFXUFhPMUYzVHVWX1kycTZAVZA1plWnQ2X0xpTE1aZA3lZAR3dOclU3V1dkeHcZD'; // Replace with your token

submitButton.addEventListener('click', () => {
    const postLink = postLinkInput.value.trim();

    if (!postLink || !postLink.startsWith('https://www.instagram.com/p/')) {
        alert('Please enter a valid Instagram post link!');
        return;
    }

    // Instagram oEmbed API URL
    const oEmbedURL = `https://graph.facebook.com/v17.0/instagram_oembed?url=${encodeURIComponent(postLink)}&access_token=${ACCESS_TOKEN}`;

    // Fetch the embed code from the API
    fetch(oEmbedURL)
        .then(response => response.json())
        .then(data => {
            if (data.html) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = data.html;

                // Append the new gallery item
                gallery.appendChild(galleryItem);

                // Reinitialize the Instagram embed script
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                }
            } else {
                alert('Failed to fetch the post embed.');
            }
        })
        .catch(error => {
            console.error('Error fetching Instagram oEmbed:', error);
            alert('There was an error fetching the Instagram post.');
        });

    // Clear the input field
    postLinkInput.value = '';
});
