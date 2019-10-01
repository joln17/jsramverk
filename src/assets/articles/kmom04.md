# Kmom04

## Användartester (frontend)

1. Användaren ska från förstasidan kunna klicka på en länk för att se Om-sidan.

2. Användaren ska från förstasidan kunna klicka på en länk för att se Logga in-sidan.

3. Användaren ska från förstasidan kunna klicka på en länk för att (åter) se förstasidan.

## Integrationstester (backend)
Jag valde att inte göra några enhetstester eftersom jag inte fann någon lämplig kod för enhetstester i mitt API. Jag har däremot gjort integrationstester med en kodtäckning av 89 %.

## Övrigt
Jag är inte riktigt säker på hur det är tänkt att man ska göra tester med React på Travis och Scrutinizer men jag valde att bygga koden där och använda [http-server-spa](https://www.npmjs.com/package/http-server-spa) för att köra koden. Det andra alternativet jag testade var att använda react-scripts start men det har en enormt lång uppstarttid vilket gjorde att jag var tvungen att sätta väldigt lång timeout-gräns på testen. Förmodligen finns det något bättre sätt att lösa det på.
