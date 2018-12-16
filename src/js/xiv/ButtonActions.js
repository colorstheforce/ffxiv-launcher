import GameLauncher from "./GameLauncher";
import Characters from "./Characters";
import SettingsManager from "./SettingsManager";
const dialog  = require('electron').remote.dialog;

/**
 * Watches all the buttons
 */
class ButtonActions
{
    watch()
    {
        this.watchAddCharacterWindow();
        this.watchCharacterSelection();
        this.watchLauncherSettingsWindow();
        this.watchToggleCharacterWindowView();
        this.watchToggleNewsView();
    }

    /**
     * Watch the "Add Character" window related buttons
     */
    watchAddCharacterWindow()
    {
        document.getElementById('Action.AddCharacter').onclick = event => {
            GameLauncher.requestLogin();
        };

        document.getElementById('Action.OpenAddCharacterWindow').onclick = event => {
            const ui = document.getElementById('add-character-form');
            if (!ui.classList.contains('open')) {
                ui.classList.add('open');
            }
        };
        document.getElementById('Action.CloseAddCharacterWindow').onclick = event => {
            const ui = document.getElementById('add-character-form');
            if (ui.classList.contains('open')) {
                ui.classList.remove('open');
            }
        };
    }

    watchLauncherSettingsWindow()
    {
        document.getElementById('Action.FindGamePath').onclick = event => {
            const path = dialog.showOpenDialog({
                properties: ['openDirectory']
            });

            if (path) {
                document.getElementById('gamePath').value = path[0].trim();
            }
        };

        document.getElementById('Action.SaveSettings').onclick = event => {
            const gamePath = document.getElementById('gamePath').value.trim();
            const expansion = document.getElementById('expansion').value.trim();
            const language = document.getElementById('language').value.trim();
            const raelyslanguage = document.getElementById('raelysLanguage').value.trim();
            SettingsManager.saveSettings({
                gamePath: gamePath,
                expansion: expansion,
                language: language,
                raelysLanguage: raelyslanguage
            });

            document.getElementById('settings-form').classList.remove('open');
        };

        document.getElementById('Action.OpenLauncherSettingsWindow').onclick = event => {
            const ui = document.getElementById('settings-form');
            if (!ui.classList.contains('open')) {
                ui.classList.add('open');
            }
        };
        document.getElementById('Action.CloseLauncherSettingsWindow').onclick = event => {
            const ui = document.getElementById('settings-form');
            if (ui.classList.contains('open')) {
                ui.classList.remove('open');
            }
        };
    }

    /**
     * Watch for clicking on a character on the right side
     */
    watchCharacterSelection()
    {
        if (Object.keys(Characters.list).length === 0) {
            return;
        }

        document.body.onclick = function(e){
            e = window.event? event.srcElement: e.target;
            if (e.className && e.className.indexOf('action-boot-character') !== -1) {
                const id = e.dataset.id;
                Characters.bootCharacter(id);
            }
        }
    }

    /**
     * Watch for toggling between portrait-only and full character view
     */
    watchToggleCharacterWindowView()
    {
        document.getElementById('Action.ToggleCharacterWindowView').onclick = event => {
            const ui = document.getElementById('character-list');
            ui.classList.toggle('icons-only');
        };
    }

    /**
     * Watch for toggling News on and off
     */
    watchToggleNewsView()
    {
        document.getElementById('Action.ToggleNewsView').onclick = event => {
            const ui = document.getElementById('news');
            ui.classList.toggle('news-hidden');
        };
    }
}

export default new ButtonActions();
