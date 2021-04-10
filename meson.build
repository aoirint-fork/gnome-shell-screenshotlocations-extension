project('screenshotlocations.timur@linux.com',
  version: '8',
  license: 'GPL2+',
  meson_version: '>= 0.50.0')

gnome = import('gnome')

# Extension information
gse_uuid = meson.project_name()
gse_prefix = 'org.gnome.shell.extensions.screenshotlocations'

# Installation directories
prefixdir = get_option('prefix')
datadir = get_option('datadir')
schemadir = datadir/'glib-2.0'/'schemas'
extensiondir = datadir/'gnome-shell'/'extensions'/gse_uuid

subdir('src')
subdir('data')

# Create release zip for distribution
custom_target('extension.zip',
  command: [
    'gnome-extensions', 'pack', prefixdir/extensiondir,
    '--extra-source', 'prefs.ui',
    '--schema', prefixdir/schemadir/gse_prefix + '.gschema.xml',
  ],
  output:  gse_uuid + '.shell-extension.zip')

# Post-install scripts
meson.add_install_script('build-aux'/'postinstall.py')
