from OpenSSL import SSL
from flask import Flask, url_for, redirect, request, session, jsonify, render_template
from flask_oauthlib.client import OAuth

app = Flask(__name__)
app.config.from_object('config')
oauth = OAuth()

li = oauth.remote_app('linkedIn',
        base_url = app.config['LINKEDIN_BASE_URL'],
        request_token_params = {
            'scope': 'r_fullprofile',
            'state': '8a2a272faf45f6f2f715ea8c665acd12'
        },
        request_token_url=None,
        access_token_url = "https://www.linkedin.com{0}".format( app.config['LINKEDIN_TOKEN_URL'] ),
        access_token_method = "POST",
        authorize_url = "https://www.linkedin.com{0}".format( app.config['LINKEDIN_AUTHORIZE_URL'] ),
        consumer_key = app.config['LINKEDIN_API_KEY'],
        consumer_secret =  app.config['SECRET_KEY']
                     )

@app.route('/')
def index():
    if 'linkedin_token' in session:
        return render_template('index.html')
    else:
        return redirect(url_for('login'))

@app.route('/login')
def login():
    return li.authorize(callback=url_for('authorized', _external=True))

@app.route('/logout')
def logout():
    session.pop('linkedin_token', None)
    return redirect(url_for('index'))

@app.route('/login/authorized')
def authorized():
    resp = li.authorized_response()
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    session['linkedin_token'] = (resp['access_token'], '')
    me = li.get('people/~')
    return render_template('index.html')

@app.route('/name')
def human_name():
    if 'linkedin_token' in session:
        me = li.get('people/~:(formatted-name)')
        return jsonify(me.data)

@app.route('/location')
def location():
    if 'linkedin_token' in session:
        me = li.get('people/~:(location:(name))')
        return jsonify(me.data)

@li.tokengetter
def get_linkedin_oauth_token():
    return session.get('linkedin_token')

def change_linkedin_query(uri, headers, body):
    auth = headers.pop('Authorization')
    headers['x-li-format'] = 'json'
    if auth:
        auth = auth.replace('Bearer', '').strip()
        if '?' in uri:
            uri += '&oauth2_access_token=' + auth
        else:
            uri += '?oauth2_access_token=' + auth
    return uri, headers, body

li.pre_request = change_linkedin_query

if __name__ == '__main__':
    context = SSL.Context(SSL.SSLv23_METHOD)
    context.use_privatekey_file('server.key')
    context.use_certificate_file('server.crt')
    app.run(ssl_context=context)
