def main():
    message = input("Input: ")
    short_message = shorten(message)


def shorten(word):
    output = ""
    for character in word:
        if not character.lower() in ["a", "e", "i", "o", "u"]:
            output += character
    return output


if __name__ == "__main__":
    main()
