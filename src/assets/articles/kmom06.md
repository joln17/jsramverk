# Kmom06
Är man inloggad som admin syns en ladda- och spara-knapp under chattfönstret. Alla inkommande meddelanden sparas som objekt i en array och för att spara när man klickar på spara så skickas arrayen i JSON-format till servern. Den sparas sedan ner direkt i MongoDB-databasen med `insertMany`.

Omvänt när man klickar på ladda så läses alla meddelanden sparade i databasen med `find().toArray` och skickas till klienten i JSON-format.

## Övrigt
Jag gjorde misstaget att ha installerat Debian 10 på min droplet som visade sig inte vara kompatibel med MongoDB då MongoDB använder libcurl3 och Debian 10 använder libcurl4. Jag lyckades inte komma runt det kompatibilitetsproblemet så jag fick återställa min droplet och installera om allt med Debian 9 istället...
