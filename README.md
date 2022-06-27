# Meloudi
Meloudi is a web-based music player created as an exercise for the course Advanced Web Programming, TDDD27, at Linköping University. The course had an emphasis on learning new modern web frameworks and combining them togheter.

## Function
Meloudi is a service where you can create an account and listen to any music the admin user is hosting. Users can create playlists and may choose to share it with other users. Lyrics for the currently playing song can be displayed, retrieved from a third party API.

This application can of course not be published with copyrighted content since it would be considered illegal file sharing.

## Technology
Lyrics is retrieved with the help of [python-LyricsGenius](https://lyricsgenius.readthedocs.io/en/master/) from Genius.com.

### Client
- Angular 13

### Server
- Django as a REST API
- PostgreSQL
- [Auth0](https://auth0.com/)
