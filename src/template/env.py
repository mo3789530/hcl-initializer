from src.template.templete import TemplateBase
from jinja2 import Template


class Env(TemplateBase):
    def create_hcl(self, dic: dict):
        file = self.open(name="env")
        template = Template(file)
        ren = template.render(region=dic['region'])
        return ren
