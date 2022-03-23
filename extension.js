const { Gio, GObject} = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const extension = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;

let signal_overlay_key = null;
let original_signal_overlay_key = null;
let settings = null;

var cmd = "gedit";


// Overview functions
function overview_visible() {
    return Main.overview.visibleTarget;
}

function overview_hide() {
    if (Main.overview.animationInProgress) {
        // prevent accidental re-show
    } else if (overview_visible()) {
        Main.overview.hide();
    }
}

// Overlay-key
var overlay_key_action = null;

function overlay_key() {
    log("overlay key detected");
    overview_hide();
    let proc = new Gio.Subprocess({argv: cmd.split(' ')});
    proc.init(null);
}

function overlay_key_changed(settings) {
    overview_hide();
    overlay_key_action = settings.get_enum("overlay-key-action");
}

function init(metadata) {}

function enable() {

    settings = ExtensionUtils.getSettings((extension.metadata["settings-schema"]));

    // Load overlay key action and keep it up to date with settings
    overlay_key_changed(settings);
    settings.connect("changed::overlay-key-action", () => {
        overlay_key_changed(settings);
    });

    // Block original overlay key handler
    original_signal_overlay_key = GObject.signal_handler_find(global.display, { signalId: "overlay-key" });
    if (original_signal_overlay_key !== null) {
        global.display.block_signal_handler(original_signal_overlay_key);
    }

    // Connect modified overlay key handler
    const A11Y_SCHEMA = 'org.gnome.desktop.a11y.keyboard';
    const STICKY_KEYS_ENABLE = 'stickykeys-enable';
    let _a11ySettings = new Gio.Settings({ schema_id: A11Y_SCHEMA });
    signal_overlay_key = global.display.connect("overlay-key", () => {
        if (!_a11ySettings.get_boolean(STICKY_KEYS_ENABLE))
            overlay_key();
    });
}

function disable() {

    // Disconnect modified overlay key handler
    if (signal_overlay_key !== null) {
        global.display.disconnect(signal_overlay_key);
        signal_overlay_key = null;
    }

    // Unblock original overlay key handler
    if (original_signal_overlay_key !== null) {
        global.display.unblock_signal_handler(original_signal_overlay_key);
        original_signal_overlay_key = null;
    }

    settings =  null;
}
