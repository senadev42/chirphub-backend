// src/utils/seed-birdhouse-history.ts
import { birdhouses } from './seed-birdhouses';
import { BirdhouseHistory } from '../birdhouse/entities/birdhousehistory.entity'

export const generateBirdhouseHistory = (): BirdhouseHistory[] => {
 const historyRecords = [];

 birdhouses.forEach((birdhouse) => {
    for (let i = 0; i < 5; i++) {
      historyRecords.push({
        birds: Math.floor(Math.random() * 10),
        eggs: Math.floor(Math.random() * 10),
        birdhouse: birdhouse,
      });
    }

    //less hassle + faster than doing it the other way around
    historyRecords.push({
      birds: birdhouse.birds,
      eggs: birdhouse.eggs,
      birdhouse: birdhouse,
    });
 });

 return historyRecords;
};
