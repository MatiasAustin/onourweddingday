const fs = require('fs');
const guests = JSON.parse(fs.readFileSync('guests.json', 'utf8'));

const sql = `
UPDATE public."Invitation"
SET "settingsJSON" = jsonb_set("settingsJSON"::jsonb, '{guestList}', '${JSON.stringify(guests)}'::jsonb)
WHERE "userId" = '18730e54-4251-45de-af4a-1893c7e59926';
`;

fs.writeFileSync('update_guests.sql', sql);
