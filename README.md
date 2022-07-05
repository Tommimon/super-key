# Super Key

Bind the Super-Key to a custom action

## Overview
This extension is a fork of Pop Launcher Super-Key. Instead of showing the Pop launcher the user
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
