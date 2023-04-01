class EnvData:
    region = ""
    env = ""

    def __init__(self, region, env) -> None:
        self.region = region
        self.env = env


class Env:
    def __init__(self, env_data: EnvData) -> None:
        self.env_data = env_data

    def create_hcl_template():
        tmp = """
        env = {
            region = "ap-northeast-1"
        }
        """
