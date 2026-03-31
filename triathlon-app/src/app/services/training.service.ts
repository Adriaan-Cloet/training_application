import { Injectable } from "@angular/core";
import { Training, Discipline } from "../models/training.model";

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    private readonly STORAGE_KEY = 'trainings';

    getAll(): Training[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    add(training: Omit<Training, 'id'>): Training {
        const newTraining: Training = {
            ...training, 
            id: crypto.randomUUID(),
        };
        const all = this.getAll();
        all.push(newTraining);
        this.save(all);
        return newTraining;
    }

    delete(id: string):void {
        const filtered = this.getAll().filter((t) => t.id !== id);
        this.save(filtered);
    }

    update(id: string, updated: Omit<Training, 'id'>): Training | null {
        const all = this.getAll();
        const index = all.findIndex((t) => t.id === id);
        if (index === -1) return null;
        all[index] = {...updated, id};
        this.save(all);
        return all[index];
    }

    private save(trainings: Training[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trainings))
    }
}