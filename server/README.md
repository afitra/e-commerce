# e-commerce

 #miniWP


###ROutes


###ROuter for User

| 






Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/product/all| get | none |  none | all data product|array of object | all data
/user/role| POST | token | none| sukses status role user| get status role user
/user/list| POST | token | none| sukses status role user| get array of object list cart user
/transaksi/all| get | token | none|get all data transaksion| get array of object all transaksi 
/user/pay| Patch | token | none| sukses payment user| store transaksi to data base
/user/add| patch | token | id (String)| add item to cart | strore cart user selected to db
/user/uploud| POST | token, "Content-Type": "multipart/form-data" | name(Str),price(Num),tag(str), image(all image format)| post product|to posting product to dasbor
/user/removelist| patch | token | index(NUM)|remove item from cart | strore cart user selected update to db
/user/add| patch | token | id (String)| add item to cart | strore cart user selected to db
/user/login| post |none | email, password all(String)| login  |array of object
/user/register| post |none | email, password all(String)| register  |array of object
 



  



















### Usage
command |
------- |
$ live-server --host=localhost |

<br>
Access the Client via http://localhost:8080/





Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/logn | POST | loginVia ('google' OR 'website') | if loginVia website: <br> email: String(**Required**), <br> password: String(**Required**) | Error: <br> Wrong username/password (fail login via website) <br> Success: <br> get a signin token <br> automatic signup if the user haven't signup (via google) | Signin into server
/users/register| POST | register via website | name:String(**Required**) <br> email:String(**Required**) <br> password:String(**Required**) <br> | Error: <br> Wrong email format <br> name, email, password (**Required**) <br> Email is unique <br> Success: <br> register new user | Register new user 
/articles | GET | none | none | error: <br> Internal Server Error <br> success: <br> articles success loaded | Get user articles
/articles | POST | token:token (**Required**) | title:String (**Required**) <br> content:String (**Required**) <br> tags:Array(**Required**) <br> image:File (**Required**) | error: <br> Internal server error <br> success: <br> Create new articles | Create articles
/articles/:id | PUT | token:token (**Required**) <br> req.params.id(**Required**) | title:String (**Required**) <br> content:String (**Required**) <br> tags:String delimited with comma(**Required**) <br> image:File (**Required**) | error: <br> Internal server error <br> success: <br> Update articles | Update articles
/articles/:id | DELETE | token:token (**Required**) <br> req.params.id(**Required**) | | error: <br> Internal server error <br> success: <br> Delete articles | Delete articles
/tags | GET | none | none | error: <br> Internal Server Error <br> success: <br> tags success loaded | Get all tags

### Usage
command |
------- |
$ npm install |
$ npm start |
$ live-server --host=localhost |

Access the Server via http://localhost:3000/
<br>
Access the Client via http://localhost:8080/
    
