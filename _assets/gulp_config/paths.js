var paths = {};

// Directory locations.
paths.assetsDir       = '_assets/';      // The files Gulp will handle.
paths.jekyllDir       = '';              // The files Jekyll will handle.
paths.jekyllAssetsDir = 'assets/';       // The asset files Jekyll will handle.
paths.jekyllDraftAssetsDir   = 'assets/draft_assets/'; // The (draft) asset files Jekyll will handle.
paths.siteDir         = '_site/';        // The resulting static site.
paths.siteAssetsDir   = '_site/assets/'; // The resulting static site's assets.

// Folder naming conventions.
paths.postFolderName   = '_posts';
paths.draftFolderName  = '_drafts';
paths.fontFolderName   = 'fonts';
paths.mediaFolderName  = 'media';
paths.scriptFolderName = 'js';
paths.stylesFolderName = 'css';

paths.jekyllImageFiles = paths.jekyllAssetsDir + paths.mediaFolderName;
paths.siteImageFiles = paths.siteAssetsDir + paths.mediaFolderName;

paths.imageFiles  = paths.assetsDir + paths.mediaFolderName;
paths.imagePattern    = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)'; // and tif, webp, svg

paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;

module.exports = paths;