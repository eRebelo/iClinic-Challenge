import os

import jinja2
import webapp2

from logics import IClinic

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

    def post(self):
        public_place = self.request.get("public_place")
        neighborhood = self.request.get("neighborhood")
        city = self.request.get("city")
        istate = self.request.get("istate")
        zip_code = self.request.get("zip_code")

        iClinic = IClinic()
        iClinic.save_cep(public_place, neighborhood, city, istate, zip_code)
        self.redirect('/')
        # self.response.out.write(public_place + ", " + neighborhood + ", " + city + ", " + istate + ", " + zip_code)


class RecordsHandler(webapp2.RequestHandler):
    def get(self):
        iClinic = IClinic()
        title = "iClinic | Records"
        template_vars = {
            'title': title,
            'ceps': iClinic.list_cep()
        }
        template = JINJA_ENVIRONMENT.get_template('records.html')
        self.response.out.write(template.render(template_vars))

    def post(self):
        if self.request.POST.get('delete_cep'):  # if user clicks "Delete" button
            cep_ids = self.request.get('cep_id',
                                       allow_multiple=True)  # allow_multiple=True so that it reads multiple key into list.
            iClinic = IClinic()
            iClinic.delete_cep(cep_ids)
            self.redirect('/records')
