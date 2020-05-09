require 'jekyll'
require 'mini_exiftool'

class AspectRatio < Liquid::Tag

  def initialize(tagName, input, tokens)
    super
    @input = input
  end

  def render(context)
    filepath = context[@input]
    if filepath[0] == "/"
        filepath = filepath[1..-1]
    end
    abspath = File.expand_path(filepath)
    output = 0

    if (File.file?(abspath))
        mediaObj = MiniExiftool.new abspath
        height = mediaObj.image_height
        width = mediaObj.image_width

        # TODO is it always giving me the longer side as width? if so I could pass in a flag for if it's a horizontal or vertical video?
        if mediaObj.rotation == 90 or mediaObj.rotation == 180
            temp = height
            height = width
            width = temp
        end

        if height != 0
            output = width.to_f/height.to_f
        end
    end

    return output
  end
  
  Liquid::Template.register_tag("aspectratio", AspectRatio)
end