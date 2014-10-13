# DEBUG = True
LINKEDIN_BASE_URL = 'https://api.linkedin.com/v1/'
LINKEDIN_AUTHORIZE_URL = '/uas/oauth2/authorization'
LINKEDIN_TOKEN_URL = '/uas/oauth2/accessToken'
LINKEDIN_API_KEY = 'YOUR-API-KEY'
SECRET_KEY = 'YOUR-API-SECRET'
SCOPE = 'r_fullprofile'
REDIRECT_URI = 'https://localhost:5000/auth'

# THIS COULD PERHAPS BE GENERATED PER REQUEST
# >> import os
# >> import hashlib
# >> random_data = os.urandom(128)
# >> hashlib.md5(random_data).hexdigest()
CLIENT_STATE = '8a2a272faf45f6f2f715ea8c665acd12'
