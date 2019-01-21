module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      self.data['tag'] = tag
      self.data['category'] = category
    end
  end
  class TagGenerator < Generator
    safe true
    def generate(site)
      if site.layouts.key? 'tag_index'
        site.config['category_tags'].keys.each do |category|
          site.config['category_tags'][category].each do |tag| 
            write_tag_index(site, File.join('posts', tag), tag, category)
          end
        end
      end
      
    end
    def write_tag_index(site, dir, tag, category)
      index = TagIndex.new(site, site.source, dir, tag, category)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end