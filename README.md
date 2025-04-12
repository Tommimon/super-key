# [![super-key-title][]][super-key-repo]

Bind the Super-Key to a custom action

## Overview

This extension is a fork of [Pop Launcher Super-Key](https://github.com/ManeLippert/pop-launcher-super-key). Instead of showing the Pop launcher the user
can choose to perform a custom action.

The action performed can be chosen in the extension settings by entering the command to execute.
Default command is `nautilus` which opens the default gnome file manager, I chose this just because I
expect almost everyone to have it installed.

## Why Super Key?

The typical use is to bind another launcher of choice (such as [Albert](https://github.com/albertlauncher/albert)) to <kbd>Super</kbd>.
But there are really no restriction, you can set any command you want.

Using gnome settings to bind shortcuts is impossible to use <kbd>Super</kbd> both as a modifier and as a proper key:
If I bind something to <kbd>Super</kbd> the action will fire before I press anything elese, and I will not be able
to bind something to <kbd>Super</kbd> + <kbd>A</kbd> for example.

Super Key solves this by activating the super action on release of the key if no other shortcut was activated
in the meanwhile.

## Installation & Setup

- Download zip from the releases section
- Extract in a folder named `super-key@tommimon.github.com`
- Add the `super-key@tommimon.github.com` folder to GNOME extensions folder*
- Restart the GNOME shell**
- Open (or restart) the Extensions app (or Tweaks app)
- Enable 'Super Key'
- Click 'Settings' button of 'Super Key'
- Set the desired command and close
- Restart the GNOME shell again**
- Enjoy

\* Default folder should be `~/.local/share/gnome-shell/extensions/` for manually installed extensions
if there isn't this directory, create it.

\** Hit <kbd>Alt</kbd> + <kbd>F2</kbd> type `r` and hit <kbd>Enter</kbd>, if you prefer
you can log out instead.

## How does it work

The default behaviour of <kbd>Super</kbd> is already both as key and modifier but the effect is to show the application
overlay. This extension changes the shell code in order to run a custom command instead.

[super-key-title]: https://github.com/Tommimon/super-key/blob/main/assets/title.png
[super-key-repo]: https://github.com/Tommimon/super-key

## Simulate other shortcuts

Sometimes, is not possible to obtain the desired action with a command to run, but it is possible with a keyboard shortcut. If you want to bind the <kbd>Super</kbd> key to simulate a specific keyboard shortcut, the suggested tool is `ydotool`:

1) Follow the installation instructions on the [project repository](https://github.com/ReimuNotMoe/ydotool).
2) Start the `ydotoold` daemon with: `sudo -b ydotoold --socket-path="$HOME/.ydotool_socket" --socket-own="$(id -u):$(id -g)"`. If you want this to run automatically at startup, setup a system service instead.
3) Setup the following command as <kbd>Super</kbd> key action: `bash -c 'YDOTOOL_SOCKET="$HOME/.ydotool_socket" ydotool key 125:1 31:1 31:0 125:0'`.

The provided example shows how to bind <kbd>Super</kbd> to <kbd>Super</kbd> + <kbd>S</kbd> which opens GNOME quick settings menu. But you can decide to bind any keyboard shortcut or input, se [input-event-codes.h](https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h) for key codes reference.
