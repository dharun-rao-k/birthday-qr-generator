BIRTHDAY QR STUDIO — UPDATED

WHAT'S INCLUDED
- index.html: generator form for each friend.
- birthday.html + birthday.js: personalized birthday experience.
- generator.js: uploads selected photos, builds a unique page link and QR code.
- style.css: original visual styling and animations.
- assets/music.mp3: background music.

CHANGES
- Removed the Moves page and its navigation item.
- Start the show now opens the Reasons page.
- Four Reasons cards can be customized in the generator.
- Gift heading, button label and revealed gift message can be customized.
- The slideshow uses ONLY the photos selected in the generator. The old sample photos have been removed.
- Up to 8 photos can be selected, previewed and uploaded to Cloudinary.

IMPORTANT: PHOTO HOSTING SETUP
GitHub Pages is a static host. A photo selected on your phone cannot automatically be saved on GitHub or be seen by someone else. This version uploads selected photos to Cloudinary and places their public image URLs in the generated birthday link.

One-time Cloudinary setup:
1. Create a free account at https://cloudinary.com/
2. Open the Cloudinary Console and copy your Cloud Name.
3. Open Settings → Upload.
4. Create an Upload Preset and set its signing mode to Unsigned.
5. This project is prefilled with Cloud Name `ihk8brka` and preset `birthday_photos`. You can change these in the generator form if needed.
6. Select up to 8 photos and generate the QR code.

Never put your Cloudinary API Secret in the webpage. The generator only needs the cloud name and unsigned preset. Anyone who knows the unsigned preset may be able to upload to that preset, so use a dedicated preset and review your Cloudinary usage.

DEPLOY ON GITHUB PAGES
1. Extract this ZIP.
2. Upload the contents of this folder to the root of your GitHub repository (same level as index.html).
3. Keep the assets folder and all files together.
4. Commit changes and wait for GitHub Actions / Pages deployment.
5. Open the public GitHub Pages URL and generate each friend's QR code there.

NOTES
- QR links contain the photo URLs and customized text. Avoid private/sensitive information.
- Large numbers of long image URLs can make a QR code dense. The generator limits photo selection to 8.
- The birthday link and photos remain available as long as the GitHub Pages site and Cloudinary images remain online.
- QR generation uses a CDN library and requires an internet connection.
