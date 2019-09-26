# Kmom03

## Backend/API
Jag använder Node.js med Express och mitt API har följande router:

* `GET /`: För att hämta min presentation.

* `POST /auth/register` För att registrera en ny användare.
* `POST /auth/login` För att logga in.
* `GET /auth/verify-admin-login` För att verifiera admin-inloggning. Kräver JWT med admin-payload.
* `PUT /auth/verify-admin-access-code` För att verifiera admin access-kod göra användaren till admin. Kräver JWT.

* `GET /reports/titles` För att hämta samtliga rapportnamn.
* `GET /reports/week/:id` För att hämta rapport med angivet id.
* `POST /reports` För att publicera rapport. Kräver JWT med admin-payload.
* `PUT /reports` För att uppdatera rapport. Kräver JWT med admin-payload.
* `DELETE /reports/week/:id` För att ta bort rapport med angivet id. Kräver JWT med admin-payload.

Notera att jag valde att lägga till `/auth` i pathen framför `/login` och `/register` till skillnad från uppgiftsbeskrivningen. Admin-accessen lade jag till för att undvika att vem som helst ska kunna gå in och ändra i mina rapporter (vilket verkar ha drabbat en del enligt chatten). Jag bifogar admin-accesskod i kommentaren till inlämningen.

## Frontend
Min React-frontend har följande router:

* `https://joln17.me/` Förstasidan med presentationen.
* `https://joln17.me/about` Om-sidan.
* `https://joln17.me/login` Inloggningsidan.
* `https://joln17.me/logout` För att logga ut.
* `https://joln17.me/register` Registreringssidan.
* `https://joln17.me/verify-admin` För att verifiera admin-access.
* `https://joln17.me/reports/admin` För att administrera rapporter.
* `https://joln17.me/reports/create` För att skapa en ny rapport.
* `https://joln17.me/reports/week/:id` För att visa en rapport.
* `https://joln17.me/reports/update/:id` För att uppdatera en rapport.
* `https://joln17.me/reports/delete/:id` För att ta bort en rapport.

Rapporterna har stöd för Markdown (utan HTML) via [React-Markdown](https://www.npmjs.com/package/react-markdown).

## Allmänt om veckans kmom
Driftsättning av servern och backend med API:et gick utan några större problem även om det tog sin lilla stund att få allt på plats. Däremot tyckte jag det var svårt att få till JWT med React på ett bra sätt trots att jag plöjt otaliga artiklar om ämnet. Jag är inte heller nöjd med hur min har kodstruktur blivit på vissa komponenter nu eftersom den lär vara ganska långt från hur det är tänkt att man ska göra saker i React. Tyvärr har jag inte hunnit lägga någon tid på förbättra den.

Rent allmänt tycker jag att detta kursmoment var för omfattande och för att få en rimligare storlek så tycker jag det hade varit lämpligt att ha uppgifterna i del 1 (backend) och del 2 (frontend) i två olika kursmoment.
