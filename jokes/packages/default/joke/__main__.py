import pyjokes

def main(args):
  joke = pyjokes.get_joke()
  return {
    'response_type': 'in_channel',
    'text': joke
  }
