module Jekyll
  class CategoryOverview < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category_overview.html')
      self.data['category'] = category
    end
  end
  class CategoryGenerator < Generator
    safe true
    def generate(site)
      if site.layouts.key? 'category_overview'
        site.config['category_tags'].keys.each do |category|
          write_category_index(site, File.join(category.downcase), category)
        end
      end
    end
    def write_category_index(site, dir, category)
      index = CategoryOverview.new(site, site.source, dir, category)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end