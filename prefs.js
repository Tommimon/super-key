

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;

function init() {

}

function fillPreferencesWindow(window) {
    // Use the same GSettings schema as in `extension.js`
    const settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.super-key');

    // Create a preferences page and group
    const page = new Adw.PreferencesPage();
    const group = new Adw.PreferencesGroup();
    page.add(group);

    // Create a new preferences row
    const row = new Adw.ActionRow({ title: 'Super key command' });
    group.add(row);

    // Create the switch and bind its value to the `overlay-key-action` key
    const textField = new Gtk.Entry({
        text: settings.get_string ('overlay-key-action'),
        valign: Gtk.Align.CENTER,
    });

    settings.bind(
        'overlay-key-action',
        textField,
        'text',
        Gio.SettingsBindFlags.DEFAULT
    );

    // Add the switch to the row
    row.add_suffix(textField);

    // Add our page to the window
    window.add(page);
}
