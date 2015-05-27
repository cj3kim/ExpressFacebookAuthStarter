If you're a complete newbie, here's how to start.


In your ba$h terminal: #'$' represents the bash terminal

1. $ npm install
2. spin up your postgres server
  ** if you don't have it, install it and run on the default port.
3. $ createdb express_facebook_auth_development
4. knex migrate:latest
5. then, $ node app


6. visit /facebook to authenticate. After authenticating, an alert
should notify you that you've logged and that your access_token has been
stored.
7. visit /users to see a list of users that have authenticated with the
application. 
8. Checkout routes/index.js to see how I used knex to insert data into
the postgres database.
9. This code starts at line 37 of views/facebook.html:

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      var accessToken = response.authResponse.accessToken;
      var obj = { accessToken: accessToken };
      $.post('/store-access-token', obj, function (response) {
        console.log(response);
        alert('User ' + response.id + '\'s token has been succesfully stored.');
        alert('accessToken: ' + accessToken);
      });
      statusChangeCallback(response);
    });
  }

  The $ here means Zepto, a light weight version of jQuery. You can
  immediately include it into your app by inserting this script in the
  head or body tag.

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.1.6/zepto.min.js" charset="utf-8"></script>

  Look up $.post on the ZeptoJS site and read about. 

  $.post is a type of http request. There are four main ones you should know: 
      GET, POST, PUT, DELETE. Read about them in RFC 2616. 
  
  Examine the following code closely. Checkout documentation on
expressjs.org, knexjs.org, and zeptojs.org.  If you're confused, ask
questions. 


  //Client Side Code
  $.post('/store-access-token', obj, function (response) {
    console.log(response);
    alert('User ' + response.id + '\'s token has been succesfully stored.');
    alert('accessToken: ' + accessToken);
  });

  //Server-side Code

  router.post('/store-access-token', function(req, res, next) {
    var body = req.body
    var accessToken = body.accessToken;

    knex.insert([{
      email: 'sample@gmail.com',
      fb_access_token: accessToken,
      full_name: 'sample name'
    }])
    .into('users')
    .returning('id')
    .then(function (row) {
      var id = row[0];
      var obj = { id: id };

      res.json(obj); //automatically will serialize into a json string for you. 
    }).catch(function (err) {
      console.log(err);
      res.json({err: err});
    });
  });

Last, but not least, to learn how to become a developer is incredibly
hard and time consuming. You will need to sacrifice a lot time and
energy because this is a trade that takes years to master. Don't be
disappointed if the first couple programs/apps you make are shitty.
The first 20 or 30 you make will be always be shitty, but you will get
better if you stay committed and consistently polish your skills. Your
job right now is to develop a strong foundation so you can add value
later and there is no short changing this process. There
will be days that you will struggle, hate the process, and question why
you even started. That's okay. As you gain experience, that will occur less and
less. It gets better, believe me. So, never give up. 
