
export type Messages =
| 'portfolio.title'
| 'settings.title'
| 'settings.common'
| 'settings.language'
| 'settings.darkMode';

export type Dictionary = { [key in Messages]: string };
