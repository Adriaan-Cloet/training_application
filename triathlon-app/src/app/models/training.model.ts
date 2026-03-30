/*
    * enum geeft "lopen" terug in plaats van 0, dus leesbaarder in API
    * date object met string omdat angular werkt met ISO-datumstrings
    * id is string omdat we crypto.randomUUID gebruiken
*/

export enum Discipline {
    Zwemmen = 'Zwemmen',
    Fietsen = 'Fietsen',
    Lopen = 'Lopen',
    Krachttraining = 'Krachttraining',
}

export interface Training {
    id: string;
    date: string;
    discipline: Discipline;
    duration: number;
    distance?: number;
    feeling?: number;
    notes?: string;
}