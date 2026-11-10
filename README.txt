BIRTHDAY QR STUDIO

WHAT'S NEW
- index.html is now the Birthday QR Studio form.
- birthday.html is your original birthday experience, personalized from the URL.
- generator.js creates a unique link and QR code for each friend.
- birthday.js keeps the original animations, photo carousel, dance section, reasons cards, cake and confetti, while filling in the friend's details.
- Your existing style.css and assets/ folder are retained.

HOW TO USE
1. Upload the complete folder contents to one public static host (GitHub Pages, Netlify, or another static web host). Keep index.html, birthday.html, both JS files, style.css and assets/ together.
2. Open the hosted website's index.html (the home page).
3. Enter your friend's name, introduction, birthday message and final gift message.
4. Click Create birthday QR. Copy the link or download the QR image.
5. Repeat the form for each friend to make a different personalized link and QR code.

IMPORTANT
- QR codes created from localhost or a file:// address will not work for friends. Host the site first.
- The form uses URL parameters, so the details are encoded in the generated link. Do not put private or sensitive information in the messages.
- The QR library is loaded from a CDN, so an internet connection is needed when creating QR codes.
- Existing photos and music remain shared across each birthday page. Replace the files in assets/ if you want different shared media.
