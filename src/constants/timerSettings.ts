const SOUND_PATH = '/sounds/';

export const alarmSounds = {
  digital: {
    name: {
      en: 'Digital',
      ru: 'Цифровой',
    },
    path: `${SOUND_PATH}alarm_digital.mp3`,
  },

  ding1: {
    name: {
      en: 'Ding 1',
      ru: 'Дзынь 1',
    },
    path: `${SOUND_PATH}alarm_ding-1.mp3`,
  },

  ding2: {
    name: {
      en: 'Ding 2',
      ru: 'Дзынь 2',
    },
    path: `${SOUND_PATH}alarm_ding-2.mp3`,
  },

  diling: {
    name: {
      en: 'Diling',
      ru: 'Сообщение',
    },
    path: `${SOUND_PATH}alarm-diling.mp3`,
  },

  fanfare: {
    name: {
      en: 'Fanfare',
      ru: 'Фанфары',
    },
    path: `${SOUND_PATH}alarm_fanfare.wav`,
  },
};

export const ambientSounds = {
  tickingSlow: {
    name: {
      en: 'Ticking slow',
      ru: 'Медленный тик',
    },
    path: `${SOUND_PATH}ambient_ticking-slow.mp3`,
  },

  tickingFast: {
    name: {
      en: 'Ticking fast',
      ru: 'Быстрый тик',
    },
    path: `${SOUND_PATH}ambient_ticking-fast.mp3`,
  },

  office: {
    name: {
      en: 'Office',
      ru: 'Офис',
    },
    path: `${SOUND_PATH}ambient_office.wav`,
  },

  forest: {
    name: {
      en: 'Forest',
      ru: 'Лес',
    },
    path: `${SOUND_PATH}ambient_forest.wav`,
  },

  seaWaves: {
    name: {
      en: 'Sea Waves',
      ru: 'Морские волны',
    },
    path: `${SOUND_PATH}ambient_sea-waves.wav`,
  },
  campfire: {
    name: {
      en: 'Campfire',
      ru: 'Костер',
    },
    path: `${SOUND_PATH}ambient_campfire.mp3`,
  },
};

export const minTimeInMinutes = 1;
export const maxTimeInMinutes = 480;
export const minLongBreakInterval = 1;
export const maxLongBreakInterval = 90;
