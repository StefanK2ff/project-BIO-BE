# Project-BIO: Backend of Book I Own App

Project BIO - Books I Own is a copycat of the core functionality of sites like goodreads. So BIO  is similar to this  social cataloging site that allows users to 

1. freely search a database of books (Google books API)

2. add them to their list of books they own

3. categorize them (with tags)

4. and and perform different actions on the books and/or list, like

    1. filter

    2. edit

    3. ...

# Collections

**Collection to Users**

* One user can own multiple collections

* One collection can just be owned by one user (collections are always private)

* Every User has at least one Collection "myBook" containing all his books

Information about books are retrieved over the Google Book API.

## Collection

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Specs</td>
    <td>Comment / Usage</td>
  </tr>
  <tr>
    <td>collectionTag</td>
    <td>String</td>
    <td>required, unique</td>
    <td>always begins with # and has no space</td>
  </tr>
  <tr>
    <td>user</td>
    <td>ObjectId</td>
    <td>required</td>
    <td>owner by one user</td>
  </tr>
  <tr>
    <td>books</td>
    <td>Array of ObjectIds</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>Array of Google Ids</td>
    <td></td>
    <td></td>
  </tr>
</table>


## User

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Specs</td>
    <td>Comment / Usage</td>
  </tr>
  <tr>
    <td>email</td>
    <td>String</td>
    <td>unique, required</td>
    <td></td>
  </tr>
  <tr>
    <td>password</td>
    <td>String</td>
    <td>required</td>
    <td></td>
  </tr>
  <tr>
    <td>username</td>
    <td>String</td>
    <td>unique</td>
    <td></td>
  </tr>
  <tr>
    <td>collections</td>
    <td>Array of ObjectIds</td>
    <td></td>
    <td></td>
  </tr>
</table>


# Routes
<table>
  <tr>
    <td>Route</td>
    <td>HTTP verb</td>
    <td>Request body</td>
    <td>Description</td>
    <td>Success Status Code</td>
    <td>Error Code</td>
  </tr>
  <tr>
    <td>/auth/signup</td>
    <td>POST</td>
    <td>{username, password}</td>
    <td>Signup auth rout ro create an new user</td>
    <td>201 created</td>
    <td>400</td>
  </tr>
  <tr>
    <td>/auth/login</td>
    <td>POST</td>
    <td>{username, password}</td>
    <td>login route to log in an existing user</td>
    <td>200 ok</td>
    <td>404 not found
401 not authorized</td>
  </tr>
  <tr>
    <td>/auth/logout</td>
    <td>POST</td>
    <td>(empty)</td>
    <td>Logout route to destroy current login session</td>
    <td>204</td>
    <td>500</td>
  </tr>
  <tr>
    <td>/auth/me</td>
    <td>GET</td>
    <td>(empty)</td>
    <td>Needed for react to distinguish what is allowed for the user in the FE
return user data from session storage for reacht FE authentication</td>
    <td>200</td>
    <td></td>
  </tr>
  <tr>
    <td>/collections</td>
    <td>GET</td>
    <td></td>
    <td>Get list of all collections that are connected to currentUser</td>
    <td>200</td>
    <td>500</td>
  </tr>
  <tr>
    <td>/collections</td>
    <td>POST</td>
    <td>{name, books, user}</td>
    <td>Adds a new collection to the DB</td>
    <td>201</td>
    <td>500</td>
  </tr>
  <tr>
    <td>/collections/:id</td>
    <td>GET</td>
    <td></td>
    <td>Get all books from that collection</td>
    <td>200</td>
    <td>500</td>
  </tr>
  <tr>
    <td>/collections/:id</td>
    <td>PATCH</td>
    <td>{books, name}</td>
    <td>Updates specific collection if name changes or books gat added /deleted</td>
    <td>200</td>
    <td>500 / 400</td>
  </tr>
  <tr>
    <td>/collections/:id</td>
    <td>DELETE</td>
    <td></td>
    <td>Deletes a collection by ID</td>
    <td>204</td>
    <td>500 / 400</td>
  </tr>
</table>

# API Planning

## General Check of google books api

* It’s free
* You can have the keys immediately
* It’s updated
* It’s stable
* You are able to get the data you want

## Available Endpoints (public)

* Performing a search

    * https://www.googleapis.com/books/v1/volumes?q=search+terms

* Performing a search for a special field

    * Add keywords to query:

        * intitle: Returns results where the text following this keyword is found in the title.

        * inauthor: Returns results where the text following this keyword is found in the author.

        * inpublisher: Returns results where the text following this keyword is found in the publisher.

        * subject: Returns results where the text following this keyword is listed in the category list of the volume.

        * isbn: Returns results where the text following this keyword is the ISBN number.

    * Example: 

        * GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&[key](https://developers.google.com/books/docs/v1/using#key)=yourAPIKey

* Retrieving a specific volume

    * [https://www.googleapis.com/books/v1/volumes/volumeId](https://www.googleapis.com/books/v1/volumes/volumeId)

