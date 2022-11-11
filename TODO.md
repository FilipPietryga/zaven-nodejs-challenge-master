Na podstawie istniejącego kodu napisz implementację metod serwisowych
klasy `UsersService` (`/app/services/users-service.js`).

## Lista kroków

1. Sklonuj repozytorium `https://git.zaven.co/zaven/recruitment/zaven-nodejs-challenge.git` i zpushuj je na własne repozytorium (np. na github).
2. Zapoznaj się z plikiem README.md, w którym opisane są wymagane składniki środowiska uruchomieniowego.
3. W przypadku braku któregokolwiek ze składników - zainstaluj go.
4. Aby uruchomić serwer bazy danych wpisz w terminal polecenie `docker-compose up`
5. Uruchom aplikację ze zmienną środowiskową `DB_CONNECTION_STRING`. W przypadku, gdy korzystasz z wspomnianej bazy w punkcie 4. powinna ona mieć wartość `postgres://api@localhost/api`
6. Zapoznaj sie z istniejącym kodem i wykonaj zadanie.

## Wymagania

Metody powinny zostać napisane na podstawie istniejącego serwisu (PostsService) z analogicznymi metodami.

Zmiany dozwolone są jedynie w pliku `/app/services/users-service.js` oraz `/app/constants/errors/user-errors.js`

Zadbaj o to, aby serwis zwracał odpowiednio doprecyzowane kody błędów.

### createUser()

Metoda powinna dodać użytkownika do bazy danych, korzystając z sequelize.

Użytkownik przesyła następujące parametry:
- email - email użytkownika
- firstName - imię użytkownika
- lastName - nazwisko użytkownika
- password - hasło użytkownika (w postaci jawnej)

Walidacja powyższych propert została już zaimplementowana.
Model bazy danych został opisany w pliku `/app/models/database/user.js`.


### getUsersList()

Metoda powinna pobrać użytkowników z bazy danych, uwzględniając paginację.

Użytkownik przesyła następujące parametry:
- page - numer strony
- pageSize - ilość elementów na stronie

Walidacja powyższych propert została już zaimplementowana.
Model bazy danych został opisany w pliku `/app/models/database/user.js`.


### getSingleUser()

Metoda powinna pobrać użytkownika z bazy danych, uwzględniając jego identyfikator.

Użytkownik przesyła następujące parametry:
- userId - identyfikator użytkownika (uuid)

Walidacja powyższych propert została już zaimplementowana.
Model bazy danych został opisany w pliku `/app/models/database/user.js`.

## Kontakt

W razie jakichkolwiek pytań możesz kontaktować się z autorem zadania:
- kacper~at~zaven.co
- https://www.facebook.com/obrzut.kacper

