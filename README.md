
## Procedure

1. In your command-line interface (CLI), navigate to this directory and run the following command to install requirements.

    ```Shell
    npm install
    ```

2. Run the following command in your CLI to start the application.

    ```Shell
    npm start or nodmemon serve
    ```

## For Google API
1. Open a browser and browse to [http://localhost8080/api][URL_google]


[URL_google]: https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=1069050148569-ff9jqvsroer0gs099reaognn1n7rrlae.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi&state=calendar_id%3A4&flowName=GeneralOAuthFlow

## For Outlook API
1. Open a browser and browse to [http://localhost:3000/out_redirect][URL_outlook]

[URL_outlook]: https://login.live.com/oauth20_authorize.srf?client_id=83e8d803-6ffd-4b83-8935-ccc0f15d7651&scope=offline_access+Calendars.read+openid+profile+mailboxsettings.read&redirect_uri=http://localhost:3000/out_redirect&response_type=code&state=%7b"comp_id"%3a"comp-yrgkwh9"%2c"calendar_id"%3A5%2c"instance"%3a"Qrhgh4uAvdRkQN71J-zP0ddEk_l_4zJ1-b5xY3g__fg.eyJpbnN0YW5jZUlkIjoiZTBlZmY1ODgtZTM3MS00YmVmLTg4ZWQtZTAwN2UzMDUzNTI2IiwiYXBwRGVmSWQiOiIxM2I0YTAyOC0wMGZhLTcxMzMtMjQyZi00NjI4MTA2YjhjOTEiLCJzaWduRGF0ZSI6IjIwMj