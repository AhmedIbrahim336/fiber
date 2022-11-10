import { StorageKeys } from "../constants";
import { Prefix, Shortcut } from "../types";

class Storage {
  async getShortcuts(): Promise<Array<Shortcut>> {
    const result = (await chrome.storage.sync.get(StorageKeys.shortcuts)) as {
      [StorageKeys.shortcuts]: Array<Shortcut>;
    };
    return result[StorageKeys.shortcuts] || [];
  }

  async newShortcut(shortcut: Shortcut) {
    const shortcuts = await this.getShortcuts();
    shortcuts.push(shortcut);
    await chrome.storage.sync.set({
      [StorageKeys.shortcuts]: shortcuts,
    });
  }

  async isExist(prefix: Prefix, command: string): Promise<boolean> {
    const shortcuts = await this.getShortcuts();
    return shortcuts.some((s) => s.command === command && s.prefix === prefix);
  }
}

const storage = new Storage();
export default storage;
