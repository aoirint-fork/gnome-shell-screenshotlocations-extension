## Contributing

- Read the [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)
- Speak in English, if possible

## Bug Reports, Feature Requests, & Questions

- Fill out the template as best you can

## Code

- Lint your code with [eslint](https://eslint.org/)
- You agree that your code will be distributed under the [GPL-2.0-or-later](LICENSE)

## Building

The extension uses the [meson](https://mesonbuild.com/) build system.

- You can set up a development environment by running `meson setup --prefix=$HOME/.local builddir`
  - You can optionally configure the locale path by running `meson setup --prefix=$HOME/.local -Dlocaledir=$HOME/.local/share/gnome-shell/extensions/screenshotlocations.timur@linux.com/locale builddir`
- You can compile and install a build by running `meson install -C builddir`
- Changes to the `meson.build` will require reconfiguring it with `meson --reconfigure builddir`
- You can create a packed extension by running `meson compile extension.zip -C builddir`

### Translations

- Additional files to translate can be added by updating the `po/POTFILES` file
- The translations `.pot` file can be regenerated by running `meson compile screenshotlocations.timur@linux.com-pot -C builddir`
- To add translations for a new language, add the language code to `po/LINGUAS`
  - Make sure the language code is unique and sorted by running `cat po/LINGUAS | uniq -u | sort > po/LINGUAS`
  - Update the list of `.po` files by running `meson compile screenshotlocations.timur@linux.com-update-po -C builddir`
- For additional help, refer to the [meson localisation guide](https://mesonbuild.com/Localisation.html)
