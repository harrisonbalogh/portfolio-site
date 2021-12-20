# HarxerWebClient

## React site

Site is supported by Nginx back-end. API traffic is directed to custom NodeJS API server.
API listens for GitHub webhook notifications; triggered when a project is released; the API
will pull GitHub project information: readme, description, thumbnail, code language
breakdown, and, in the case of a web-application, the project's browser-executable content located
in the repositories `/site` directory. The webclient is rebuilt with the updated project information
to serve staticly through Nginx. See project setup in video below...

<iframe width="700" height="394" src="https://www.youtube.com/embed/McRQTrD-OHw" title="YouTube video player" frameborder="0" allow="clipboard-write; encrypted-media; picture-in-picture" allowfullscreen /> 

##

## Local Dev

`npm install`

`npm start`
