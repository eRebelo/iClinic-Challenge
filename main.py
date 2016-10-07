import os
import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__) + "/templates"))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        title = "iClinic | Home"
        template_vars = {
            'title': title
        }
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.out.write(template.render(template_vars))


class RecordsHandler(webapp2.RequestHandler):
    def get(self):
        title = "iClinic | Records"
        template_vars = {
            'title': title
        }
        template = JINJA_ENVIRONMENT.get_template('records.html')
        self.response.out.write(template.render(template_vars))


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/records.html', RecordsHandler)
], debug=True)
