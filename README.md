# TDDD27_2022_Meloudi
## Function
I intend to create a web-based music player. Similar to Spotify minus the automated personalization. A service where you can create an account and listen to any music the admin user is hosting. Users can create playlists and may choose to share it with other users. Users can also join a "room" with friends where playback is synchronized and the queue is shared. Lyrics for the currently playing song can be displayed, retrieved from a third party API.

I am aware that this application can't be published with copyrighted content since it would be illegal file sharing.
## Technology
Room-feature is accomplished using the WebSocket protocol.
For lyrics I may use [python-LyricsGenius](https://lyricsgenius.readthedocs.io/en/master/) or better yet, a free API that I can use directly, if I find one.
### Client
- Angular 13

### Server
- Django as a REST API
- PostgreSQL
- [Auth0](https://auth0.com/)