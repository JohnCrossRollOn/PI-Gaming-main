export const arrayFilter = function(game, filterbar) {
    for (let setting of filterbar) {
      const [key, value]= Object.entries(setting)[0];
      if (!Array.isArray(game[key]) && game[key]!==value
      || Array.isArray(game[key]) && !game[key].includes(value)) return false
    }
    return true
  }