/* prefs.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported buildPrefsWidget init */

const {GObject, GLib, Gio, Gtk} = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

var ScreenshotLocationsExtensionPrefs = GObject.registerClass({
    GTypeName: 'ScreenshotLocationsExtensionPrefs',
    Template: Me.dir.get_child('prefs.ui').get_uri(),
    InternalChildren: [
        'screenshot_folder_label',
        'folder_chooser',
        'folder_chooser_button',
    ],
}, class ScreenshotLocationsExtensionPrefs extends Gtk.Box {
    _init(preferences) {
        super._init();
        this._preferences = preferences;
        this._sync();

        this._preferences.connect('changed', this._sync.bind(this));
    }

    _onBtnClicked(btn) {
        let parent = btn.get_root();
        this._folder_chooser.set_transient_for(parent);
        this._folder_chooser.show();
    }

    _onFileChooserResponse(native, response) {
        if (response !== Gtk.ResponseType.ACCEPT)
            return;

        const filePath = native.get_file().get_path();
        this._preferences.set_string('save-directory', filePath);
    }

    _sync() {
        const p = this._preferences.get_string('save-directory');
        if (GLib.file_test(p, GLib.FileTest.EXISTS)) {
            const file = Gio.File.new_for_path(p);
            this._folder_chooser.set_file(file);
            this._screenshot_folder_label.set_text('Screenshot directory: %s'.format(p));
        }
    }
});

function init() {
    // noop
}

function buildPrefsWidget() {
    const preferences = ExtensionUtils.getSettings();
    return new ScreenshotLocationsExtensionPrefs(preferences);
}
