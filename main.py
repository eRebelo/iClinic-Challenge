import webapp2
from views import *

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/records', RecordsHandler)
], debug=True)