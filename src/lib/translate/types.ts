
export type Messages =
| 'portfolio.title'
| 'settings.title'

export type Dictionary = { [key in Messages]: string };
