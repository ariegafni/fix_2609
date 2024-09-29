import { Request, Response } from 'express';
import jsonfile from 'jsonfile';

const dbPath = "./data/DB.json";

interface Beeper {
    id: number,
    name: string,
    status: string, 
    created_at: Date,
    detonated_at: Date,  
    latitude: number,    
    longitude: number    
}


export const getBeeper = async (req: Request, res: Response) => {
  try {
    const db = await jsonfile.readFile(dbPath);
    const beepers: Beeper[] = db.beepers || [];
    res.json(beepers);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to retrieve beepers' });
  }
};

export const addBeeper = async (req: Request, res: Response) => {
    const { id, name, status, created_at, detonated_at, latitude, longitude } = req.body;    
    try {
      const newBeeper = { 
          id,
          name,
          status, 
          created_at: new Date(created_at), 
          detonated_at: new Date(detonated_at),
          latitude,    
          longitude 
      };
      
      const db = await jsonfile.readFile(dbPath);
     
      db.beepers.push(newBeeper);
      await jsonfile.writeFile(dbPath, db);
  
     
      res.status(201).json({ beeper: newBeeper });
    } catch (error) {
      
      res.status(500).json({ error: 'Failed to add Beeper' });
    }
  };

  export const getBeeperById = async (req: any, res: any) => {
    const { id } = req.params; 
  
    try {
      const db = await jsonfile.readFile(dbPath);     
      const beeper = db.beepers.find((b: Beeper) => b.id === parseInt(id));
  
      if (!beeper) {
        return res.status(404).json({ error: 'Beeper not found' });
      }      
      res.json(beeper);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve beeper' });
    }
  };

  export const updateStatus = async (req: any, res: any) => {
    const { id } = req.params; 
    const {status} = req.body; 
  
    try {
      const db = await jsonfile.readFile(dbPath);
        
      const beeperIndex = db.beepers.findIndex((b: Beeper) => b.id === parseInt(id));
  
      if (beeperIndex === -1) {
        return res.status(404).json({ error: 'Beeper not found' });
      }
       
      db.beepers[beeperIndex] = {
        ...db.beepers[beeperIndex],  
        status
      };    
      await jsonfile.writeFile(dbPath, db);
      res.json(db.beepers[beeperIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update beeper' });
    }
  };

  export const updateBeeper = async (req: any, res: any) => {
    const { id } = req.params; 
    const { name, status, created_at, detonated_at, latitude, longitude } = req.body; 
  
    try {
      const db = await jsonfile.readFile(dbPath);
        
      const beeperIndex = db.beepers.findIndex((b: Beeper) => b.id === parseInt(id));
  
      if (beeperIndex === -1) {
        return res.status(404).json({ error: 'Beeper not found' });
      }
       
      db.beepers[beeperIndex] = {
        ...db.beepers[beeperIndex],  
        name,
        status,
        created_at: new Date(created_at),
        detonated_at: new Date(detonated_at),
        latitude,
        longitude
      };
    
      await jsonfile.writeFile(dbPath, db);
      res.json(db.beepers[beeperIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update beeper' });
    }
  };

  export const deleteBeeper = async (req: any, res: any) => {
    const { id } = req.params;
  
    try {
      const db = await jsonfile.readFile(dbPath);
      const beeperIndex = db.beepers.findIndex((b: Beeper) => b.id === parseInt(id));
  
      if (beeperIndex === -1) {
        return res.status(404).json({ error: 'beeper not found' });
      }
  
      db.beepers.splice(beeperIndex, 1);
      await jsonfile.writeFile(dbPath, db);
  
      res.json({ message: 'beeper deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete beeper' });
    }
  };

  export const getBeeperBystatus = async (req: any, res: any) => {
    const { status } = req.params;
  
    try {
      const db = await jsonfile.readFile(dbPath);
      const beepers = db.beepers.filter((b: Beeper) => b.status === status);
  
      if (beepers.length === 0) {
        return res.status(404).json({ error: 'No beepers found with this status' });
      }
  
    
      res.json(beepers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve beepers' });
    }
  };

  
  export const updateBeeperStatusAout = async (req: any, res: any) => {
    const { id } = req.params;
    enum BeeperStatus {
      manufactured = "manufactured",
      assembled = "assembled",
      shipped = "shipped",
      deployed = "deployed"
    }
  
    try {
      const db = await jsonfile.readFile(dbPath);
      const beeper = db.beepers.find((b: any) => b.id === parseInt(id));
  
      if (!beeper) {
        return res.status(404).json({ error: 'Beeper not found' });
      }
      const currentStatus = beeper.status as BeeperStatus;
      const statuses = Object.values(BeeperStatus);
      const currentIndex = statuses.indexOf(currentStatus);
      const nextIndex = (currentIndex + 1) //% statuses.length;  אם אני רוצה שזה יחזור 
      const nextStatus = statuses[nextIndex];
      beeper.status = nextStatus;
      await jsonfile.writeFile(dbPath, db);  
      res.json({ message: 'Beeper status updated', beeper });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update beeper status' });
    }
  };