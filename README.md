#LinkedIn profile consumption
Using Flask, React, and Gulp

##
Dependencies:

- Python
- Node / Npm
- OpenSSL (due to complexity with the linkedin oauth scheme)

## Init
Deployment of HTML5 applications is slightly cumbersome. With a slight user burden we can ease installation problems by leveraging the machine's installations of python and a web browser
    
    virtualenv --distribute venv
    source venv/bin/activate
    pip install -r requirements.txt
    bower install
    npm install

Details on localhost ssl can be found at http://kracekumar.com/post/54437887454/ssl-for-flask-local-development and http://flask.pocoo.org/snippets/111/

## Run

Provided you've activated your virtualenv, keep reading. Otherwise `$source venv/bin/activate` first.

Launch the process with the command below, then visit https://localhost:5000/
	
  `gulp watch`

  or just run Flask with

  `python main.py`
	
### Web Tools

This uses Bower to manage js dependencies, Coffeescript for happier ECMAScripting. React as a frontend utility.  That is to say, there is a fair amount of complexity in the client-side tools.  Gulp comes in as a sort of task runner, and has a few commands to simplify the build process.

`gulp watch` will handle conversions/compile and start a python child process in the form of a flask web server.
