class TemplateBase:
    def __init__(self) -> None:
        self.path = "template"

    def open(self, name) -> str:
        with open(self.path + '/' + name + ".tf", mode='r') as f:
            return f.read()
