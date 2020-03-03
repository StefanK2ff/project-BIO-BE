# Project-BIO: Backend of Book I Own App

## General Background

Project BIO - Books I Own is a copycat of the core functionality of sites like goodreads. So BIO  is similar to this  social cataloging site that allows users to 

1. freely search a database of books (Google books API)
2. add them to their list of books they own
3. categorize them (with tags)
4. and and perform different actions on the books and/or list, like
    1. filter
    2. edit
    3. ...

## Description of this Backend

This backend follows the only purpose to provide user authentication (signup, login, logout) and to manage user's collections. A collection is a list of items (Array of strings (will store the Google book ids) with a name and one owner. Information about books are retrieved over the Google Book API.

# Mongo Collections

## Relationship between collections and user

* One user can own multiple collections
* One collection can just be owned by one user (collections are always private)
* Every User has at least one Collection "myBook" containing all his books

## Collection (of items) collection

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Specs</td>
    <td>Comment / Usage</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>required</td>
    <td>naming convention will be provided in frontend</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>ObjectId</td>
    <td>required</td>
    <td>owner is an existing</td>
  </tr>
  <tr>
    <td>itmes</td>
    <td>Array of Strings</td>
    <td></td>
    <td>Will store the google Book IDs</td>
  </tr>
  <tr>
</table>

## User collection

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
    <td>{email, password}</td>
    <td>Signup auth rout ro create an new user</td>
    <td>201 created</td>
    <td>400</td>
  </tr>
  <tr>
    <td>/auth/login</td>
    <td>POST</td>
    <td>{email, password}</td>
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
    <td>/collections/user/:userId</td>
    <td>GET</td>
    <td></td>
    <td>Get list of all collections that are connected to the given user</td>
    <td>200</td>
    <td>500</td>
  </tr>
  <tr>
    <td>/collections</td>
    <td>POST</td>
    <td>{name, items, owner}</td>
    <td>Adds a new collection to the collection collection and update the collectionns array at the user</td>
    <td>201</td>
    <td>500</td>
  </tr>
  <tr>
    <td>/collections/id/:collectionId</td>
    <td>GET</td>
    <td></td>
    <td>Find collection by collectionId</td>
    <td>200</td>
    <td>500</td>
  </tr>
  <tr>
    <td>/collections/:id</td>
    <td>PATCH</td>
    <td>{items, name}</td>
    <td>Updates specific collection with a new name and/or new array of items. Note: Array get always replaced. </td>
    <td>200</td>
    <td>500 / 400</td>
  </tr>
  <tr>
    <td>/collections/:id</td>
    <td>DELETE</td>
    <td></td>
    <td>Deletes collection by ID</td>
    <td>204</td>
    <td>500 / 400</td>
  </tr>
</table>

