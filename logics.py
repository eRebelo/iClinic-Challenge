from google.appengine.ext import db

from models import IClinicModel


class IClinic(object):
    def save_cep(self, public_place, neighborhood, city, istate, zip_code):
        iclinic = IClinicModel()
        iclinic.public_place = public_place
        iclinic.neighborhood = neighborhood
        iclinic.city = city
        iclinic.istate = istate
        iclinic.zip_code = zip_code
        iclinic.put()

    def delete_cep(self, cep_ids):
        if len(cep_ids) > 0:
            for cep_id in cep_ids:
                iClinic_k = db.Key.from_path('IClinicModel', long(cep_id))
                iClinic = db.get(iClinic_k)
                db.delete(iClinic_k)

    def list_cep(self):
        iclinic_query = IClinicModel.all()
        return iclinic_query
