from src.utils.file import File

def main():
    file = File('terraform')
    print(file.open_hcl('common'))

if __name__ == "__main__":
    main()
