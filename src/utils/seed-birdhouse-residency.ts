// src/utils/seed-birdhouse-history.ts
import { birdhouses } from './seed-birdhouses';
import { BirdhouseHistory } from '../birdhouse/entities/birdhousehistory.entity';

import { addDays, startOfWeek, format } from 'date-fns';

export const generateBirdhouseHistory = (): BirdhouseHistory[] => {
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });

  const historyRecords = [];
  

  birdhouses.forEach((birdhouse) => {



    for (let i = 0; i < 5; i++) {

      const timestamp = format(addDays(monday, i), 'yyyy-MM-dd HH:mm:ss');
      historyRecords.push({
        birds: Math.floor(Math.random() * 10),
        eggs: Math.floor(Math.random() * 10),
        birdhouse: birdhouse,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }

    const lastTimestamp = format(addDays(monday, 5), 'yyyy-MM-dd HH:mm:ss');
    //less hassle + faster than doing it the other way around
    historyRecords.push({
      birds: birdhouse.birds,
      eggs: birdhouse.eggs,
      birdhouse: birdhouse,
      createdAt: lastTimestamp,
      updatedAt: lastTimestamp,
    });
  });

  return historyRecords;
};
